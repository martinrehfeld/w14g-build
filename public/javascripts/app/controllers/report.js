App.Controllers.Report = Backbone.Controller.extend({
  routes: {
    "": "index",
    "filter/by_word/:word": "filterByWord"
  },

  initialize: function(options) {
    this.resource = options.resource;
  },

  index: function () {
    new App.Views.Index({ model: this.resource });
  },

  filterByWord: function (word) {
    this.resource.filterByWord(word);
  }
});
