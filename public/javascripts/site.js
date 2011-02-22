({
  init: function (global) {
    var self = this;

    // HTML5 fix for older browsers
    'article aside footer header nav section time'.replace(/\w+/g, function (n) {
      document.createElement(n);
    });

    // init App when DOM ready
    $(function() {
      new App.Controllers.Tweets();
      Backbone.history.start();
    });
  }
}).init(this);
