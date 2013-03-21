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