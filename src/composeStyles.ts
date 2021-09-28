import { css } from '@emotion/css'
import { applyIfFunction } from './util'
import { ComponentStyleType } from './types'

export const composeStyles =
  <StyleContextType>(...styles: ComponentStyleType<StyleContextType>[]) =>
  (context: StyleContextType) =>
    css(styles.map((style) => applyIfFunction(style, context)))
