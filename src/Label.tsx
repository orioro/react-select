import React from 'react'

import { LabelType, SelectComponentStyleType } from './types'

export const LabelStyle = (): SelectComponentStyleType => null

export const Label: LabelType = ({ children, labelProps, className }) => (
  <label className={className} {...labelProps}>
    {children}
  </label>
)
