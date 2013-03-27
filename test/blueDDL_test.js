
test( "generatedList CheckBox False test", function() {
  var blueDDL = new blueDDLClass(null,null,false,null);

  var vet = ["<div id='1'>texto</div>","<div id='2'>texto2</div>"]
  var result =blueDDL.generatedList(vet);
  
  var esperado = "<div class=\"myDropDownItem\" id=\"1\" >texto </div><div class=\"myDropDownItem\" id=\"2\" >texto2 </div>"

  ok( result == esperado, esperado );
});

test( "generatedList CheckBox True test", function() {
  var blueDDL = new blueDDLClass(null,null,true,null);

  var vet = ["<div id='1'>texto</div>","<div id='2'>texto2</div>"]
  var result =blueDDL.generatedList(vet);
  
  var esperado = "<div class=\"myDropDownItem\" id=\"1\" >texto <div class=\"myDropDownCheckbox myDropDownUnchecked\" > </div></div><div class=\"myDropDownItem\" id=\"2\" >texto2 <div class=\"myDropDownCheckbox myDropDownUnchecked\" > </div></div>"

  ok( result == esperado, esperado );
});

test( "montaData True test", function() {
 var resultado = blueDDLClass.montaData(true);
 
var esperado = "{'type':'blueDDL','isCheckBox':true,'disabled':false}";
ok(resultado == esperado, esperado);

});

test( "montaData false test", function() {
 var resultado = blueDDLClass.montaData(false);

var esperado = "{'type':'blueDDL','isCheckBox':false,'disabled':false}";
ok(resultado == esperado, esperado);

});

test( "getData false test", function() {
var jsonString = "{'type':'blue2DDL','isCheckBox':false}";
var resultado = blueDDLClass.getData(jsonString);

ok(resultado.isCheckBox == false, false);
ok(resultado.type == 'blue2DDL', 'O valor esperado era blueDDL' );

});

test( "getData true test", function() {
var jsonString = "{'type':'blue2DDL','isCheckBox':true}";
var resultado = blueDDLClass.getData(jsonString);

ok(resultado.isCheckBox == true, true);

});

test("mudaEstadoCheckBox true test", function(obj) {
  var obj = $('<div id="mudaEstadoCheckBoxTrue"><div class="myDropDownCheckbox myDropDownChecked"></div></div>');
  blueDDLClass.mudaEstadoCheckBox(obj); 
  ok($('.myDropDownCheckbox',obj).hasClass('myDropDownUnchecked'))

});

test("mudaEstadoCheckBox false test", function(obj) {
  var obj = $('<div id="mudaEstadoCheckBoxTrue"><div class="myDropDownCheckbox myDropDownUnchecked"></div></div>');
  blueDDLClass.mudaEstadoCheckBox(obj); 
  ok($('.myDropDownCheckbox',obj).hasClass('myDropDownChecked'))

});

test("selecionado true test", function(obj) {

var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':false}">'
  + '  <div id="Lista">'
  + '       <div id="1" class="myDropDownItem " >'
  + '         '
  + '       </div>'
  + '       <div id="2" class="myDropDownItem selected" >'
  + '        '
  + '       </div>'
  +'        '
  + '   </div>'
  + '</div>'
  + '</div>');  
blueDDLClass.selecionado(obj);


var resultado = blueDDLClass.selecionado(obj);
ok(resultado == 2)
});

test("selecionado false test", function(obj) {

var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':true}">'
  + '  <div id="Lista">'
  + '       <div id="1" class="myDropDownItem " >'
  + '         <div class="myDropDownChecked"></div>'
  + '       </div>'
  + '       <div id="2" class="myDropDownItem selected" >'
  + '         <div class="myDropDownChecked"></div>'
  + '       </div>'
  + '       <div id="3" class="myDropDownItem selected" >'
  + '         <div class="myDropDownUnchecked"></div>'
  + '       </div>'
  + '        '
  + '   </div>'
  + '</div>'
  + '</div>');  
//blueDDLClass.selecionado(obj);


var resultado = blueDDLClass.selecionado(obj);

ok(resultado[0]  == 1,1)
ok(resultado[1]  == 2,2)
ok(resultado.length  == 2,2)


});

test("setSelecionado true test", function(obj, id) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':false}">'
  + '  <div class="myDropDownItemContainer">'
  + '       <div id="1" class="myDropDownItem " >'
  + '        '
  + '       </div>'
  + '       <div id="2" class="myDropDownItem selected" >'
  + '        '
  + '       </div>'
  + '          '
  + '   </div>'
  + '</div>'
  + '</div>');  

