App.Views.TweetsFilter = Backbone.View.extend({

  className: "tweets-filter",

  initialize: function () {
    _.bindAll(this, 'render');
    this.collection.bind('filterchange', this.render);
  },

  render: function () {
    $(this.el).html(JST.tweets_filter({ model: this.options.parent, collection: this.collection }));
    return this;
  }

});
