import { css } from '@emotion/css'
import { applyIfFunction } from './util'
import { ComponentStyleType, PlainObject } from './types'

type composeStyles = <StyleContextType>(
  ...styles: ComponentStyleType<StyleContextType>[]
) => (context: StyleContextType) => string

export const composeStyles: composeStyles =
  (...styles) =>
  (context) =>
    css(
      styles.map((style) => applyIfFunction(style, context)) as (
        | string
        | PlainObject
      )[]
    )