blueDDLClass.setSelecionado(obj, 1);

ok($($('.myDropDownItem',obj)[0]).hasClass('selected'),true);
});

test("setSelecionado checkbox true test", function(obj, id) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':true}">'
  + '  <div class="myDropDownItemContainer">'
  + '       <div id="1" class="myDropDownItem " >'
  + '        <div class="myDropDownCheckbox myDropDownUnchecked"></div>'
  + '       </div>'
  + '       <div id="2" class="myDropDownItem " >'
  + '        <div class="myDropDownCheckbox myDropDownUnchecked"></div>'
  + '       </div>'
  + '          '
  + '   </div>'
  + '</div>'
  + '</div>');  

blueDDLClass.setSelecionado(obj, 1);

ok($($('.myDropDownCheckbox',obj)[0]).hasClass('myDropDownChecked'),true);


});

test("setSelecionado false test", function(obj, id) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':true}">'
  + '  <div class="myDropDownItemContainer">'
  + '       <div id="1" class="myDropDownItem " >'
  + '        <div class="myDropDownCheckbox myDropDownUnchecked"></div>'
  + '       </div>'
  + '       <div id="2" class="myDropDownItem " >'
  + '        <div class="myDropDownCheckbox myDropDownUnchecked"></div>'
  + '       </div>'
  + '       <div id="3" class="myDropDownItem " >'
  + '        <div class="myDropDownCheckbox myDropDownUnchecked"></div>'
  + '       </div>'
  + '          '
  + '   </div>'
  + '</div>'
  + '</div>');  
var arr = [];
arr[0] = 1;
arr[1] = 2;
blueDDLClass.setSelecionado(obj, arr);
ok($($('.myDropDownCheckbox',obj)[0]).hasClass('myDropDownChecked'),true);
ok($($('.myDropDownCheckbox',obj)[1]).hasClass('myDropDownChecked'),true);
ok($($('.myDropDownCheckbox',obj)[2]).hasClass('myDropDownUnchecked'),false);


});



test("adicionarNovoItem true test", function(obj, id, valor){
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':true}">'
  + '  <div class="myDropDownItemContainer">'
  + '       <div id="1" class="myDropDownItem " >'
  + '         '
  + '         </div>'
  + '          '
  + '       </div>'
  + '   </div>'
  + '</div>');  

blueDDLClass.adicionarNovoItem(obj,2,'teste');
ok($($('.myDropDownCheckbox',obj)[0]).hasClass('myDropDownUnchecked'),true);


}); 

test("adicionarNovoItem false test", function(obj, id, valor){
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':false}">'
  + '  <div class="myDropDownItemContainer">'
  //+ '       <div id="1" class="myDropDownItem " >'
  + '         '
  //+ '         </div>'
  + '          '
  + '       </div>'
  + '   </div>'
  + '</div>');  

blueDDLClass.adicionarNovoItem(obj,1,'teste');
ok($('.myDropDownItem',obj).length == 1,1);
ok($($('.myDropDownItem',obj)[0]).attr('id') == "1", "1")
ok($($('.myDropDownItem',obj)[0]).text() == "teste", "teste")

}); 

test("desabilitarCombo true test", function(obj) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':false,\'disabled\':false}">'
  + '  <div class="myDropDownBoxName">'
  //+ '       <div id="1" class="myDropDownItem " >'
  + '         '
  //+ '         </div>'
  + '          '
  + '       </div>'
  + '   </div>'
  + '</div>');


blueDDLClass.desabilitarCombo(obj);
ok($('.myDropDownBoxName',obj).hasClass('myDropDownDisabled'),true);
});

test("desabilitarCombo false test", function(obj) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':false,\'disabled\':false}">'
  + '  <div class="myDropDownBoxName">'
  //+ '       <div id="1" class="myDropDownItem " >'
  + '         '
  //+ '         </div>'
  + '          '
  + '       </div>'
  + '   </div>'
  + '</div>');
   
blueDDLClass.desabilitarCombo(obj);

var data = blueDDLClass.getData($('.myDropDown',obj).attr('data'));
ok(data.disabled == true, true);
});

test("habilitarCombo true test", function(obj) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':false,\'disabled\':true}">'
  + '  <div class="myDropDownBoxName">'
  //+ '       <div id="1" class="myDropDownItem " >'
  + '         '
  //+ '         </div>'
  + '          '
  + '       </div>'
  + '   </div>'
  + '</div>');


blueDDLClass.habilitarCombo(obj);
ok($('.myDropDownBoxName',obj).hasClass('myDropDownDisabled') == false,false);
});

