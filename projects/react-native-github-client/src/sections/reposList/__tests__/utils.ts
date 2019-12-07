let id = 0;

export const createRepo = ({ name, ownerName }: { name: string, ownerName: string }) => {
  id = id + 1

  return {
    id: id.toString(),
    name,
    owner: {
      login: ownerName,
      __typename: 'User' as const,
    },
    __typename: 'Repository' as const,
  }
}
