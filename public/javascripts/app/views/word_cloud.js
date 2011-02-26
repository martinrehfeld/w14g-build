App.Views.WordCloud = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render');
    this.options.parent.bind('change', this.render);
    $('#app .word-cloud').append(this.el);
  },

  render: function () {
    $(this.el)
      .html(JST.tweets_wordcloud({ collection: this.model.topEntries(75) }))
      .children('a').tagcloud();

    return this;
  }
});
