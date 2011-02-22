App.Controllers.Tweets = Backbone.Controller.extend({
  routes: {
    "": "index"
  },

  index: function () {
    var tweets = new App.Collections.Tweets();
    var index = 1;
    var fetchNext = function (silent) {
      $.getJSON('/tweets/' + index, function (data) {
        tweets.add(data, {silent: silent});
        if (index < 16) { // max 16 !
          index += 1;
          setTimeout(fetchNext, 0, silent);
        }
      });
    };
    setTimeout(fetchNext, 0, false);

    new App.Views.Index({ collection: tweets });
  }
});
