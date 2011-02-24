App.Models.Report = Backbone.Model.extend({
  initialize: function () {
    _.bindAll(this, 'updateWordCloud');
    this.set({
      tweets: new App.Collections.Tweets,
      wordCloud: new App.Models.Cloud
    });
    this.get('tweets').bind('add', this.updateWordCloud);
  },

  loadTweets: function () {
    var report = this;
    var tweets = this.get('tweets');
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
  },

  updateWordCloud: function (tweet) {
    var wordCloud = this.get('wordCloud');
    wordCloud.addWords.apply(wordCloud, tweet.analysedWords());
  },

  filterByWord: function (word) {
    // TODO: implementation
    alert('The tweet list shall only show tweets with "' + word + '" in it.');
  }
});
