App.Models.Cloud = Backbone.Model.extend({
  initialize: function() {
    this.set({
      frequencyMap: {}
    });
    _.bindAll(this, 'tweetAdded');
    this.get('collection').bind('add', this.tweetAdded);
  },

  tweetAdded: function (newTweet) {
    var frequencyMap = this.get('frequencyMap');

    _.each(newTweet.analysedWords(), function (word) {
      if (word !== '') {
        if (frequencyMap[word]) {
          frequencyMap[word] += 1;
        } else {
          frequencyMap[word] = 1;
        }
      }
    });
  },

  topEntries: function (count) {
    var frequencyMap = this.get('frequencyMap');
    var lowestAcceptableFrequency = _.last(_.first(_.sortBy(_.values(frequencyMap), function (frequency) { return -frequency; }), count));
    var result = {};

    _.each(frequencyMap, function(frequency, entry) {
      if (count > 0 && frequency >= lowestAcceptableFrequency) {
        result[entry] = frequency;
        count -= 1;
      }
    });

    return result;
  }
});
