import { ReactElement } from 'react'

export type PlainObject = {
  [key: string]: any
}
export type FnValueToString<ValueType = any> = (value: ValueType | null) => string
export type ComponentType<PropsType> = (props: PropsType) => ReactElement

export type ComponentStyleType<ContextType = {}> =
  | null
  | string
  | PlainObject
  | ((context: ContextType) => string | null)
