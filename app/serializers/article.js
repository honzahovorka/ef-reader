import Ember from 'ember';
import DS from 'ember-data';

function extractArray(html) {
  const articles = [];

  toArray(Ember.$(".col-center .box.cols.per .col.r.tran", html)).forEach((el) => {
    const $el = Ember.$(el);
    const $a = $el.find('h2.lab.small a');

    const id = $a.attr('href').match(/[^/]*(?=(\/)?$)/)[0];
    const title = $a.text();
    const perex = $el.find('.article-perex').text();
    const fullyLoaded = false;

    articles.push({
      id, title, perex, fullyLoaded
    });
  });

  return { articles };
}

function extractSingle(html, id) {
  const $article = Ember.$(".col-center .article", html);
  const title = $article.find('h2').text();
  const body = $article.find('.text').html();

  const article = {
    id: id,
    title: title,
    body: body,
    fullyLoaded: true
  };

  return { article };
}

function toArray(arr) {
  return [].map.call(arr, item => item);
}

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  normalizeSingleResponse(store, type, payload, id) {
    payload = extractSingle(payload, id);

    return this._super(store, type, payload, id);
  },

  normalizeArrayResponse(store, type, payload) {
    payload = extractArray(payload);

    return this._super(store, type, payload);
  }
});
