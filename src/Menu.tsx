import React from 'react'
import { css } from '@emotion/css'

import {
  MenuProps,
  Component,
  ComponentStyleSpec,
} from './types'

export const MenuStyle =
  (): ComponentStyleSpec =>
  (context) =>
    css`
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      margin: 0;
      padding: 0;
      list-style: none;

      max-height: 200px;
      overflow: auto;
      background-color: white;
      border: ${context.state.isOpen && context.state.options.length
        ? '1px solid currentColor'
        : 'none'};
    `

export const Menu: Component<MenuProps> = ({
  className,
  state: { isOpen, options },
  menuProps,
  valueToString,
  getOptionDomProps,
  renderOption,
}) => {
  return (
    <ul className={className} {...menuProps}>
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
