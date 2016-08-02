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

var AnotherComponent = Ember.Component.extend({
  layout: hbs`
    <h5>another: {{number}}</h5>
    <button onclick={{action "add"}}>add</button>
  `
});

export default connect(stateToComputed, dispatchToActions)(AnotherComponent);
