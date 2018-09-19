import React, { Component } from 'react';
import Slider from './Slider';
import './App.css';

class App extends Component {
  state = {
    first: 32,
    second: 32,
    third: { from: 6, to: 32 },
    fourth: { from: 6, to: 32 },
  };

  onChange = name => value => this.setState({ [name]: value });

  render() {
    const { first, second, third, fourth } = this.state

    return (
      <div className='wrapper'>
        <div style={{ marginTop: '32px' }}>
          <Slider value={first} max={50} onChange={this.onChange('first')} />
        </div>
        <div style={{ marginTop: '32px' }}>
          <Slider
            value={second}
            step={5}
            max={50}
            onChange={this.onChange('second')}
          />
        </div>
        <div style={{ marginTop: '32px' }}>
          <Slider
            range
            value={third}
            max={50}
            onChange={this.onChange('third')}
          />
        </div>
        <div style={{ marginTop: '32px' }}>
          <Slider
            range
            value={fourth}
            step={5}
            max={50}
            onChange={this.onChange('fourth')}
          />
        </div>
      </div>
    );
  }
}

export default App;
