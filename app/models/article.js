import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  perex: DS.attr(),
  body: DS.attr(),
  fullyLoaded: DS.attr('boolean')
});
