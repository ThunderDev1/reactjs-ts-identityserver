import * as React from 'react';
import * as CounterStore from '../store/Counter';
import {AppState} from '../store';
import {connect} from 'react-redux';

interface DispatchProps {
  increment: () => void;
  decrement: () => void;
}

type CounterProps = CounterStore.CounterState & DispatchProps;

const Counter = (props: CounterProps) => {
  return (
    <div className="container">
      <h2>Counter</h2>
      <p>This is a simple example of a redux connected React component.</p>
      <p>Current count: <strong>{props.count}</strong></p>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          props.increment();
        }}>
        Increment
      </button>
      <button
        className="btn btn-primary btn-sm mx-1"
        onClick={() => {
          props.decrement();
        }}>
        Decrement
      </button>
    </div>
  );
};

export default connect(
  // Selects which state properties are merged into the component's props
  (state: AppState): CounterStore.CounterState => state.counter,
  // Selects which action creators are merged into the component's props
  CounterStore.actionCreators
)(Counter);
