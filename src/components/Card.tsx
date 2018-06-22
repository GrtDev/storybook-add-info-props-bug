import React, { SFC, HTMLAttributes } from 'react'

interface IProps {
  /** Children info here */
  children?: React.ReactNode
}

export const Card: SFC<IProps & HTMLAttributes<HTMLElement>> = ({ children, ...rest }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '20px',
      border: '1px solid #4286f4',
      backgroundColor: '#d6e5ff',
    }}
    {...rest}>
    {children}
  </div>
)

Card.displayName = 'Card'
