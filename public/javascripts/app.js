var App = {
  Views: {},
  Controllers: {},
  Collections: {},
  init: function() {
    new App.Controllers.Tweets();
    Backbone.history.start();
  }
};
