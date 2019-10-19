export const createRepo = ({ name, ownerName }: { name: string, ownerName: string }) => {
  return {
    name,
    owner: {
      login: ownerName,
      __typename: 'User' as const,
    },
    __typename: 'Repository' as const,
  }
}
