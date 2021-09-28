import React from 'react'
import { css } from '@emotion/css'

import { ComboboxType, SelectComponentStyleType } from './types'

export const ComboboxStyle = (): SelectComponentStyleType => () =>
  css({ display: 'flex' })

export const Combobox: ComboboxType = ({
  children,
  className,
  comboboxProps,
}) => (
  <div className={className} {...comboboxProps}>
    {children}
  </div>
)
