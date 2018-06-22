/* eslint-disable global-require */

const path = require('path')
const { DefinePlugin } = require('webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const stringifyValues = map =>
  Object.entries(map).reduce((acc, [key, value]) => ({ ...acc, [key]: JSON.stringify(value) }), {})

module.exports = {
  name: 'storybook',
  target: 'web',
  devtool: 'inline-source-map',
  mode: 'development',

  entry: {
    client: [require.resolve('@babel/polyfill'), path.resolve('./src/index.tsx')],
  },

  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [],
    alias: {
      // Ensures the App and react-hot-loader are using the same instance of react
      // @see: https://github.com/gaearon/react-hot-loader/issues/894
      react: require.resolve('react'),
      'babel-core': require.resolve('@babel/core'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    targets: {
                      browsers: ['last 2 versions'],
                    },
                    // Disable modules parsing for web, see: ModuleConcatenationPlugin
                    // Also required for tree shaking!
                    // @see: https://webpack.js.org/plugins/module-concatenation-plugin/
                    modules: false,
                  },
                ],
                require.resolve('@babel/preset-stage-3'),
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-typescript'),
              ],
              plugins: [
                require.resolve('react-hot-loader/babel'),
                require.resolve('loadable-components/babel'),
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ForkTsCheckerPlugin({
      tsconfig: './tsconfig.json',
    }),
    new DefinePlugin({
      'process.env': stringifyValues({
        BROWSER: true,
        NODE_ENV: 'development',
      }),
    }),
  ],

  /**
   * Push runtime and vendors into their own chunks so we
   * can more easily review the output of our own code.
   */
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
