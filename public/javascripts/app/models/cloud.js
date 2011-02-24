App.Models.Cloud = Backbone.Model.extend({
  initialize: function() {
    this.set({
      frequencyMap: {}
    });
  },

  addWords: function () {
    var frequencyMap = this.get('frequencyMap');
    _.each(arguments, function (word) {
      if (word !== '') {
        word = word.toLocaleLowerCase();
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
    var lowestAcceptableFrequency = _.last(_.first(_.values(frequencyMap).sort().reverse(), count));
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
