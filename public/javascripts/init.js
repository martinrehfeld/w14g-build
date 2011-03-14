({
  init: function (global) {
    // HTML5 fix for older browsers
    'article aside footer header nav section time'.replace(/\w+/g, function (n) {
      global.document.createElement(n);
    });

    $.fn.tagcloud.defaults = {
      size: {start: 13, end: 28, unit: "px"},
      color: {start: '#aaaaaa', end: '#0388a6'}
    };

    // init App when DOM ready
    $(function() {
      new App.Controllers.Report({
        resource: new App.Models.Report()
      });
      Backbone.history.start();
    });
  }
}).init(this);
