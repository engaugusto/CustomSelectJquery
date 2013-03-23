
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
 
var esperado = "{'type':'blueDDL','isCheckBox':true}";
ok(resultado == esperado, esperado);

});

test( "montaData false test", function() {
 var resultado = blueDDLClass.montaData(false);

var esperado = "{'type':'blueDDL','isCheckBox':false}";
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
console.log($(obj).html());
ok($($('.myDropDownItem',obj)[0]).hasClass('selected'),true);
});

test("setSelecionado checkbox true test", function(obj, id) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':true}">'
  + '  <div class="myDropDownItemContainer">'
  + '       <div id="1" class="myDropDownItem " >'
  + '        <div class="myDropDownUnchecked"></div>'
  + '       </div>'
  + '       <div id="2" class="myDropDownItem " >'
  + '        <div class="myDropDownUnchecked"></div>'
  + '       </div>'
  + '          '
  + '   </div>'
  + '</div>'
  + '</div>');  

blueDDLClass.setSelecionado(obj, 1);
console.log(obj)
ok($($('.myDropDownItem',obj)[0]).hasClass('myDropDownChecked'),true);


});

test("setSelecionado false test", function(obj, id) {
var obj = $('<div><div class="myDropDown" data="{\'type\':\'blue2DDL\',\'isCheckBox\':true}">'
  + '  <div class="myDropDownItemContainer">'
  + '       <div id="1" class="myDropDownItem " >'
  + '        '
  + '       </div>'
  + '       <div id="2" class="myDropDownItem " >'
  + '        '
  + '       </div>'
  + '          '
  + '   </div>'
  + '</div>'
  + '</div>');  

blueDDLClass.setSelecionado(obj, array[2]);
ok($($('.myDropDownItem',obj)[0]).hasClass('selected'),true);


});
