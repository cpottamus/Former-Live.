jQuery.fn.extend({
  id: function(){
    if ($(this).attr('id')) 
      return $(this).attr('id').substr(3);
    else 
      return null;
  },
  ids: function(){
    var ids = [];
    $(this).each(function(){
      if ($(this).id() != '' && $(this).id() != null) 
        ids.push($(this).id());
    });
    return ids;
  },
});

jQuery.extend(jQuery, {
  getJSON: function(path, opts){
    this.extend(opts, {
      url: path,
      dataType: 'json',
      type: 'GET'
    });
    
    var invalid = opts.error;
    opts.error = function(xhr, status){
      var data = $.httpData(xhr, 'json');
      if (invalid) 
        invalid(data);
    }
    
    this.ajax(opts);
  },
  
  postJSON: function(path, data, opts){
    this.extend(opts, {
      url: path,
      data: data,
      dataType: 'json',
      type: 'POST'
    });
    
    var invalid = opts.error;
    opts.error = function(xhr, status){
      var data = $.httpData(xhr, 'json');
      if (invalid) 
        invalid(data);
    }
    
    this.ajax(opts);
  }
});

// Global AJAXiness
$(document).ajaxError(function(ev, xhr, opts){
  var data = $.httpData(xhr, opts.dataType);
  if (data.errors) 
    UI.errors(data.errors)
  else 
    if (data.error) 
      UI.error(data.error)
});
$(document).ajaxSuccess(function(ev, xhr, opts){
  var data = $.httpData(xhr, opts.dataType);
  if (data.notice) 
    UI.notice(data.notice)
});