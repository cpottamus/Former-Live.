/*
 * User Interface related methods and classes
 */
$.fn.delay = function(duration){
  $(this).animate({dummy: 1}, duration);
  return this;
};

$(document).ready(function(){
  if ($('.messages .error').size()) 
    UI.hide_msg('.messages .error')
  if ($('.messages .notice').size()) 
    UI.hide_msg('.messages .notice')
});

var UI = function(){
  var add_to_msgs = function(klass, msg, no_hide){
    msg = '<h1 class="' + klass + '">' + msg + '</h1>';
    $('.messages').prepend(msg);
		if (!no_hide)
    	hide_msg('.' + klass);
  };
  
  var hide_msg = function(elem, delay){
		var d = delay ? delay : 4000; 
    $(elem).delay(d).fadeOut(750, function(){
      $(this).remove();
    });
  }
  
  return {
    error: function(msg){
      add_to_msgs('error', msg);
    },
    errors: function(msgs){
      for (var i = 0; i < msgs.length; i++) 
        this.error((msgs[i][0] == 'base' ? '' : msgs[i][0]) + ' ' + msgs[i][1]);
    },
    notice: function(msg, no_hide){
      add_to_msgs('notice', msg, no_hide ? true : false);
    },
    hide_msg: function(elem, delay){
      hide_msg(elem, delay);
    }
  };
}();