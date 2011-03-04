App.Controllers.Report = Backbone.Controller.extend({
  routes: {
    "": "index",
    ":screen_name": "show",
    ":screen_name/:word": "filter"
  },

  initialize: function() {
    this.model = new App.Models.Report();
    this.showView = new App.Views.Show({ model: this.model });
  },

  index: function () {
    new App.Views.Index({ model: this.model }).render();
  },

  show: function (screen_name) {
    this.model.set({ screen_name: screen_name });
    this.model.resetFilter();
    this.showView.render();
  },

  filter: function (screen_name, word) {
    this.model.set({ screen_name: screen_name });
    this.model.filterByWord(decodeURIComponent(word));
    this.showView.render();
  }

});
