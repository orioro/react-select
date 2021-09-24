import React from 'react'
import { css, cx } from '@emotion/css'

import { MenuProps, Component } from './types'

export const Menu: Component<MenuProps> = ({
  state: { isOpen, options },
  menuProps,
  valueToString,
  getOptionDomProps,
  renderOption,
  style,
}) => {
  const shouldDisplay = isOpen && options.length > 0

  return (
    <ul
      className={cx(
        css([
          `
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            margin: 0;
            padding: 0;
            list-style: none;

            max-height: 200px;
            overflow: auto;
          `,
          shouldDisplay ? `border: 1px solid currentColor;` : {},
          style,
        ])
      )}
      {...menuProps}
    >
      {isOpen &&
        options.map((option, index) => (
          <li
            key={`${valueToString(option)}${index}`}
            {...getOptionDomProps({ item: option, index })}
          >
            {renderOption({
              option,
              index,
            })}
          </li>
        ))}
    </ul>
  )
}
