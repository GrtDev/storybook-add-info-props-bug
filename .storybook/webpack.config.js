const path = require('path')
const minimist = require('minimist')

const merge = require('lodash/merge')
const mergeWith = require('lodash/mergeWith')
const customWebpackConfig = require('../webpack.config')

function concatArrays(value, srcValue) {
  if (value && value.constructor === Array) {
    return value.concat(srcValue)
  }
}

const ariaProps = [
  'aria-activedescendant',
  'aria-atomic',
  'aria-autocomplete',
  'aria-busy',
  'aria-checked',
  'aria-controls',
  'aria-colcount',
  'aria-colindex',
  'aria-colspan',
  'aria-current',
  'aria-describedby',
  'aria-details',
  'aria-disabled',
  'aria-dropeffect',
  'aria-errormessage',
  'aria-expanded',
  'aria-flowto',
  'aria-grabbed',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-level',
  'aria-live',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-owns',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-relevant',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext',
]

/**
 * Modify Storybooks webpack config here.
 * @param {object} storybookBaseConfig
 * @param {'DEVELOPMENT' | 'PRODUCTION'} env
 */
module.exports = (storybookBaseConfig, env) => {
  const config = mergeWith(
    {},
    storybookBaseConfig,
    {
      resolve: customWebpackConfig.resolve,
      devtool: 'inline-source-map',
      module: customWebpackConfig.module,
      plugins: customWebpackConfig.plugins.filter(plugin => {
        return ['ForkTsCheckerWebpackPlugin'].includes(plugin.constructor.name)
      }),
      node: {
        __dirname: true,
      },
    },
    concatArrays,
  )

  /**
   * Here we attempt to inject the `react-docgen-typescript-loader` so Storybook can properly display
   * PropTypes information on the Components
   */
  const typescriptLoader = config.module.rules.find(rule => rule.test.test('typescript.tsx'))
  if (typescriptLoader) {
    if (!typescriptLoader.use) {
      log.warn(
        'typescript loader does not contain an `use` Array! Could not inject TS docgen loader!',
      )
    } else {
      typescriptLoader.use.push({
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          // Skip props without documentation as this is the only way to filter out all the default HTML props from components
          skipPropsWithoutDoc: true,
          skipPropsWithName: ariaProps,
        },
      })
    }
  }

  return config
}
