import Ember from 'ember';

export default Ember.Component.extend({
    number: 0,
    title: Ember.computed('number', function() {
        return 'the number: ' + this.get('number');
    }),
    actions: {
        add() {
            var next = this.get('number') + 1;
            this.set('number', next);
        }
    }
})
