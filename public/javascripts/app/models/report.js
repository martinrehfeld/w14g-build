App.Models.Report = Backbone.Model.extend({
  initialize: function () {
    var tweets = new App.Collections.Tweets;
    this.set({
      tweets: tweets,
      wordCloud: new App.Models.Cloud({
        collection: tweets
      })
    });
    tweets.fetchTweets(this);
  },

  filterByWord: function (word) {
    this.get('tweets').filterByWord(word);
  },

  resetFilter: function () {
    this.get('tweets').resetFilter();
  }
});
