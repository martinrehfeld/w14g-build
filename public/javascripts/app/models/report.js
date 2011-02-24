App.Models.Report = Backbone.Model.extend({
  initialize: function () {
    var tweets = new App.Collections.Tweets;
    _.bindAll(this, 'updateWordCloud');
    this.set({
      tweets: tweets,
      wordCloud: new App.Models.Cloud
    });
    tweets.bind('add', this.updateWordCloud);
    tweets.fetchTweets(this);
  },

  updateWordCloud: function (newTweet) {
    var wordCloud = this.get('wordCloud');
    wordCloud.addWords.apply(wordCloud, newTweet.analysedWords());
  },

  filterByWord: function (word) {
    // TODO: implementation
    alert('The tweet list shall only show tweets with "' + word + '" in it.');
    this.trigger('change');
  }
});
