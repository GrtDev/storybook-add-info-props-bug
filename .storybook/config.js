import { configure, addDecorator } from '@storybook/react'
// import { setDefaults, withInfo } from '@storybook/addon-info'

// setDefaults({
//   header: false,
//   inline: true, // Displays info inline vs click button to view
// })

/**
 * Add global `withInfo` decorator to add PropTypes information to the components
 */
// addDecorator((story, context) => withInfo('')(story)(context))

const contextRequire = require.context('../src', true, /\.?stories.tsx?$/)

function loadStories() {
  const storyPaths = contextRequire.keys()
  storyPaths.forEach(story => contextRequire(story))
}

configure(loadStories, module)
