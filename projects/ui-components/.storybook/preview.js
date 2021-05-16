import wrapStory from '../src/utils/wrapStory';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [wrapStory];
