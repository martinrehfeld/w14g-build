App.Views.Tweets = Backbone.View.extend({

  className: "tweets",

  initialize: function () {
    this.filter = new App.Views.TweetsFilter({ parent: this.options.parent, collection: this.collection }).render();
    _.bindAll(this, 'render', 'tweetAdded');
    this.collection.bind('add', this.tweetAdded);
  },

  render: function () {
    $(this.el).empty().append(this.filter.el, JST.tweets_collection({ model: this.options.parent, collection: this.collection }));
    return this;
  },

  tweetAdded: function (newTweet) {
    $(new App.Views.Tweet({ model: newTweet, id: newTweet.get('id_str') }).render().el).appendTo('.tweets-collection');
  }

});
