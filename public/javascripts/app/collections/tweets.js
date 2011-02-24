App.Collections.Tweets = Backbone.Collection.extend({
  model: App.Models.Tweet,
  url: '/tweets' // not used for collection fetch!
});

App.Collections.Tweets.prototype.comparator = function (tweet) {
  return -(tweet.get('id'));
};
