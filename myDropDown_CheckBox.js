String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

$('html').click(function() {
   //Hide the menus if visible
  $('.myDropDownItemContainer').slideUp("fast");
 });


generateDropdown = function(nome){
	return '<div id="' + nome + '" class="myDropDown">'
	+ ''
	+ '		<div class="myDropDownBox" >'
	+ '			<div class="myDropDownBoxName">myDropDown Selecionar</div>'
	+ '			<div class="myDropDownBoxIco"></div>'
	+ '			<div style="clear:both;"></div>'
	+ '		</div>'
	+ '	'
	+ '		<div style="clear:both;"></div>'
	+ '	'
	+ '		<div class="myDropDownItemContainer" style="display:none;">'
	+ '         {0}  '
	+ '		</div>'
	+ '	'
	+ '</div>'
}

generatedList = function(nome, list){
	var listTxt = '';
	$(list).each(function(i,o){
		listTxt = listTxt + '<div class="myDropDownItem" id="{0}" >{1}</div>'.format(nome,$(o).text());
	});
	return listTxt;
}

bindEventsDDL = function(){
	return '<div id=\"scriptBlueDDL\"><script type=\"text/javascript\"> \
        $(function(){  \
          $(\'.myDropDown\').each(function(i,o){  \
            $(\'.myDropDownBox\',o).unbind(\'click\').click(myDropDownControler);  \
            $(\'.myDropDownItem\').unbind(\'click\').click(myDropDownItemControler);  \
          });  \
       })  \
      </script></div>'; 
}

var blueDDL = (function(){
	var clickDelegateEvent;
	function blueDDL(clickDelegate){
		clickDelegateEvent = clickDelegate;
	)
	blueDDL.prototype.myDropDownControler = function() {
		$('.myDropDownItemContainer', $(this).closest('.myDropDown')).slideToggle("fast");
		event.stopPropagation()
	}
	blueDDL.prototype.myDropDownItemControler = function() {
	    $('.myDropDownBoxName', $(this).closest('.myDropDown')).text($(this).text());
		$('.myDropDownItemContainer', $(this).closest('.myDropDown')).slideToggle("fast");
		event.stopPropagation();

		clickDelegateEvent();
	    return false;
	}


	return blueDDL;
})();

$.extend($.fn, {
    blueDDL: function(itemSelectedClick){
    	var nome = $(this).attr('id');
    	var textGenerated = generateDropdown(nome);
   	    var listItem = $('.listItem', this);
   	    var appendText = '';

   	    if(typeof(itemSelectedClick) != undefined)
   	    	itemSelectedDelegate = itemSelectedClick;

   	    //ocultando itens da lista
   	    $('.listItem', this).hide();

		if(listItem.length <= 0)
			appendText = textGenerated.format('');
		else
			appendText = textGenerated.format(generatedList(nome,listItem));

        $(this).append(
        	appendText
		);

		if($('#scriptBlueDDL').length == 0)
			$('body').append(bindEventsDDL);
    }
});
