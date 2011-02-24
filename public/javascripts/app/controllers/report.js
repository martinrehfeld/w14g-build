App.Controllers.Report = Backbone.Controller.extend({
  routes: {
    "": "index"
  },

  index: function () {
    var report = new App.Models.Report();
    var tweets = report.get('tweets');
    var index = 1;
    var fetchNext = function () {
      $.getJSON('/tweets/' + index, function (data) {
        tweets.add(data);
        report.trigger('change');
        if (index < 16) { // max 16 !
          index += 1;
          setTimeout(fetchNext, 0);
        }
      });
    };
    setTimeout(fetchNext, 0);

    new App.Views.Index({ model: report });
  }
});
