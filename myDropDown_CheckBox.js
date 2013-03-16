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
		var checkBox='';
		if(blueDDLClass.checkBox)
			checkBox ='<input type=\"checkbox\" />'
		$(list).each(function(i,o){
				listTxt = listTxt + '<div class="myDropDownItem" id="{0}" >{1} {2}</div>'.format(nome,checkBox,$(o).text());
			});
		return listTxt;
	}

	blueDDLClass.bindEventsDDLCheckBox = function(){
		if($('#scriptBlueDDL').html().indexOf('myDropDownItemCheckBoxControler') >= 0
			|| $('#scriptBlueDDLCheckBox').length > 0){
			return '';
		}
		return '<div id=\"scriptBlueDDLCheckBox\"><script type=\"text/javascript\"> \
            $(function(){  \
            	$(\'.myDropDown\').each(function(i,o){  \
                  $(\'input:checkbox\', o).mousedown(blueDDLClass.myDropDownItemCheckBoxControler); \
                });  \
           })  \
           </script></div>'; 
	}

	blueDDLClass.bindEventsDDL = function(){
	    var retEvent = '<div id=\"scriptBlueDDL\"><script type=\"text/javascript\"> \
            $(function(){  \
               $(\'.myDropDown\').each(function(i,o){  \
               $(\'.myDropDownBox\',o).unbind(\'click\').click(blueDDLClass.myDropDownControler);  \
               $(\'.myDropDownItem\', o).click(blueDDLClass.myDropDownItemControler);  \
               {0} \
             });  \
           })  \
           </script></div>'; 
           if(blueDDLClass.checkBox){
             retEvent = retEvent.format('$(\'input:checkbox\', o).click(blueDDLClass.myDropDownItemCheckBoxControler);');
           }else{
             retEvent = retEvent.format('');  
           }
           return retEvent;
	};

	blueDDLClass.myDropDownItemCheckBoxControler = function() {
		if($(this).is(':checked')){
			$(this).removeAttr('checked');
		}else{
			$(this).attr('checked','checked');
		}
		event.stopPropagation()
	}

	blueDDLClass.myDropDownControler = function() {
		$('.myDropDownItemContainer', $(this).closest('.myDropDown')).slideToggle("fast");
		event.stopPropagation()
	};
	blueDDLClass.myDropDownItemControler = function() {
	    $('.myDropDownBoxName', $(this).closest('.myDropDown')).text($(this).text());

		
		if(blueDDLClass.checkBox && event.toElement.type != 'checkbox'){
			if($('input:checkbox',this).is(':checked')){
				$('input:checkbox',this).removeAttr('checked');
			}else{
				$('input:checkbox',this).attr('checked','checked');
			}
		}else{
			$('.myDropDownItemContainer', $(this).closest('.myDropDown')).slideToggle("fast");
		}
		event.stopPropagation();

	    return false;
	};

	function blueDDLClass(clickDelegate, obj, checkBox){
		var nome = $(obj).attr('id');
    	var textGenerated = blueDDLClass.generateDropdown(nome);
   	    var listItem = $('.listItem', obj);
   	    var appendText = '';

   	    blueDDLClass.checkBox = checkBox;

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
    blueDDL: function(itemSelectedClick, checkBox){
    	if(typeof(checkBox) != "undefined")
    		new blueDDLClass(itemSelectedClick, this, checkBox);
    	else
    		new blueDDLClass(itemSelectedClick, this, false);

		if($('#scriptBlueDDL').length == 0)
			$('body').append(blueDDLClass.bindEventsDDL);
		//tratativa especial caso já tenha sido adicionado um script e
		//o primeiro não era checkbox
		//então precisa vincular o evento checkbox sozinho
		if(blueDDLClass.checkBox)
			$('body').append(blueDDLClass.bindEventsDDLCheckBox);
    }
});
