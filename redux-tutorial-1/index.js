import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

const low = ((state=0, action) => { //reducer
  console.log('action', action);

  if (action.type === 'UP') {
    return state + 1;
  }

  return state;
});

const high = ((state=9), action) => { //reducer
  if (action.type === 'DOWN') {
    return state -1;
  }

  return state;
});

const Basement = (props) => {
  const state = props.high;
  return (
    <div>basement! {state}
      <button onClick={ this.props.down }>DOWN</button>
    </div>
  )
}

const Middle = () => {
  return (
    <div>middle! <XBasement /></div>
  )
}
const TopLevel = (props) => {
  const state = this.props.low;

  return (
    <div>top! {state}
      <button onClick={ this.props.up }>UP</button>
      <Middle />
    </div>

  );
}

const mapState = (state) => {
    return {
      low: state.low,
    }
}
const mapDispatch = (dispatch) => {
  return {
    up: () => dispatch({type: 'UP'})
  }
}
const mapStateBasement = (state) => {
  return {
    high: state.high
  }
}
const mapDispatchBasement = (dispatch) => {
  return {
    down: () => dispatch({type: 'DOWN'})
  }
}

const XTopLevel = connect(mapState, mapDispatch)(TopLevel);
const XBasement = connect(mapStateBasement, mapDispatchBasement)(Basement);

// class Provider extends React.Component {
//   getChildContext() {
//     return {
//       store: this.props.store
//     }
//   }

//   render() {
//     return this.props.children;
//   }
// }

// Provider.childContextTypes = {
//   store: React.PropTypes.object
// }

render((
  <Provider store={createStore(combineReducers({ low: low, high: high }))} >
    <XTopLevel />
  </Provider>
), document.getElementById('container'));
