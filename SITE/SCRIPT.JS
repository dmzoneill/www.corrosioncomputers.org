	
function enter(){

if (confirm('')){
javascript:main();
}}

function showDes() { 
  var i, visStr, args, theObj;
  args = showDes.arguments;
  for (i=0; i<(args.length-2); i+=3) {
    visStr   = args[i+2];
    if (navigator.appName == 'Netscape' && document.layers != null) {
      theObj = eval(args[i]);
      if (theObj) theObj.visibility = visStr;
    } else if (document.all != null) {
      if (visStr == 'show') visStr = 'visible';
      if (visStr == 'hide') visStr = 'hidden';
      theObj = eval(args[i+1]);
      if (theObj) theObj.style.visibility = visStr;
  } }
}

