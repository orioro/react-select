import React from 'react'
import { css, cx } from '@emotion/css'

import { LabelProps } from './types'

export const Label = ({
  label,
  labelProps,
  style
}: LabelProps): React.ReactElement => (
  <label className={cx(css([``, style]))} {...labelProps}>
    {label}
  </label>
)
