App.Views.Index = Backbone.View.extend({
  events: {
    'click button': 'update'
  },

  initialize: function () {
    var tweets = this.model.get('tweets');
    var wordCloud = this.model.get('wordCloud');

    this.tweetsView = new App.Views.Tweets({ parent: this.model, collection: tweets });
    this.wordCloudView = new App.Views.WordCloud({ parent: this.model, model: wordCloud });
    this.render();
  },

  update: function (event) {
    event.preventDefault();
    this.model.set({screen_name: this.$('[name=screen_name]').val()});
  },

  render: function() {
    $(this.el).html(JST.report_form({model: this.model}));
    $('#app').append(this.el);
    $('#app').append(this.wordCloudView.el);
    $('#app').append(this.tweetsView.el);
    return this;
  }
});
