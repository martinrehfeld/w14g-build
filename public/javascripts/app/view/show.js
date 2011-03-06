App.Views.Show = Backbone.View.extend({

  initialize: function () {
    var tweets = this.model.get('tweets');
    var wordCloud = this.model.get('wordCloud');

    this.tweetsView = new App.Views.Tweets({ parent: this.model, collection: tweets }).render();
    this.wordCloudView = new App.Views.WordCloud({ parent: this.model, model: wordCloud });
  },

  render: function() {
    $('#app').empty().append(this.wordCloudView.el, this.tweetsView.el);
    return this;
  }

});
