// @flow

export type RangeValue = {|
  from: number,
  to: number,
|}

type BaseSliderProps = {|
  min?: number,
  max?: number,
  step?: number,
  disabled?: boolean,
  renderLabel?: (value: number) => string,
|}

type RangeSliderProps = {|
  ...BaseSliderProps,
  range: true,
  value: RangeValue,
  onChange: (value: RangeValue) => void,
|}

type SimpleSliderProps = {|
  ...BaseSliderProps,
  range: false,
  value: number,
  onChange: (value: number) => void,
|}

export type SliderProps = SimpleSliderProps | RangeSliderProps

export const defaultProperties = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  renderLabel: (value: number) => value,
}