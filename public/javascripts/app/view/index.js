App.Views.Index = Backbone.View.extend({

  events: {
    'click button': 'update'
  },

  update: function (event) {
    event.preventDefault();
    window.location.hash = this.$('[name=screen_name]').val();
  },

  render: function() {
    $(this.el).html(JST.report_form({ model: this.model }));
    $('#app').empty().append(this.el);
    $(this.el).find('input').first().focus();
    return this;
  }

});
