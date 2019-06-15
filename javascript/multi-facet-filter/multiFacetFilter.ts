interface FilterableElement {
  [key: string]: string,
}

interface FilterFacets {
  [key: string]: string,
}

interface FacetValueInfo {
  name: string,
  count: number,
}

interface FilterResults {
  results: FilterableElement[],
  facets: Array<{
    name: string,
    values: Array<FacetValueInfo>,
  }>,
}

const elementMatches = (element: FilterableElement, searchFacets: FilterFacets): boolean => {
  for (let key of Object.keys(searchFacets)) {
    if (element[key] !== searchFacets[key]) {
      return false;
    }
  }
  return true;
};

const multiFacetFilter = (searchArray: FilterableElement[], searchFacets: FilterFacets): FilterResults  => {
  const results = searchArray.filter((element) => elementMatches(element, searchFacets));
  const facetNames = Object.keys(searchFacets);

  const facetsToFacetValues = searchArray.reduce((map, element) => {
    for (let facetName of facetNames) {
      const facetValuesMap = map.get(facetName) || new Map();
      if (!map.has(facetName)) {
        map.set(facetName, facetValuesMap);
      }
      const facetValue = element[facetName];
      if (!facetValuesMap.has(facetValue)) {
        facetValuesMap.set(facetValue, { name: facetValue, count: 0 });
      }
    }
    return map;
  }, new Map<string, Map<string, FacetValueInfo>>());

  const facets = facetNames.map((facetName) => {
    const otherSearchFacets = facetNames
      .filter(name => name !== facetName)
      .reduce((obj, name) => {
        obj[name] = searchFacets[name];
        return obj;
      }, {} as { [key: string]: string });
    const unfilteredResultsForFacet = searchArray.filter(
      (element) => elementMatches(element, otherSearchFacets),
    );
    const facetValuesMap = facetsToFacetValues.get(facetName);
    if (!facetValuesMap) {
      throw new Error(`Missing entry for ${facetName}`);
    }

    unfilteredResultsForFacet.forEach((result) => {
      const facetValue = result[facetName];
      const valueInfo = facetValuesMap.get(facetValue);
      if (valueInfo) {
        valueInfo.count += 1;
      }
    });

    return { name: facetName, values: Array.from(facetValuesMap.values()) };
  });

  return { results, facets };
};

module.exports = multiFacetFilter;
