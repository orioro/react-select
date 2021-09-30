import React from 'react'
import { css } from '@emotion/css'

import { MenuType, SelectComponentStyleType } from './types'

export const MenuStyle = (): SelectComponentStyleType => (context) =>
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
    border-top: none;
  `

export const Menu: MenuType = ({
  className,
  state: { isOpen, options },
  menuProps,
  getOptionDomProps,
  renderOption,
}) => {
  return (
    <ul className={className} {...menuProps}>
      {isOpen &&
        options.map((option, index) => (
          <li
            key={option.label}
            {...getOptionDomProps({ option, index })}
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
