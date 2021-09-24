import React from 'react'
import { css, cx } from '@emotion/css'

import { ToggleMenuButtonProps } from './types'

export const ToggleMenuButton = ({
  buttonProps,
  children,
  style
}: ToggleMenuButtonProps): React.ReactElement => (
  <button
    className={cx(css([``, style]))}
    type='button'
    aria-label='toggle menu'
    {...buttonProps}
  >
    {children}
  </button>
)
