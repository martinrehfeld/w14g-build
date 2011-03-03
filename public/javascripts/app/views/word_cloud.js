App.Views.WordCloud = Backbone.View.extend({

  className: "word-cloud",

  initialize: function () {
    _.bindAll(this, 'render');
    this.options.parent.bind('change', this.render);
  },

  render: function () {
    $(this.el)
      .html(JST.tweets_wordcloud({ collection: this.model.topEntries(75) }))
      .children('a').tagcloud();

    return this;
  }

});
