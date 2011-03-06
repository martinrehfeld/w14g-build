App.Views.Tweet = Backbone.View.extend({

  tagName: 'li',
  className: 'tweet',

  initialize: function () {
    _.bindAll(this, 'render', 'updateVisibility');
    this.model.bind('change:visible', this.updateVisibility);
  },

  render: function () {
    $(this.el).html(JST.tweet({ model: this.model }));
    this.updateVisibility();
    return this;
  },

  updateVisibility: function () {
    this.model.get('visible') ? $(this.el).show() : $(this.el).hide();
  }

});
