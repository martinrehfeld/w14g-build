App.Controllers.Report = Backbone.Controller.extend({
  routes: {
    "": "index",
    "filter/by_word/:word": "filterByWord",
    "reset_filter": "resetFilter"
  },

  initialize: function(options) {
    this.resource = options.resource;
    this.view = new App.Views.Index({ model: this.resource });
  },

  index: function () {},

  filterByWord: function (word) {
    this.resource.filterByWord(decodeURIComponent(word));
  },

  resetFilter: function () {
    this.resource.resetFilter();
  }
});
