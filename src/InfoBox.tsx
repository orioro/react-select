import React from 'react'
import { css } from '@emotion/css'

import { InfoBoxProps, ComponentStyleSpec } from './types'

import { DEFAULT_PADDING } from './constants'

export const InfoBoxStyle =
  ({
    padding = DEFAULT_PADDING,
  }: { padding?: string | number } = {}): ComponentStyleSpec =>
  ({ state: { isOpen } }) =>
    css({
      display: isOpen ? 'block' : 'none',
      position: 'absolute',
      backgroundColor: 'white',
      top: '100%',
      padding,
      left: 0,
      right: 0,
    })

export const InfoBox = ({ className, children }: InfoBoxProps) => (
  <div className={className}>{children}</div>
)
