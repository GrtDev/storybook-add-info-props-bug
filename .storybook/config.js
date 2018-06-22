import { configure, addDecorator } from '@storybook/react'
import { setDefaults, withInfo } from '@storybook/addon-info'

/**
 * Note that this file is compiled into the build and therefor runs on the `client` side.
 * This means you can not use any NodeJS specific modules here.
 */

// setDefaults({
//   header: false,
//   inline: true, // Displays info inline vs click button to view
// })

/**
 * Add global `withInfo` decorator to add PropTypes information to the components
 */
// addDecorator((story, context) => withInfo('')(story)(context))

// `app-src` is an alias pointing to the `paths.src`,
// This is added in the storybook webpack config and allows us to dynamically load the stories of any app.
const contextRequire = require.context('../src', true, /\.?stories.tsx?$/)

function loadStories() {
  const storyPaths = contextRequire.keys()
  storyPaths.forEach(story => contextRequire(story))
}

configure(loadStories, module)
