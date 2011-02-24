App.Views.Tweets = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render');
    this.options.parent.bind('change', this.render);
  },

  render: function () {
    $(this.el).html(JST.tweets_collection({ collection: this.collection }));
    $('#app .tweets').html(this.el);
    return this;
  }
});
