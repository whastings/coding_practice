interface FilterableElement {
  [key: string]: string,
}

interface FilterFacets {
  [key: string]: string,
}

interface FilterResults {
  results: FilterableElement[],
  facets: Array<{
    name: string,
    values: Array<{ name: string, count: number }>,
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

  const facetValues = facetNames.reduce((facetMap, facetName) => {
    facetMap.set(facetName, new Set<string>());
    return facetMap;
  }, new Map<string, Set<string>>());

  searchArray.forEach((element) => {
    Object.keys(element).forEach((key) => {
      const valuesArray = facetValues.get(key);
      if (valuesArray) {
        valuesArray.add(element[key]);
      };
    });
  });

  const facets = facetNames.map((name) => {
    const valuesArray = Array.from(facetValues.get(name) || []);
    const values = valuesArray.map((value) => {
      const updatedFacets = { ...searchFacets, [name]: value };
      const count = searchArray.filter((element) => elementMatches(element, updatedFacets)).length;
      return { name: value, count };
    });
    return {
      name,
      values,
    };
  });

  return { results, facets };
};

module.exports = multiFacetFilter;
