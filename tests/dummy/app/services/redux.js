import Ember from 'ember';
import Redux from 'npm:redux';

var { createStore } = Redux;

var reducer = ((state, action) => {
    if(action.type === 'ADD') {
        return state + 1;
    }
    return state || 0;
});

var store = createStore(reducer);

//really weak redux service for the dummy app
export default Ember.Service.extend({
    init() {
        this.store = store;
        this._super(...arguments);
    },
    getState() {
        return this.store.getState();
    },
    dispatch(action) {
        return this.store.dispatch(action);
    },
    subscribe(func) {
        return this.store.subscribe(func);
    }
});
