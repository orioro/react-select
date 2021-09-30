import React from 'react'
import { css } from '@emotion/css'

import { ComboboxType, SelectComponentStyleType } from './types'

export const ComboboxStyle = (): SelectComponentStyleType => () =>
  css({
    display: 'flex',
    alignItems: 'center',
    border: '1px solid currentColor',
    backgroundColor: 'white',
  })

export const Combobox: ComboboxType = ({
  children,
  className,
  comboboxProps,
}) => (
  <div className={className} {...comboboxProps}>
    {children}
  </div>
)
