// @flow
import * as React from 'react'
import { equals } from 'ramda'
import SimpleSlider, { Range, Handle } from 'rc-slider'
import Tooltip from 'rc-tooltip'
import type { SliderProps, RangeValue } from './contract'
import { defaultProperties } from './contract'

type State = {
  value: RangeValue | number,
}

const ALLOW_CROSS = false
const TOOLTIP_CLASSNAME = 'rc-slider-tooltip'
const TOOLTIP_PLACEMENT = 'top'
const TOOLTIP_ALIGN_PARAMS = { offset: [0, -5] }
const STEPS_TO_ALLOW_DOTS = 2

class Slider extends React.Component<SliderProps, State> {
  static defaultProps = defaultProperties

  static getDerivedStateFromProps(props: SliderProps, state: State): $Shape<State> {
    if (equals(props.value, state.value)) {
      return null
    }

    return { value: props.value }
  }

  constructor(props: SliderProps) {
    super(props)

    const min = props.min || defaultProperties.min
    const max = props.max || defaultProperties.max
    const value = props.range ? { from: min, to: max } : min

    this.state = Slider.getDerivedStateFromProps(props, { value })
  }

  componentWillReceiveProps(nextProps: SliderProps) {
    const result = Slider.getDerivedStateFromProps(nextProps, this.state)

    if (result) {
      this.setState(result)
    }
  }

  onDrag = (value: number[] | number) => {
    const { onChange } = this.props

    if (this.props.range && Array.isArray(value)) {
      const [from, to] = value
      this.setState({ value: { from, to } })

      // $FlowFixMe
      onChange && onChange({ from, to })
    } else if (typeof value === 'number') {
      this.setState({ value })

      // $FlowFixMe
      onChange && onChange(value)
    }
  }

  // eslint-disable-next-line no-unused-vars
  renderHandle = ({ value, index, dragging, ...restProps }: *) => {
    const { renderLabel } = this.props

    const tipFormatter = renderLabel || defaultProperties.renderLabel

    return (
      <Tooltip
        key={index}
        visible
        overlay={tipFormatter(value)}
        prefixCls={TOOLTIP_CLASSNAME}
        placement={TOOLTIP_PLACEMENT}
        align={TOOLTIP_ALIGN_PARAMS}
      >
        <Handle data-dragging={dragging} value={value} {...restProps} />
      </Tooltip>
    )
  }

  renderRange() {
    const { value } = this.state

    // flow bitches
    if (typeof value === 'number') {
      return null
    }

    const { disabled, min, max, step } = this.props

    return (
      <Range
        // dotStyle={{ width: '10px', height: '10px', background: '#ccc' }}
        dots={step && step >= STEPS_TO_ALLOW_DOTS}
        min={min}
        max={max}
        step={step}
        value={[value.from, value.to]}
        disabled={disabled}
        onChange={this.onDrag}
        handle={this.renderHandle}
        allowCross={ALLOW_CROSS}
      />
    )
  }

  renderSlider() {
    const { value } = this.state
    const { disabled, min, max, step } = this.props

    return (
      <SimpleSlider
        dots={step && step >= STEPS_TO_ALLOW_DOTS}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={this.onDrag}
        handle={this.renderHandle}
      />
    )
  }

  render() {
    const { range } = this.props

    return range ? this.renderRange() : this.renderSlider()
  }
}

export default Slider
