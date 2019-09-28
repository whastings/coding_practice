module.exports = {
  client: {
    service: {
      name: 'github-api',
      localSchemaFile: './node_modules/@octokit/graphql-schema/schema.json'
    },
    includes: ['./src/**/*.tsx'],
    tagName: 'gql',
  },
}
