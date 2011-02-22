App.Views.Index = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('add', this.render);
    this.collection.bind('refresh', this.render);
  },

  render: function() {
    $(this.el).html(JST.tweets_collection({ collection: this.collection }));
    $('#app').html(this.el);
  }
});
