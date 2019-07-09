import React, { PureComponent, Component, memo, useState } from 'react';
import ReactDOM from 'react-dom';
import { throttle } from 'lodash';

const data: any = [];

for (let i = 0; i < 2000000; i++) {
  data.push({
    name: 'Item #' + i,
    item: 'hey' + i,
  });
}

const color = ['red', 'green', 'yellow', 'blue'];

const Row = memo(({ name, item, idx, originalIdx }: any) => (
  <div
    style={{ border: `1px solid ${color[originalIdx % 4]}` }}
    data-key={originalIdx}
  >
    <div>{name}</div>
    <div>{item}</div>
  </div>
));

class App extends PureComponent {
  visiableData = data;
  state = {
    height: '500px',
    index: 0,
    top: 0,
  };
  outerNode: any = React.createRef();
  componentDidMount() {
    this.setState((state: any) => ({
      ...state,
      height: `${this.visiableData.length * 40}px`,
    }));

    (ReactDOM.findDOMNode(this.outerNode.current) as any).addEventListener(
      'scroll',
      throttle(
        (e: any) =>
          this.setState((state: any) => {
            const index = Math.floor(e.target.scrollTop / 35);
            return {
              ...state,
              index: index - 1 > 0 ? index - 1 : 0,
              top: -Math.floor(e.target.scrollTop % 35),
            };
          }),
        30
      )
    );
  }
  render() {
    return (
      <div>
        <div
          ref={this.outerNode as any}
          style={{
            border: '1px solid black',
            overflow: 'auto',
            width: '200px',
            height: '500px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '200px',
              height: this.state.height,
              position: 'unset',
            }}
          >
            <div
              style={{
                width: '200px',
                height: '450px',
                top: this.state.top,
                position: 'sticky',
              }}
            >
              {this.visiableData
                .slice(this.state.index, this.state.index + 15)
                .map(({ name, item }: any, idx: number) => (
                  <Row
                    name={name}
                    item={item}
                    key={idx}
                    idx={idx}
                    originalIdx={this.state.index + idx}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
