var hcUpdateState = 0;
var hcControlImage;
var hcIsImage = false;
var hcCounter = 0;
var hcCmd = "startPage";
var hcTimeout = 5;
var hcSendCounter = 0;

var hcLeft = -1;
var hcTop = -1;

var hcNS = (document.layers) ? true : false;
var hcIE = (document.all) ? true : false;

var hcShowImage = false;

var hcPos = - 30;
var HumanStep = 3;
var hcDir = HumanStep;
var hcBorder = 100;
var hcAnimate = false;

var hcNeedImage;
var hcCloseImage;
var hcImageFetched = false;

var hcimage = hcGetImage("hcIcon");
if (hcimage)
	hcicon = hcimage.src;

function hcDate()
{
	var d = new Date();

	return d.getTime();
}

function hcSendRequest()
{
	hcSendCounter++;
	if (hcSendCounter == 5)
		hcIsImage = false;

	if (! hcIsImage) {
		hcControlImage= new Image;
		var u = 'http://207.153.203.114/hc/85757618/?site=85757618' + 
					'&cmd=' + hcCmd + 
					'&page=' + escape(document.location) + 
					'&title=' + escape(document.title) + 
					'&referrer=' + escape(document.referrer) + 
					'&d=' + hcDate();
		hcCmd = "inPage";
		hcControlImage.src = u;
		hcIsImage = true;
		hcSendCounter = 0;
	}
}

function hcHandleWidth(w)
{
	if (w == 60) {
		openChat();
	} else if (w == 70) {
		openWantsToChat();
	} else if (w == 30) {
		hcTimeout = -1;
	} else if (w == 40) {
		hcTimeout = 15;
	} else if (w == 50) {
		hcTimeout = 30;
	} else if (w >= 80) {
		if (w != 80  &&  isNaN(hcUpdateState))
			hcUpdateState(w-80);
		hcReloadIcon();
		hcSendRequest();
	}
}

function hcCheckImages()
{
	if (hcIsImage) {
		var w = hcControlImage.width;
		if (w == 0)
			return;
		hcIsImage = false;
		hcHandleWidth(w);
	}
}

function hcXoomImage()
{
	for (var i = 0; i < document.links.length; i++) {
		if (document.links[i].href.indexOf('javascript') >= 0) {
			document.links[i].target = "_self";
		}
	}
}

function hcloop()
{
	if (hcTimeout < 0)
		return;

	if (hcCounter == 0)
		hcSendRequest();
	hcCounter = (hcCounter + 1) % hcTimeout;
	hcCheckImages();

	hcXoomImage();
		
	setTimeout('hcloop()', 1000);
}	

function hcReloadIcon()
{
	if (hcimage)
		hcimage.src = hcicon + "&d=" + hcDate();
}

function openChat()
{
	window.open('http://207.153.203.114/hc/85757618/?cmd=file&file=visitorWantsToChat&site=85757618&d=' + hcDate(), 'chat85757618', 'width=419,height=320,menubar=no,scrollbars=0');
}

function openCredit()
{
	document.location = "http://www.bravenet.com/humanclick/program.php";
}

function openWantsToChat()
{
	if (hcIE || hcNS) {
		hcShowTheImage();
	} else {
		window.open('http://207.153.203.114/hc/85757618/?cmd=file&file=wantsToChat&site=85757618&d=' + hcDate(), 'wanttochat85757618', ',,menubar=no,scrollbars=no');
	}	
}

function hcPreload()
{
	hcNeedImage = new Image();
	hcNeedImage.src = "http://images.bravenet.com/humanclick//need_help_on.gif";

	hcCloseImage = new Image();
	hcCloseImage.src = "http://images.bravenet.com/humanclick//close_on.gif";
}

function hcSetImageGo(name, image, go)
{
	hcAnimate = go;
	hcSetImage(name, image);
}

function hcSetImage(name, image)
{
	hcGetImage(name).src = "http://images.bravenet.com/humanclick//" + image;
}

