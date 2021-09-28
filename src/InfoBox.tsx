import React from 'react'
import { css } from '@emotion/css'

import { InfoBoxType, SelectComponentStyleType } from './types'

import { DEFAULT_PADDING } from './constants'

export const InfoBoxStyle =
  ({
    padding = DEFAULT_PADDING,
  }: { padding?: string | number } = {}): SelectComponentStyleType =>
  ({ state: { isOpen } }) =>
    css({
      display: isOpen ? 'block' : 'none',
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid currentColor',
      top: '100%',
      padding,
      left: 0,
      right: 0,
    })

export const InfoBox: InfoBoxType = ({ className, children }) => (
  <div className={className}>{children}</div>
)
