function configSVGLoader(config) {
  config.module.rules.push({
    test: /\.svg$/,
    include: /node_modules\/bootstrap-icons/,
    use: ['@svgr/webpack'],
  });
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config, { configType }) => {
    configSVGLoader(config);
    return config;
  },
};
