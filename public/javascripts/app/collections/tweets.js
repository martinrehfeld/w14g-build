App.Collections.Tweets = Backbone.Collection.extend({
  model: App.Models.Tweet,
  url: '/tweets', // not used for collection fetch!

  initialize: function () {
    this.wordMap = {};
    this.resetFilter(true);
    _.bindAll(this, 'tweetAdded');
    this.bind('add', this.tweetAdded);
  },

  fetch: function (report) {
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
  },

  tweetAdded: function (newTweet) {
    var wordMap = this.wordMap;
    _.each(_.uniq(newTweet.analysedWords()), function (word) {
      if (word !== '') {
        if (wordMap[word]) {
          wordMap[word].push(newTweet);
        } else {
          wordMap[word] = [newTweet];
        }
      }
    });
  },

  isFiltered: function() {
    return this.currentFilter !== null;
  },

  resetFilter: function (silent) {
    this.currentFilter = null;
    if (!silent) {
      this.trigger('filterchange');
    }
  },

  filterByWord: function (word) {
    var wordMap = this.wordMap;
    if (!wordMap[word]) {
      wordMap[word] = [];
    }
    this.visibleModels = wordMap[word];
    this.currentFilter = word;
    this.trigger('filterchange');
  },

  visible: function () {
    return this.isFiltered() ? this.visibleModels : this.models;
  }
});

App.Collections.Tweets.prototype.comparator = function (tweet) {
  return -(tweet.get('id'));
};
