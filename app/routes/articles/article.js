import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    window.scrollTo(0,0);
  },

  model(params) {
    return this.store.find('article', params.article_id);
  },

  afterModel(model) {
    return model.get('fullyLoaded') ? model : model.reload();
  }

});
