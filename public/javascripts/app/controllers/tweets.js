App.Controllers.Tweets = Backbone.Controller.extend({
  routes: {
    "": "index"
  },

  index: function () {
    var tweets = new App.Collections.Tweets();
    tweets.fetch({
      success: function () {
        new App.Views.Index({ collection: tweets });
      },
      error: function () {
        new Error({ message: "Error loading tweets." });
      }
    });
  }
});
