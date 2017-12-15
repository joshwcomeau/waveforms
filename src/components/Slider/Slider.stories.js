// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Slider from './Slider';

type State = {
  value: number,
};
class SliderWrapper extends PureComponent<Any, State> {
  state = {
    value: 0,
  };

  handleChange = (value: number) => {
    this.setState({ value });

    // Delegate to a supplied function as well
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    return (
      <div style={{ padding: 30 }}>
        <Slider
          {...this.props}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

storiesOf('Slider', module)
  .add('default', () => <SliderWrapper onChange={action('Slider change')} />)
  .add('with bars', () => (
    <SliderWrapper withBars onChange={action('Slider change')} />
  ))
  .add('Different range (-1 to 1, 0.05 step)', () => (
    <SliderWrapper
      withBars
      min={-1}
      max={1}
      defaultValue={0}
      step={0.05}
      onChange={action('Slider change')}
    />
  ));
