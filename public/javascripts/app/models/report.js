App.Models.Report = Backbone.Model.extend({
  initialize: function () {
    var tweets = new App.Collections.Tweets;
    this.set({
      tweets: tweets,
      wordCloud: new App.Models.Cloud({
        collection: tweets
      })
    });
    _.bindAll(this, 'newScreenName');
    this.bind('change:screen_name', this.newScreenName);
  },

  newScreenName: function () {
    var screenName = this.get('screen_name');
    var tweets = this.get('tweets');
    var wordCloud = this.get('wordCloud');

    tweets.clear();
    wordCloud.clear();
    this.trigger('change');
    tweets.fetch(this);
  },

  filterByWord: function (word) {
    this.get('tweets').filterByWord(word);
  },

  resetFilter: function () {
    this.get('tweets').resetFilter();
  }
});
