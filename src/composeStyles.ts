import { css } from '@emotion/css'
import { applyIfFunction } from './util'
import { ComponentStyleSpec } from './types'

export const composeStyles =
  <StyleContextType>(...styles: ComponentStyleSpec<StyleContextType>[]) =>
  (context: StyleContextType) =>
    css(styles.map((style) => applyIfFunction(style, context)))
