({
  init: function (global) {
    var self = this;

    // HTML5 fix for older browsers
    'article aside footer header nav section time'.replace(/\w+/g, function (n) {
      document.createElement(n);
    });

    $.fn.tagcloud.defaults = {
      size: {start: 13, end: 28, unit: "px"},
      color: {start: '#cde', end: '#f52'}
    };

    // init App when DOM ready
    $(function() {
      new App.Controllers.Report();
      Backbone.history.start();
    });
  }
}).init(this);
