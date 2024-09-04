/// <reference types="vite/client" />

declare namespace React {
  export function useActionState<State>(
    action: (
      state: Awaited<State>,
      formData: FormData
    ) => State | Promise<State>,
    initialState: Awaited<State>,
    permalink?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): [State, any];
}
