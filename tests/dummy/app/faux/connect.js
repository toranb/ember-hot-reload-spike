import Ember from 'ember';

const { computed, defineProperty } = Ember;

// copy paste from the ember-redux project
var connect = function(mapStateToComputed, mapDispatchToActions) {
    var shouldSubscribe = Boolean(mapStateToComputed);
    var finalMapStateToComputed = mapStateToComputed || function() {return {};};
    var finalMapDispatchToActions = mapDispatchToActions || function() {return {};};
    return function wrapWithConnect(WrappedComponent) {
        var mapState = function(state) {
            var props = [];
            Object.keys(finalMapStateToComputed(state)).forEach(function(key) {
                props.push(key);
            });
            return props;
        };
        var mapDispatch= function(dispatch) {
            var actions = [];
            Object.keys(finalMapDispatchToActions(dispatch)).forEach(function(key) {
                actions.push(key);
            });
            return actions;
        };
        return WrappedComponent.extend({
            redux: Ember.inject.service('redux'),
            init() {
                var component = this;
                component['actions'] = Ember.$.extend({}, component['actions']);
                var redux = this.get('redux');
                var props = mapState(redux.getState());
                var dispatch = mapDispatch(redux.dispatch.bind(redux));
                props.forEach(function(name) {
                    defineProperty(component, name, computed(function() {
                        return finalMapStateToComputed(redux.getState())[name];
                    }).property().readOnly());
                });
                dispatch.forEach(function(action) {
                    component['actions'][action] = finalMapDispatchToActions(redux.dispatch.bind(redux))[action];
                });
                if (shouldSubscribe && !this.unsubscribe) {
                    this.unsubscribe = redux.subscribe(() => {
                        props.forEach(function(name) {
                            component.notifyPropertyChange(name);
                        });
                    });
                }
                this._super(...arguments);
            },
            willDestroy() {
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            }
        });
    };
};

export default connect;