test("habilitarCombo false test", function(obj) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':false,\'disabled\':true}">'
  + '  <div class="myDropDownBoxName">'
  //+ '       <div id="1" class="myDropDownItem " >'
  + '         '
  //+ '         </div>'
  + '          '
  + '       </div>'
  + '   </div>'
  + '</div>');
   
blueDDLClass.habilitarCombo(obj);

var data = blueDDLClass.getData($('.myDropDown',obj).attr('data'));
ok(data.disabled == false, true);
});


test("myDropDownItemControler checkbox true test", function(obj) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':true}">'
  + '  <div id="Lista">'
  + '       <div id="1" class="myDropDownItem" >'
  + '         <div class="myDropDownChecked"></div>'
  + '       </div>'
  + '       <div id="2" class="myDropDownItem" >'
  + '         <div class="myDropDownUnchecked"></div>'
  + '       </div>'
  + '   </div>'
  + '</div>'
  + '</div>');
   
blueDDLClass.myDropDownItemControler($($('.myDropDownItem',obj)[0]));

var resultado = $($('.myDropDownCheckbox',obj)[0]).hasClass('myDropDownUnchecked');
ok(resultado == false, false)
});



test("User test", function() {

  var div = $('<div id="vaiquevai" style="width:300px">'
+ '<div class="listItem" id="1">bla1</div>'
+ '<div class="listItem" id="2">bla2</div>'
+ '<div class="listItem" id="3">bla3</div>'
+ '</div>');

$(div).blueDDL();

$('.myDropDownBox',div).click();
$('.myDropDownItem',div)[0].click();

var resultado = $(div).blueDDL_Selected();
console.log(resultado);
ok(resultado == 1, true);
});

test("User test checkbox true", function() {

  var div = $('<div id="vaiquevai" style="width:300px">'
+ '<div class="listItem" id="1">bla1</div>'
+ '<div class="listItem" id="2">bla2</div>'
+ '<div class="listItem" id="3">bla3</div>'
+ '</div>');

$(div).blueDDL(null,true);

$('.myDropDownBox',div).click();
$('.myDropDownItem',div)[0].click();

$('.myDropDownItem',div)[2].click();


var resultado = $(div).blueDDL_Selected();
ok(resultado instanceof Array,'Esperado um array');
ok(resultado.length == 2, 'Esperado 2');
ok((resultado)[0] == 1, true);
ok((resultado)[1] == 3, true);

});

test("Set Selected test true", function(id) {

  var div = $('<div id="vaiquevai" style="width:300px">'
+ '<div class="listItem" id="1">bla1</div>'
+ '<div class="listItem" id="2">bla2</div>'
+ '<div class="listItem" id="3">bla3</div>'
+ '</div>');

$(div).blueDDL();

$(div).blueDDL_SetSelected(3);

ok($(div).blueDDL_Selected() == 3,'esperado o valor 3');

});

var testeClick = 1;
funcTesteClick = function(){

  testeClick = 2;
}

test("test Click true", function(id) {
testeClick = 1;
  var div = $('<div id="vaiquevai" style="width:300px">'
+ '<div class="listItem" id="1">bla1</div>'
+ '<div class="listItem" id="2">bla2</div>'
+ '<div class="listItem" id="3">bla3</div>'
+ '</div>');

$(div).blueDDL(funcTesteClick);

ok(testeClick == 1, 'Esperado é 1')

$('.myDropDownItem',div)[0].click();

ok(testeClick == 2, 'Esperado é 2')


});

test("test Click true", function(id) {
testeClick = 1;
  var div = $('<div id="vaiquevai" style="width:300px">'
+ '<div class="listItem" id="1">bla1</div>'
+ '<div class="listItem" id="2">bla2</div>'
+ '<div class="listItem" id="3">bla3</div>'
+ '</div>');

$(div).blueDDL();

ok(testeClick == 1, 'Esperado é 1')

$(div).blueDDL_OnClick(funcTesteClick);
$('.myDropDownItem',div)[0].click();

ok(testeClick == 2, 'Esperado é 2')


});

test("test new item", function() {

  var div = $('<div id="vaiquevai" style="width:300px">'
+ '<div class="listItem" id="1">bla1</div>'
+ '<div class="listItem" id="2">bla2</div>'
+ '<div class="listItem" id="3">bla3</div>'
+ '</div>');

$(div).blueDDL();

$(div).blueDDL_NewItem(4,'teste');
$(div).blueDDL_SetSelected(4);
ok($(div).blueDDL_Selected() == 4,'esperado o valor 4');




});

