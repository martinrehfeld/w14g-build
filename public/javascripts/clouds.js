(function( $ ){

  var self;
  var timer;

  var settings = {
        'interval' : 30000,
        'cloudClasses' : ['','two','three']
      };


  var methods = {

    //
    // Initialize plugin
    //
    init : function( options ) {

      self = $(this);

      if ( options ) {
        $.extend( settings, options );
      }

      methods.update();
      timer = setInterval( function(){methods.update();},settings.interval);

    },

    //
    // Update function
    // called in Intervals specified in init method
    //
    update : function() {

      var animation_duration = Math.floor(Math.random()*80) + 80;
      var top = Math.floor(Math.random()*25);
      var opacity = ((Math.random()*40) + 60) / 100;

      var cloud = $("<div />").addClass("cloud").css({'-webkit-animation-duration':animation_duration+'s',
                                                      '-moz-animation-duration':animation_duration+'s',
                                                      'top':top+'%',
                                                      'opacity':opacity});

      cloud.addClass(settings.cloudClasses[ Math.floor( Math.random() * settings.cloudClasses.length) ]);

      self.append(cloud);
      setTimeout(function(){ cloud.remove(); }, animation_duration*1000);
    }
  };


  $.fn.clouds = function( method ) {

    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.clouds' );
    }

  };

})( jQuery );

