import React, { SFC } from 'react'
import loremIpsum from 'lorem-ipsum'

interface IProps {
  /** <-- This info should not be displayed */
  count?: number
}

export const PlaceholderText: SFC<IProps> = ({ count }) => (
  <p>
    {loremIpsum({
      count: count || 1,
      units: 'paragraphs',
    })}
  </p>
)

PlaceholderText.displayName = 'PlaceholderText'
