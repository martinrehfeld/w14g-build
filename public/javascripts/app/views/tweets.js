App.Views.Tweets = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render');
    this.options.parent.bind('change', this.render);
    this.collection.bind('filterchange', this.render);
    $('#app .tweets').append(this.el);
  },

  render: function () {
    $(this.el).html(JST.tweets_collection({ collection: this.collection }));
    return this;
  }
});
