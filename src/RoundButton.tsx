import React from 'react'
import { css, cx } from '@emotion/css'
import { DEFAULT_HIGHLIGHT_COLOR } from './constants'

export const RoundButton = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>): React.ReactElement => (
  <button
    className={cx(
      css({
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1rem',
        height: '1rem',
        borderRadius: '50%',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: DEFAULT_HIGHLIGHT_COLOR,
        },
      }),
      className
    )}
    {...props}
  />
)
