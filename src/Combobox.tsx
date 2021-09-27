import React from 'react'
import { css } from '@emotion/css'

import { ComboboxProps, ComponentStyleSpec } from './types'

export const ComboboxStyle =
  (): ComponentStyleSpec =>
  (context) =>
    css({ display: 'flex' })

export const Combobox = ({
  children,
  className,
  comboboxProps,
}: ComboboxProps) => (
  <div className={className} {...comboboxProps}>
    {children}
  </div>
)
