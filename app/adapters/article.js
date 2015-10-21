import Ember from 'ember';
import DS from 'ember-data';
import config from 'ef-reader/config/environment';

export default DS.Adapter.extend({
  proxy: config.APP.CORS_PROXY,
  host: config.APP.EF_URL,

  findRecord(store, type, id) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", this.buildUrl(`clanky/${id}`), true);
      xhr.responseType = "document";
      xhr.onload   = ()  => Ember.run(null, resolve, xhr.response);
      xhr.onerror  = ()  => Ember.run(null, reject, xhr.statusText);
      xhr.send();
    });
  },

  findAll() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", this.buildUrl('clanky/aktuality/'), true);
      xhr.responseType = "document";
      xhr.onload   = ()  => Ember.run(null, resolve, xhr.response);
      xhr.onerror  = ()  => Ember.run(null, reject, xhr.statusText);
      xhr.send();
    });
  },

  buildUrl(path) {
    var parts = [];

    if (this.get("proxy")) {
      parts.push(this.get("proxy").replace(/\/$/, ""));
    }

    if (this.get("host")) {
      parts.push(this.get("host").replace(/\/$/, ""));
    }

    if (!parts.length) {
      parts.push("");
    }

    parts.push(path);

    return parts.join("/");
  },

  shouldReloadAll() {
    return true;
  }

});
