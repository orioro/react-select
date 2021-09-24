import React from 'react'
import { css, cx } from '@emotion/css'

import { ComboboxProps } from './types'

export const Combobox = ({ children, style, comboboxProps }: ComboboxProps) => (
  <div className={cx(css([{ display: 'flex' }, style]))} {...comboboxProps}>
    {children}
  </div>
)
