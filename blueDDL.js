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

	blueDDLClass.prototype.generateDropdown = function(nome){

	return '<div id="' + nome + '" class="myDropDown">'
	+ ''
	+ '     <div class="myDropDownBox" >'
	+ '         <div class="myDropDownBoxName" style="{1}">Selecionar</div>'
	+ '         <div class="myDropDownBoxIco"></div>'
	+ '         <div style="clear:both;"></div>'
	+ '     </div>'
	+ '	'
	+ '     <div style="clear:both;"></div>'
	+ '	'
	+ '     <div class="myDropDownItemContainer" style="display:none;{2}">'
	+ '         {0}  '
	+ '     </div>'
	+ '	'
	+ '</div>';
	}

	blueDDLClass.jsonToStrData = function(data){
		var dataStr = JSON.stringify(data);

		dataStr = dataStr.replace(/\"/g,'\'');

		return dataStr;
	}

	blueDDLClass.montaData = function(checkBox, disabled){
		var disabledField = false;

		if(typeof(disabled) != 'undefined')
			disabledField = disabled;

		var data ={
			"type": "blueDDL",
			"isCheckBox": checkBox,
			"disabled": disabledField,
		};

		var dataStr = blueDDLClass.jsonToStrData(data);

		return dataStr;
	}

	blueDDLClass.getData = function(data){
		var dataStr = data.replace(/\'/g,"\"");
	    return $.parseJSON(dataStr);
	}

	blueDDLClass.setData = function(obj, data){
		$(obj).attr('data',blueDDLClass.jsonToStrData(data));
	}

	blueDDLClass.desabilitarCombo = function(obj){
		if(!$('.myDropDownBoxName',obj).hasClass('myDropDownDisabled')){
			$('.myDropDownBoxName',obj).addClass('myDropDownDisabled');
		}
		$('.myDropDownItemContainer', obj).slideUp("fast");

		var data = blueDDLClass.getData($('.myDropDown',obj).attr('data'));
		data.disabled = true;

		blueDDLClass.setData($('.myDropDown',obj), data);
	}

	blueDDLClass.habilitarCombo = function(obj){
		if($('.myDropDownBoxName',obj).hasClass('myDropDownDisabled')){
			$('.myDropDownBoxName',obj).removeClass('myDropDownDisabled');
		}

		var data = blueDDLClass.getData($('.myDropDown',obj).attr('data'));
		data.disabled = false;

		blueDDLClass.setData($('.myDropDown',obj), data);
	}

	blueDDLClass.prototype.generatedList = function(list){
		var listTxt = '';
		var checkBox='';
		if(blueDDLClass.checkBox)
			checkBox ='<div class="myDropDownCheckbox myDropDownUnchecked" > </div>'

		$(list).each(function(i,o){
				listTxt = listTxt + '<div class="myDropDownItem" id="{0}" >{1} {2}</div>'.format($(o).attr('id'),$(o).text(),checkBox);
			});
		return listTxt;
	}

	blueDDLClass.bindEventsDDL = function(objHtml){
	    $('.myDropDown',objHtml).each(function(i,o){  
           	$('.myDropDownBox',o).unbind('click').click(blueDDLClass.myDropDownControler);  
           	$('.myDropDownItem', o).unbind('click').click(blueDDLClass.myDropDownItemControler);  
        });
	};

	blueDDLClass.myDropDownControler = function() {
		//Verifica se esta desabilitado
		if($('.myDropDownBoxName',this).hasClass('myDropDownDisabled'))
			return;

		$('.myDropDownItemContainer', $(this).closest('.myDropDown')).slideToggle("fast");

		//ie fix
		if(typeof(event) != 'undefined'){
			event.cancelBubble=true;
			if(event.stopPropagation) event.stopPropagation();
		}
	};

	blueDDLClass.mudaEstadoCheckBox = function(obj){
	   if($('.myDropDownCheckbox',obj).hasClass('myDropDownChecked')){
			$('.myDropDownCheckbox',obj).removeClass('myDropDownChecked');
			$('.myDropDownCheckbox',obj).addClass('myDropDownUnchecked');
		}else{
			$('.myDropDownCheckbox',obj).removeClass('myDropDownUnchecked');
			$('.myDropDownCheckbox',obj).addClass('myDropDownChecked');
		}
	}

	blueDDLClass.myDropDownItemControler = function(obj) {
		
		if(obj instanceof jQuery.Event){
			obj = this;
		}

	    $('.myDropDownBoxName', $(obj).closest('.myDropDown')).text($(obj).text());

		//é checkbox ?
		var isCheckBox = blueDDLClass.getData($(obj).closest('.myDropDown').attr('data')).isCheckBox;

		//inverte o estado
		if(isCheckBox){
			blueDDLClass.mudaEstadoCheckBox(obj);
		}else{
			//se não for checkbox já fecha após a seleção
			$('.selected','.myDropDownItemContainer' ,$(obj).closest('.myDropDown')).removeClass('selected')
			$(obj).addClass('selected');
			$('.myDropDownItemContainer', $(obj).closest('.myDropDown')).slideToggle("fast");
		}

		//ie fix
		if(typeof(event) != 'undefined'){
			event.cancelBubble=true;
			if(event.stopPropagation) event.stopPropagation();
		}
	    return false;
	};

	blueDDLClass.adicionarNovoItem = function(obj, id, valor){
		var isCheckBox = blueDDLClass.getData($('.myDropDown',obj).attr('data')).isCheckBox;

		var itemLista = $('.myDropDownItemContainer', obj);
		var novoItem = '';

		if(!isCheckBox){
			novoItem = '<div class="myDropDownItem" onclick="blueDDLClass.myDropDownItemControler(this)" id="{0}" >{1}</div>'.format(id,valor);
		}else{
			var checkBox ='<div class="myDropDownCheckbox myDropDownUnchecked" > </div>'
			novoItem = '<div class="myDropDownItem" onclick="blueDDLClass.myDropDownItemControler(this)" id="{0}" >{1} {2}</div>'.format(id,valor, checkBox);
		}

		$(itemLista).append(novoItem);
	}

	blueDDLClass.selecionado = function(obj){
		var isCheckBox = blueDDLClass.getData($('.myDropDown',obj).attr('data')).isCheckBox;

		if ($('.selected',obj).length == 0 && !isCheckBox)
			return null;

		if(!isCheckBox){
			return $('.selected', obj).attr('id');
		}else{
			var arrayOfId = [];
			$('.myDropDownChecked', obj).closest('.myDropDownItem').each(function(){
				 arrayOfId.push($(this).attr('id'));
				});
			return arrayOfId;
		}
	}

	blueDDLClass.setSelecionado = function(obj, id) {
		var isCheckBox = blueDDLClass.getData($('.myDropDown',obj).attr('data')).isCheckBox;

		if(!(id instanceof Array)){
			//limpar os selecionados
			$('.selected',obj).removeClass('selected')
			//selecionado o id selecionado
			var elementToBeSelected = $('div[id="{0}"]'.format(id), $('.myDropDownItemContainer',obj));
			elementToBeSelected.addClass('selected')
			
			$('.myDropDownBoxName', $(elementToBeSelected).closest('.myDropDown')).text($(elementToBeSelected).text())
			if(isCheckBox){
				blueDDLClass.mudaEstadoCheckBox(elementToBeSelected);
			}
		}else {
			//limpar os selecionados
			var arrayOfId = id;
			$(arrayOfId).each(function(){
				 var elementToBeSelected = $('div[id="{0}"]'.format(this), $('.myDropDownItemContainer',obj));
				 elementToBeSelected.addClass('selected')
				 blueDDLClass.mudaEstadoCheckBox(elementToBeSelected);
		     });
		}
	}

	blueDDLClass.bindClickEvent = function(obj, clickDelegate) {
		if(typeof(clickDelegate) != 'undefined')
			$('.myDropDownItem', obj).bind('click',clickDelegate);
	}

	function blueDDLClass(clickDelegate, obj, checkBox, altura){
		if($('.myDropDown',obj).length != 0){
			return;
		}

		var nome = $(obj).attr('id');
		var comprimento = $(obj).width();
    	var textGenerated = this.generateDropdown(nome);
   	    var listItem = $('.listItem', obj);
   	    var appendText = '';

		//calculando o comprimento
   	    var comprimentoCaixa = comprimento - 17 - 3; //17 é o tamanho do icone e 3 o padding-left
   	    comprimentoCaixa = 'width:'+comprimentoCaixa+'px';
		comprimento = 'width:'+comprimento+'px;height:'+altura+'px;';

   	    blueDDLClass.checkBox = checkBox;

   	    //ocultando itens da lista
   	    $('.listItem', obj).hide();

		if(listItem.length <= 0)
			appendText = textGenerated.format('', comprimentoCaixa,comprimento);
		else
			appendText = textGenerated.format(this.generatedList(listItem), comprimentoCaixa,comprimento);

        $(obj).append(
        	appendText
		);

        //setando o data que diz os comportamentos deste componente
        $('.myDropDown', obj).attr('data', blueDDLClass.montaData(checkBox));
	}

	return blueDDLClass;

})();

