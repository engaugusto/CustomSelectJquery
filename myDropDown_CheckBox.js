String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var blueDDLClass = (function(){

	blueDDLClass.generateDropdown = function(nome){
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

	blueDDLClass.generatedList = function(nome, list){
		var listTxt = '';
		$(list).each(function(i,o){
			listTxt = listTxt + '<div class="myDropDownItem" id="{0}" >{1}</div>'.format(nome,$(o).text());
		});
		return listTxt;
	}

	blueDDLClass.bindEventsDDL = function(){
	    return '<div id=\"scriptBlueDDL\"><script type=\"text/javascript\"> \
            $(function(){  \
               $(\'.myDropDown\').each(function(i,o){  \
               $(\'.myDropDownBox\',o).unbind(\'click\').click(blueDDLClass.myDropDownControler);  \
               $(\'.myDropDownItem\', o).click(blueDDLClass.myDropDownItemControler);  \
             });  \
           })  \
           </script></div>'; 
	};

	blueDDLClass.myDropDownControler = function() {
		$('.myDropDownItemContainer', $(this).closest('.myDropDown')).slideToggle("fast");
		event.stopPropagation()
	};
	blueDDLClass.myDropDownItemControler = function() {
	    $('.myDropDownBoxName', $(this).closest('.myDropDown')).text($(this).text());
		$('.myDropDownItemContainer', $(this).closest('.myDropDown')).slideToggle("fast");
		event.stopPropagation();

	    return false;
	};

	function blueDDLClass(clickDelegate, obj){
		var nome = $(obj).attr('id');
    	var textGenerated = blueDDLClass.generateDropdown(nome);
   	    var listItem = $('.listItem', obj);
   	    var appendText = '';

   	    //ocultando itens da lista
   	    $('.listItem', obj).hide();

		if(listItem.length <= 0)
			appendText = textGenerated.format('');
		else
			appendText = textGenerated.format(blueDDLClass.generatedList(nome,listItem));

        $(obj).append(
        	appendText
		);

		if(typeof(clickDelegate) != 'undefined')
			$('.myDropDownItem', obj).on('click',clickDelegate);
	}

	return blueDDLClass;

})();

$('html').click(function() {
  $('.myDropDownItemContainer').slideUp("fast");
 });

$.extend($.fn, {
    blueDDL: function(itemSelectedClick){
    	new blueDDLClass(itemSelectedClick, this);

		if($('#scriptBlueDDL').length == 0)
			$('body').append(blueDDLClass.bindEventsDDL);
    }
});
