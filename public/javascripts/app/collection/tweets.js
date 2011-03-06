App.Collections.Tweets = Backbone.Collection.extend({

  model: App.Models.Tweet,

  initialize: function () {
    this.clear({silent: true});
    _.bindAll(this, 'tweetAdded');
    this.bind('add', this.tweetAdded);
  },

  clear: function (options) {
    this.wordMap = {};
    this.resetFilter(options);
    this.refresh([], options);
  },

  fetch: function (report) {
    var collection = this;
    var page = 1;
    var baseUrl = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' +
                  encodeURIComponent(report.get('screen_name')) +
                  '&include_rts=1&include_entities=1&trim_user=1&callback=?&count=200&page=';
    var fetchNext = function () {
      $.getJSON(baseUrl + page, function (data) {
        if (data.length > 0) {
          collection.add(data);
          report.trigger('change');
          if (page < 16) { // count*page: max 3,200
            page += 1;
            setTimeout(fetchNext, 0);
          }
        }
      });
    };
    setTimeout(fetchNext, 0);
  },

  tweetAdded: function (newTweet) {
    var wordMap = this.wordMap;
    var currentFilter = this.currentFilter;
    var matches_current_filter = false;

    if (!this.isFiltered()) {
      matches_current_filter = true;
    }

    _.each(_.uniq(newTweet.analysedWords()), function (word) {
      if (word !== '') {
        if (wordMap[word]) {
          wordMap[word].push(newTweet);
        } else {
          wordMap[word] = [newTweet];
        }

        if (!matches_current_filter && word === currentFilter) {
          matches_current_filter = true;
        }
      }
    });

    newTweet.set({ visible: matches_current_filter });
  },

  isFiltered: function() {
    return this.currentFilter !== null;
  },

  resetFilter: function (options) {
    options = options || {};

    this.currentFilter = null;
    this.each(function (tweet) {
      tweet.set({ visible: true });
    });

    if (!options.silent) {
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

    this.each(function (tweet) {
      tweet.set({ visible: false });
    });

    _.each(this.visibleModels, function (tweet) {
      tweet.set({ visible: true });
    });

    this.trigger('filterchange');
  },

  visible: function () {
    return this.isFiltered() ? this.visibleModels : this.models;
  }

});

App.Collections.Tweets.prototype.comparator = function (tweet) {
  return -(tweet.get('id'));
};
