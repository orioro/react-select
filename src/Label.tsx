import React from 'react'

import { LabelProps, ComponentStyleSpec } from './types'

export const LabelStyle = (): ComponentStyleSpec => null

export const Label = ({
  children,
  labelProps,
  className,
}: LabelProps): React.ReactElement => (
  <label className={className} {...labelProps}>
    {children}
  </label>
)
