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

const without = (
  object: { [key: string]: any },
  keyToRemove: string
): { [key: string]: any } => {
  return Object.keys(object)
    .filter(key => key !== keyToRemove)
    .reduce((newObj, name) => {
      newObj[name] = object[name];
      return newObj;
    }, {} as { [key: string]: any });
};

const elementMatches = (element: FilterableElement, searchFacets: FilterFacets): boolean => {
  for (let key of Object.keys(searchFacets)) {
    if (element[key] !== searchFacets[key]) {
      return false;
    }
  }
  return true;
};

const filterSearchArray = (searchArray: FilterableElement[], searchFacets: FilterFacets): FilterableElement[] => {
  return searchArray.filter(element => elementMatches(element, searchFacets));
}

const getFacetsToFacetValues = (
  facetNames: string[],
  searchArray: FilterableElement[]
): Map<string, Map<string, FacetValueInfo>> => {
  const facetsToFacetValues = facetNames.reduce((map, facetName) => {
    map.set(facetName, new Map());
    return map;
  }, new Map());

  searchArray.forEach((element) => {
    for (let facetName of facetNames) {
      const facetValuesMap = facetsToFacetValues.get(facetName)!;
      const facetValue = element[facetName];
      if (!facetValuesMap.has(facetValue)) {
        facetValuesMap.set(facetValue, { name: facetValue, count: 0 });
      }
    }
  });

  return facetsToFacetValues;
};

const multiFacetFilter = (searchArray: FilterableElement[], searchFacets: FilterFacets): FilterResults  => {
  const results = filterSearchArray(searchArray, searchFacets);
  const facetNames = Object.keys(searchFacets);
  const facetsToFacetValues = getFacetsToFacetValues(facetNames, searchArray);

  const facets = facetNames.map((facetName) => {
    const otherSearchFacets = without(searchFacets, facetName);
    const unfilteredResultsForFacet = filterSearchArray(searchArray, otherSearchFacets);
    const facetValuesMap = facetsToFacetValues.get(facetName)!;

    unfilteredResultsForFacet.forEach((result) => {
      const facetValue = result[facetName];
      const valueInfo = facetValuesMap.get(facetValue)!;
      valueInfo.count += 1;
    });

    return { name: facetName, values: Array.from(facetValuesMap.values()) };
  });

  return { results, facets };
};

module.exports = multiFacetFilter;
