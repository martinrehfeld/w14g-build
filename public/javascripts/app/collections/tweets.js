App.Collections.Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: '/tweets' // not used for collection fetch!
});

App.Collections.Tweets.prototype.comparator = function (tweet) {
  return -(tweet.get('id'));
};
