import * as React from 'react';
import {FunctionComponent, ReactElement, Fragment, useEffect} from 'react';
import * as CounterStore from '../store/Counter';
import {AppState} from '../store';
import {connect} from 'react-redux';

interface DispatchProps {
  load: () => void;
  increment: () => void;
  decrement: () => void;
}

type CounterProps = CounterStore.CounterState & DispatchProps;

const Counter: FunctionComponent<CounterProps> = (props: CounterProps): ReactElement => {
  useEffect(() => {
    props.load();
  }, []);

  return (
    <Fragment>
      <h1>Counter</h1>
      <p>This is a simple example of a React component.</p>
      <p>
        Current count: <strong>{props.count}</strong>
      </p>
      <button
        onClick={(): void => {
          props.increment();
        }}>
        Increment
      </button>
      <strong>{props.isLoading ? 'Loading...' : ''}</strong>
    </Fragment>
  );
};

export default connect(
  // Selects which state properties are merged into the component's props
  (state: AppState): CounterStore.CounterState => state.counter,
  // Selects which action creators are merged into the component's props
  CounterStore.actionCreators
)(Counter);
