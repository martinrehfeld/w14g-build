App.Views.Tweets = Backbone.View.extend({

  className: "tweets",

  initialize: function () {
    _.bindAll(this, 'render');
    this.options.parent.bind('change', this.render);
    this.collection.bind('filterchange', this.render);
  },

  render: function () {
    $(this.el).html(JST.tweets_collection({ collection: this.collection }));
    return this;
  }

});
