App.Models.Tweet = Backbone.Model.extend({
  analysedWords: function () {
    // just do some simple processing for now,
    // an actual stemmer should be used instead!
    return _.map(this.get('text').replace(/[!"()+*?&.,;:]/g, ' ').split(/\s+/), function (word) {
      return word.toLocaleLowerCase();
    });
  }
});
