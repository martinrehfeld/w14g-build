App.Collections.Tweets = Backbone.Collection.extend({
  model: App.Models.Tweet,
  url: '/tweets', // not used for collection fetch!

  fetchTweets: function (report) {
    var collection = this;
    var index = 1;
    var fetchNext = function () {
      $.getJSON('/tweets/' + index, function (data) {
        collection.add(data);
        report.trigger('change');
        if (index < 16) { // max 16 !
          index += 1;
          setTimeout(fetchNext, 0);
        }
      });
    };
    setTimeout(fetchNext, 0);
  }
});

App.Collections.Tweets.prototype.comparator = function (tweet) {
  return -(tweet.get('id'));
};
