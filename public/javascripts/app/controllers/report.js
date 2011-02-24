App.Controllers.Report = Backbone.Controller.extend({
  routes: {
    "": "index",
    "filter/by_word/:word": "filterByWord"
  },

  initialize: function(options) {
    this.resource = options.resource;
  },

  index: function () {
    var report = this.resource;
    report.loadTweets();
    new App.Views.Index({ model: report });
  },

  filterByWord: function (word) {
    var report = this.resource;
    report.filterByWord(word);
  }
});
