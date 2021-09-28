import React, { ReactElement } from 'react'
import { css, keyframes } from '@emotion/css'

const dotsAnimation = keyframes`
  0%, 20% {
    content: '.'
  }
  40% {
    content: '..'
  }
  60% {
    content: '...'
  }
  90%, 100% {
    content: ''
  }
`

const styles = css(`
  &::after {
    animation: ${dotsAnimation} 1.5s linear infinite;
    content: ''
  }
`)

export const LoadingIndicator = ({
  message = '',
}: {
  message?: string
}): ReactElement => <div className={styles}>{message}</div>
