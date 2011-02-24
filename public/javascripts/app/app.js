var App = {
  Views: {},
  Controllers: {},
  Collections: {},

  // Helper function to escape a string for HTML rendering.
  // taken from backbone.js where it sadly is only available
  // for Backbone.Model attributes
  escapeHTML: function (string) {
    return string.replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};
