import React from 'react'
import { optionsSearcher } from '../src/useAutoSearch'
import BR_ESTADOS_E_CIDADES from './brasil-estados-e-cidades'

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export const Debug = ({ data }: { data: any }) => (
  <pre>{JSON.stringify(data, null, '  ')}</pre>
)

type _simulateAsync = <ResultType, ArgsType extends any[]>(
  fn: (...args: ArgsType) => ResultType
) => (...args: ArgsType) => Promise<ResultType>

export const _simulateAsync: _simulateAsync =
  (fn) =>
  (...args) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(fn(...args)), getRandomInt(500, 3000))
    })

export type Estado = {
  sigla: string
  nome: string
}

export const ESTADOS: Estado[] = BR_ESTADOS_E_CIDADES.estados.map(
  ({ sigla, nome }) => ({
    sigla,
    nome,
  })
)

export const estadoToString = (estado: Estado | null) =>
  estado ? `${estado.nome} (${estado.sigla})` : ''

export const searchEstados = optionsSearcher({
  valueToString: estadoToString,
}).bind(null, ESTADOS)

export type Cidade = {
  estado: string
  nome: string
  code: string
}

// @ts-ignore
export const CIDADES: Cidade[] = BR_ESTADOS_E_CIDADES.estados.reduce(
  // @ts-ignore
  (acc, estado) => [
    ...acc,
    ...estado.cidades.map((cidade) => ({
      estado: estado.sigla,
      nome: cidade,

      // Fake city "code"
      code: `cod_${cidade.toLowerCase().replace(/\s*/g, '')}`,
    })),
  ],
  []
)

export const cidadeToString = (cidade: Cidade | null) =>
  cidade ? `${cidade.nome} - ${cidade.estado}` : ''

export const searchCidades = (searchText: string) =>
  optionsSearcher()(
    CIDADES.map((cidade) => ({
      label: cidadeToString(cidade),
      value: cidade,
    })),
    searchText
  ).map((result) => result.value)
