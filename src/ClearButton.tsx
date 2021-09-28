import React from 'react'
import { RoundButton } from './RoundButton'
import { ClearButtonType, SelectComponentStyleType } from './types'

export const ClearButtonStyle = (): SelectComponentStyleType => null

export const ClearButton: ClearButtonType = ({
  className,
  actions: { reset },
}) => (
  <RoundButton
    className={className}
    onClick={(e) => {
      e.preventDefault()
      reset()
    }}
  >
    ×
  </RoundButton>
)
