import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'dummy/faux/connect';

var stateToComputed = (state) => {
  return {
    number: state
  };
};

var dispatchToActions = (dispatch) => {
  return {
    add: () => dispatch({type: 'ADD'})
  };
};

var NumberComponent = Ember.Component.extend({
  layout: hbs`
    <h1>number: {{number}}</h1>
    <button onclick={{action "add"}}>add</button>
  `
});

export default connect(stateToComputed, dispatchToActions)(NumberComponent);
