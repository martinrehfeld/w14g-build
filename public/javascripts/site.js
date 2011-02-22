({
  compileTemplates: function (global, ready) {
    global.JST = {};
    $.get('/javascripts/app/views/tweets/tweets_collection.jst', function (data) {
      global.JST.tweets_collection = _.template(data);
      ready();
    });
  },

  init: function (global) {
    var self = this;

    // HTML5 fix for older browsers
    'article aside footer header nav section time'.replace(/\w+/g, function (n) {
      document.createElement(n);
    });

    // init App when DOM ready and templates have been compiled
    $(function() {
      self.compileTemplates(global, App.init);
    });
  }
}).init(this);
