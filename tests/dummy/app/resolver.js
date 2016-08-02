import EmberResolver from 'ember-resolver';
import HotReloadMixin from 'ember-hot-reload-spike/mixins/hot-reload-resolver';

const Resolver = EmberResolver.extend(HotReloadMixin);
export default Resolver;