$('html').click(function() {
  $('.myDropDownItemContainer').slideUp("fast");
 });

$.extend($.fn, {
    blueDDL: function(itemSelectedClick, checkBox, altura){
   		//Verifica se ja esta vinculado e 

    	if(typeof(checkBox) != "undefined")
    		new blueDDLClass(itemSelectedClick, this, checkBox, altura);
    	else
    		new blueDDLClass(itemSelectedClick, this, false, altura);

    	var objHtml = $(this)

		blueDDLClass.bindEventsDDL(objHtml);

		//vinculando depois o evento click
		blueDDLClass.bindClickEvent(this, itemSelectedClick);
	},
	blueDDL_SetSelected: function(id){
    	blueDDLClass.setSelecionado(this,id);
    },   
    blueDDL_Selected: function(){
    	return blueDDLClass.selecionado(this);
    },
    blueDDL_OnClick: function(clickEvent){
    	blueDDLClass.bindClickEvent(this, clickEvent);
    },
    blueDDL_Disable: function(disableArg){
    	var disable = true;
    	if(typeof(disableArg) != 'undefined')
    		disable = disableArg;
    	if(disable){
    		blueDDLClass.desabilitarCombo(this);
    	}else{
			blueDDLClass.habilitarCombo(this);
    	}
    },
    blueDDL_NewItem: function(id, valor){
    	return blueDDLClass.adicionarNovoItem(this,id,valor);
    },
});
