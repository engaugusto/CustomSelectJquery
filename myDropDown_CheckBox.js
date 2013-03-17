/*
* blueDDL
*
* Autor : Carlos Augusto e Thiago Colen
* Data : 16/03/2013
* Descrição: Customização do elemento Select, com opção para select com checkbox.
* Requisitos: Jquery, Jquery-UI
*
* Exemplo:
*   A partir de uma div com uma lista de itens a ser exibido, é necessário gerar com a classe listItem
*   <div id='divId'>
*     <div class='listItem'>Item1</div>
*     <div class='listItem'>Item2</div>
*     <div class='listItem'>Item3</div>
*   </div>
*
*   Executar no document ready
*   $('#divId').blueDDL();
*   
*   Com 2 possíveis paraemtros, o click da função e a opção de tornar checkbox
*   Exemplo 2 com callBack:
*   function hello(){
*	  alert('Hello');
*	}
*   Executar no document ready
*   $('#divId').blueDDL(hello);
*
*	Exemplo 3 com callBack e checkbox:
*   function hello(){
*	  alert('Hello');
*	}
*   Executar no document ready
*   $('#divId').blueDDL(hello, true);

*
* 
*/
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
			checkBox ='<div class="myDropDownCheckbox myDropDownUnchecked" />'
		$(list).each(function(i,o){
				listTxt = listTxt + '<div class="myDropDownItem" id="{0}" >{1} {2}</div>'.format(nome,checkBox,$(o).text());
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

		//inverte o estado
		if(blueDDLClass.checkBox){
			if($('.myDropDownCheckbox',this).hasClass('myDropDownChecked')){
				$('.myDropDownCheckbox',this).removeClass('myDropDownChecked');
				$('.myDropDownCheckbox',this).addClass('myDropDownUnchecked');
			}else{
				$('.myDropDownCheckbox',this).removeClass('myDropDownUnchecked');
				$('.myDropDownCheckbox',this).addClass('myDropDownChecked');
			}
		}else{
			//se não for checkbox já fecha após a seleção
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
    }
});
