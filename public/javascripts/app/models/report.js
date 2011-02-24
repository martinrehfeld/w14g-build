App.Models.Report = Backbone.Model.extend({
  initialize: function () {
    _.bindAll(this, 'updateWordCloud');
    this.set({
      tweets: new App.Collections.Tweets,
      wordCloud: new App.Models.Cloud
    });
    this.get('tweets').bind('add', this.updateWordCloud);
  },

  updateWordCloud: function (tweet) {
    var wordCloud = this.get('wordCloud');
    var frequencyMap = wordCloud.get('frequencyMap');
    var text = tweet.get('text').replace(/[!"()+*?&.,;:]/g, ' ');
    _.each(text.split(' '), function (word) {
      if (!(/^\s*$/.test(word))) {
        word = word.toLocaleLowerCase();
        if (frequencyMap[word]) {
          frequencyMap[word] += 1;
        } else {
          frequencyMap[word] = 1;
        }
      }
    });
  }
});
