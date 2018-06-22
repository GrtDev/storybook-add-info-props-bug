import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Card } from './Card'
import { PlaceholderText } from '../styleguide/PlaceholderText'

const story = storiesOf('Card', module)

story.add('Card', () => <Card>Hello World</Card>)

story.add(
  'Card with Info',
  withInfo({
    header: false,
    inline: true,
  })(() => <Card>Hello World</Card>),
)

story.add(
  'Card with Info and propTablesExclude',
  // @ts-ignore
  withInfo({
    header: false,
    inline: true,
    propTablesExclude: [PlaceholderText], // typings might not be correct here as it shows: Property 'type' is missing in type 'StatelessComponent<IProps>'.
  })(() => (
    <Card>
      <PlaceholderText />
    </Card>
  )),
)

story.add(
  'Card with Info and propTablesExclude 2',
  withInfo({
    header: false,
    inline: true,
    propTablesExclude: [<PlaceholderText />], // according to the typing this is correct? Makes no difference though
  })(() => (
    <Card>
      <PlaceholderText />
    </Card>
  )),
)