if (hcIE) {
	document.write('<div id="mylayer" style="z-index:90;position:absolute;visibility:hidden;left:10;top:10">');
	document.write('<table border="0" cellspacing="0" cellpadding="0">');
	document.write('<tr><td><a name="needRef" href="hc" onClick="return hcAcceptCall()" target="_self" onmouseover=hcSetImageGo("need_help","need_help_on.gif",false) onmouseout=hcSetImageGo("need_help","need_help_off.gif",true)><img name="need_help" onload="hcFloatIconLoaded()" border="0"  ></a></td></tr>');
	document.write('<tr><td><a href="hc" onClick="return hcRejectCall()" target="_self" onmouseover=hcSetImageGo("need_close","close_on.gif",false) onmouseout=hcSetImageGo("need_close","close_off.gif",true)><img name="need_close" border="0"  ></a></td></tr>');
	document.write('</table></div>');
} else if (hcNS) {
	document.write('<layer name="mylayer" z-index="90" left="10" top="10" visibility="hidden">');
	document.write('<table border="0" cellspacing="0" cellpadding="0">');
	document.write('<tr><td><a href="hc" onClick="return hcAcceptCall()" target="_self" onmouseover=hcSetImageGo("need_help","need_help_on.gif",false) onmouseout=hcSetImageGo("need_help","need_help_off.gif",true)><img name="need_help" src="http://images.bravenet.com/humanclick//need_help_off.gif" onload="hcFloatIconLoaded()" border="0"  ></a></td></tr>');
	document.write('<tr><td><a href="hc" onClick="return hcRejectCall()" target="_self" onmouseover=hcSetImageGo("need_close","close_on.gif",false) onmouseout=hcSetImageGo("need_close","close_off.gif",true)><img name="need_close" src="http://images.bravenet.com/humanclick//close_off.gif" border="0"  ></a></td></tr>');
	document.write('</table></layer>');
}

function hcFloatIconLoaded()
{
	hcImageFetched = true;
}

function hcImageTimer()
{
	if (hcShowImage && hcImageFetched) {
		var top;
		var left;

		if (hcIE) {

			top = document.body.scrollTop;
			left = document.body.scrollLeft;

			if ((hcTop < 0) || ((hcTop == top) && (hcLeft == left))) {
				document.all.mylayer.style.visibility = "visible";
			} else {
				document.all.mylayer.style.visibility = "hidden";
			}

		} else if (hcNS) {
		
			top = pageYOffset;
			left = pageXOffset;
		
			if ((hcTop < 0) || ((hcTop == top) && (hcLeft == left))) {
				document.layers.mylayer.visibility = "visible";
			} else {
				document.layers.mylayer.visibility = "hidden";
			}
		}

		hcPlaceImage();

		hcTop = top;
		hcLeft = left;
	}

	setTimeout('hcImageTimer()', 250);
}

function hcAcceptCall()
{
	hcHideTheImage();

	openChat();

	return false;
}

function hcRejectCall()
{
	hcHideTheImage();

	hcCmd = "rejectChat";
	hcCounter = 0;

	return false;
}

function hcHideTheImage()
{
	hcShowImage = false;

	if (hcIE) {
		document.all.mylayer.style.visibility = "hidden";
	} else if (hcNS) {
		document.layers.mylayer.visibility = "hidden";
	}
}

function hcShowTheImage()
{
	hcShowImage = true;

	hcSetImage("need_help","need_help_off.gif");
	hcSetImage("need_close","close_off.gif");

	hcAnimate = true;
		
	hcPreload();

	hcAnimateStart();
}

function hcAnimateStart()
{
	if (hcIE) {
		hcBorder = document.body.clientWidth;
	} else if (hcNS) {
		hcBorder = window.innerWidth;
	}

	hcAnimateImage();
}

function hcAnimateImage()
{
	if (hcImageFetched && hcAnimate)
		hcPos = hcPos + hcDir;

	if (hcPos > hcBorder - 160)
		hcDir = - HumanStep;

	hcPlaceImage();

	if ((hcPos > 30) || (hcDir > 0))
		setTimeout("hcAnimateImage()", 20);
}

function hcPlaceImage()
{
	var y = 40;

	if (hcIE) {
		document.all.mylayer.style.left = document.body.scrollLeft + hcPos;
		document.all.mylayer.style.top = document.body.scrollTop + y;
	} else if (hcNS) { 
		document.layers.mylayer.left = pageXOffset + hcPos;
		document.layers.mylayer.top = pageYOffset + y;
	}
}

function hcGetImage(name)
{
	return hcFindImage(document, name);
}

function hcFindImage(doc, name)
{
	var lays = doc.layers;

	if (! lays)
		return doc[name];

	for (var i = 0; i < doc.images.length; i++) {
		if (doc.images[i].name == name)
			return doc.images[i];
	}

	for (var l = 0; l < lays.length; l++) {
		img = hcFindImage(lays[l].document, name);
		if (img != null)
			return img;
	}

	return null;
}


function hcgo()
{
	hcloop();
	setTimeout('hcImageTimer()', 250);
}

if (true)
	hcgo();
