App.Models.Tweet = Backbone.Model.extend({
  analysedWords: function () {
    var cache = App.Models.Tweet.cache;
    var id = this.get('id');

    // just do some simple processing for now,
    // an actual stemmer should be used instead!
    if (!cache[id]) {
      cache[id] = _.map(this.get('text').replace(/[!"()+*?&.,;:]/g, ' ').split(/\s+/), function (word) {
        return word.toLocaleLowerCase();
      });
    }
    return cache[id];
  }
},{
  // class properties
  cache: {}
});
