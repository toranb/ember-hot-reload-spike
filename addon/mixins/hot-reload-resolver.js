import Ember from 'ember';
import HotReplacementComponent from 'ember-hot-reload-spike/components/hot-replacement-component';

export default Ember.Mixin.create({
  resolveTemplate (parsedName) {
    if (parsedName.fullName.match(/\-original$/)) {
        parsedName.fullName = parsedName.fullName.replace(/-original$/, '');
        parsedName.fullNameWithoutType = parsedName.fullNameWithoutType.replace(/-original$/, '');
        parsedName.name= parsedName.name.replace(/-original$/, '');
        return this._super(parsedName);
    }
    if(parsedName.type === 'template' && parsedName.fullName.indexOf('components/') > -1) {
        //on purpose to force the hbs driven components to call again w/ -original
        return undefined;
    }
    return this._super(parsedName);
  },
  resolveOther (parsedName) {
    const resolved = this._super(...arguments);
    if(parsedName.type === 'template' && parsedName.fullName.indexOf('components/') > -1) {
        //on purpose to force the hbs driven components to call again w/ -original
        return undefined;
    }
    if (parsedName.type === 'component') {
      console.log('Called resolveOther for component', parsedName);
      if (resolved) {
        return this._resolveComponent(resolved, parsedName);
      }
      if (parsedName.fullName.match(/\-original$/)) {
        parsedName.fullName = parsedName.fullName.replace(/-original$/, '');
        parsedName.fullNameWithoutType = parsedName.fullNameWithoutType.replace(/-original$/, '');
        parsedName.name= parsedName.name.replace(/-original$/, '');
        return this._super(parsedName);
      }
    }
    return resolved;
  },

  _resolveComponent (resolved, parsedName) {
    return HotReplacementComponent.createClass(resolved, parsedName);
  }
});
