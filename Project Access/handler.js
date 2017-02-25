document.addEventListener('DOMContentLoad', function() {
  document.getElementById("on-submit").addEventListener("click", handler);
});

function handler()
{
  checkFields(1);
}

document.addEventListener('DOMContentLoad', function() {
  document.getElementById("on-key-press").addEventListener("click", handler2);
});

function handler2()
{
  checkCapsLock(event);
}

document.addEventListener('DOMContentLoad', function() {
  document.getElementById("on-load").addEventListener("click",handler3);
});

function handler3()
{
  setFocus();
}

document.addEventListener('DOMContentLoad', function() {
  document.getElementById("on-change").addEventListener("click", handler4);
});

function handler4()
{
  checkMethod();
}

function setFocus()
{
  document.login.dspl_ssn.focus()
}

function checkFields(source)
{
  var num = document.login.elements.length;
  var validFlag = true;
  var blankOutField = false;
  if (source=="2"){
      blankOutField = true;
  }
//  var fromRadio = null;
  var fieldName = null;
//  var method = getRadioValue(document.login.LMethod);
  var method = getSelectValue(document.login.LMethod);
  if(method == null)
  {
    validFlag = false;
    alert("The Login Type field is blank. Please select a value.");
  }
  var user = document.login.dspl_ssn.value;
  //document.login.ssn.value = user;
  var pass = document.login.dspl_pin.value;
  var errID = 0;
  var errPIN = 0;
  var errPIN2 = 0;
  var SSNerrorIDstr = "Please enter your Social Security Number (numbers only).";
  var UIDerrorIDstr = "Please enter your nine-digit University ID.";
  var TPAerrorIDstr = "Please enter the eight-digit Third Party Access number you received from the owner of the account you are trying to access.\n\nIf you have additional problems, please contact the account owner.";
  var TPAerrorIDextra = "If you are trying to login with a Third Party Access account, please select \"Third Party Access\" as your \"Login Method\".";
  var errorPINstr = "Please enter your Password.";
  var errorPIN2str = "PINs are no longer valid. Please contact the Solution Center to have your password created or reset.";

  switch(method)
  {
    case "ssn":
      document.login.LoginMethod.value="SOC SEC # ";
      if(user.length!=9 || isNaN(user))
      {
        if((user.length==9 && user.match(/[Pp]\d{8}/)) || (user.length==8 && (user.match(/\d{8}/))))
        { SSNerrorIDstr = SSNerrorIDstr + "\n\n" + TPAerrorIDextra; }
        errID = 1;
      }
      break;
    case "uid":
      document.login.LoginMethod.value="UNIV ID   ";
      if(user.length!=9 || isNaN(user))
      {
        if((user.length==9 && user.match(/[Pp]\d{8}/)) || (user.length==8 && (user.match(/\d{8}/))))
        { UIDerrorIDstr = UIDerrorIDstr + "\n\n" + TPAerrorIDextra; }
        errID = 2;
      }
      break;
    case "tpa":
      document.login.LoginMethod.value="SOC SEC # ";
      if((!(user.length==8 && user.match(/\d{8}/))) && (!(user.length==9 && user.match(/[Pp]\d{8}/))))
      { errID = 3; }
      else if(user.length==8)
      { document.login.dspl_ssn.value = "P" + user; }
      else if(user.length==9)
      { document.login.dspl_ssn.value = "P" + user.substring(1,9); }
      break;
    case "VINCENT ID":
      if(user.indexOf("\@") > -1)
      { document.login.dspl_ssn.value = user.substr(0,user.indexOf("\@")); }
      break;
    default:
      break;
  }

  if((pass.length<6 || pass.length>8))
  { errPIN = 1;
  //alert('124'+pass.length+isNaN(pass));
    //if((pass.length==4 && isNaN(pass)))
    if((pass.length==4))
    { errPIN2 = 1; }
  }
  // build error string and make incorrect fields red
  var errorStr = "";
  if(errID==1) { errorStr = SSNerrorIDstr; document.login.dspl_ssn.focus(); document.login.dspl_ssn.style.backgroundColor="#ffcccc"; }
  if(errID==2) { errorStr = UIDerrorIDstr; document.login.dspl_ssn.focus(); document.login.dspl_ssn.style.backgroundColor="#ffcccc"; }
  if(errID==3) { errorStr = TPAerrorIDstr; document.login.dspl_ssn.focus(); document.login.dspl_ssn.style.backgroundColor="#ffcccc"; }
  if(errPIN==1 && errID==0) { errorStr = errorPINstr; document.login.dspl_pin.focus(); document.login.dspl_pin.style.backgroundColor="#ffcccc"; }
  if(errPIN==1 && errID>0) { errorStr = errorStr + "\n\n" + errorPINstr; document.login.dspl_pin.style.backgroundColor="#ffcccc"; }
  if(errPIN2==1) { errorStr = errorStr + "\n\n" + errorPIN2str; document.login.dspl_pin.style.backgroundColor="#ffcccc"; }

  // make correct fields white again
  if(errID==0) { document.login.dspl_ssn.style.backgroundColor="#ffffff"; }
  if(errPIN==0) { document.login.dspl_pin.style.backgroundColor="#ffffff"; }

  if(errID+errPIN>0) { alert(errorStr); validFlag = false; }

  if (validFlag) {document.login.pin.value=document.login.dspl_pin.value;document.login.ssn.value=document.login.dspl_ssn.value;if (blankOutField){document.login.dspl_ssn.value="";document.login.dspl_pin.value="";setFocus();}}
  return validFlag;
}
function checkMethod()
{

  var method = getSelectValue(document.login.LMethod);
  if(method == null)
  {
    validFlag = false;
    alert("The Login Type field is blank. Please select a value.");
  }

  switch(method)
  {
    case "cfr":
      document.login.A_Plus_action.value="/frontdoor/confirmation.jsp";document.login.submit();
      break;

    default:
      break;
  }

  return true;
}

function getSelectValue(selectObject)
{
  var value = selectObject.options[selectObject.selectedIndex].value;
  return value;
}

function getRadioValue(radioObject)
{
  var value = null ;
  for (var i=0; i<radioObject.length; i++)
  {
    if (radioObject[i].checked)
    {
      value = radioObject[i].value;
      break;
    }
  }
  return value;
}

// DELETE
// used to make links to select radio button; now handled by label attributes
//function radioSelect(radioObject,selectValue)
//{
//  var value = null ;
//  for (var i=0; i<radioObject.length; i++)
//  {
//    if (radioObject[i].value==selectValue)
//    {
//      radioObject[i].checked=true;
//      break;
//    }
//  }
//}

// End Hiding Here -->
