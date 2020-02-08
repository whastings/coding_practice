const multiFacetFilter = require('./multiFacetFilter');

describe('multiFacetFilter', () => {
  const objects = [
    {
      name: 'JavaScript',
      style: 'c_based',
      paradigm: 'multi',
      typing: 'dynamic',
    },
    {
      name: 'Java',
      style: 'c_based',
      paradigm: 'object_oriented',
      typing: 'static',
    },
    {
      name: 'C++',
      style: 'c_based',
      paradigm: 'object_oriented',
      typing: 'static',
    },
    {
      name: 'Scala',
      style: 'c_based',
      paradigm: 'multi',
      typing: 'static',
    },
    {
      name: 'Kotlin',
      style: 'c_based',
      paradigm: 'multi',
      typing: 'static',
    },
    {
      name: 'Ruby',
      style: 'non_c_based',
      paradigm: 'object_oriented',
      typing: 'dynamic',
    },
    {
      name: 'Python',
      style: 'non_c_based',
      paradigm: 'multi',
      typing: 'dynamic',
    },
    {
      name: 'Haskell',
      style: 'non_c_based',
      paradigm: 'functional',
      typing: 'static',
    },
    {
      name: 'Elm',
      style: 'non_c_based',
      paradigm: 'functional',
      typing: 'static',
    },
  ];

  it('returns the elements matching the search', () => {
    const { results } = multiFacetFilter(objects, { style: 'c_based', paradigm: 'multi', typing: 'static' });

    expect(results).toEqual([
      {
        name: 'Scala',
        style: 'c_based',
        paradigm: 'multi',
        typing: 'static',
      },
      {
        name: 'Kotlin',
        style: 'c_based',
        paradigm: 'multi',
        typing: 'static',
      },
    ]);
  });

  it('returns the facets and their counts', () => {
    const { facets } = multiFacetFilter(objects, { style: 'c_based', paradigm: 'multi', typing: 'static' });
    expect(facets).toEqual([
      {
        name: 'style',
        values: [
          // { name: 'all', count: 2 },
          { name: 'c_based', count: 2 },
          { name: 'non_c_based', count: 0 },
        ],
      },
      {
        name: 'paradigm',
        values: [
          // { name: 'all', count: 4 },
          { name: 'multi', count: 2 },
          { name: 'object_oriented', count: 2 },
          { name: 'functional', count: 0 },
        ],
      },
      {
        name: 'typing',
        values: [
          // { name: 'all', count: 3 },
          { name: 'dynamic', count: 1 },
          { name: 'static', count: 2 },
        ],
      },
    ]);
  });
});
