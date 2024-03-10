$(document).ready(function() {
	{% capture varHTMLemail %}
					<input name="email" type="text" class="u-input" placeholder="Add your email" required />
					<input name="subject" type="text" class="u-input" placeholder="Enter email subject" />
					<textarea name="message" class="u-textarea" placeholder="Enter your message"></textarea>
	{% endcapture %}{% capture varHTMLtelephone %}
					<input name="telephone" type="tel" class="u-input" placeholder="Enter the phone number" minlength="9" maxlength="20" required />
	{% endcapture %}{% capture varHTMLwebsite %}
					<input name="website" type="text" class="u-input" placeholder="Enter the website link" required />
	{% endcapture %}{% capture varHTMLcustom %}
					<textarea name="custom" class="u-textarea" placeholder="Enter your custom text" required></textarea>
	{% endcapture %}

	var attrHREF = "",
		codeString = "",
		codeEncoded = "",
		codePrefix = "";

	var HTMLemail = '{{ varHTMLemail | remove: "
	" | remove: "	" }}',
		HTMLtelephone = '{{ varHTMLtelephone | remove: "
	" | remove: "	" }}',
		HTMLwebsite = '{{ varHTMLwebsite | remove: "
	" | remove: "	" }}',
		HTMLcustom = '{{ varHTMLcustom | remove: "
	" | remove: "	" }}';

	$(".js-generate").click(function() {
		attrHREF = $(".js-menu.is-active").attr("attrHREF");
		var thatQRCodeTag = $(".js-code"),
			thatHiddenQRCodeTag = $(".js-code-hidden");
			thatHiddenDownloadTag = $(".js-download-hidden");
		
		thatQRCodeTag.attr("src", "assets/images/placeholder_qr-code_1x1.png");
		thatHiddenQRCodeTag.attr("src", "assets/images/placeholder_hidden_1x1.png");
		
		var iValue = "";
		$(".js-fieldset").children().each(function(i, item) {
			iValue = item.value;
			if(iValue == null || iValue == "" || iValue == undefined) { iValue == "[empty]"; }
			codeString += item.name + ":" + iValue + ";";
		});
		
		var codeArray = [],
			codeArrayDetails = [];
		switch(attrHREF) {
			case "email":
				codeArray = codeString.split(";");
				for(i = 0; i < codeArray.length - 1; i++) {
					codeArrayDetails = codeArray[i].split(":");
					
					if(codeArrayDetails[0] == "email") { codeEncoded += "mailto:" + codeArrayDetails[1]; }
					else if(codeArrayDetails[0] == "subject") { codeEncoded += "?subject=" + codeArrayDetails[1]; }
					else if(codeArrayDetails[0] == "message") { codeEncoded += "&body=" + codeArrayDetails[1]; }
				}
			break;
			case "telephone":
				codeEncoded = codeString.replace("telephone:", "").replace(";", "");
				codeEncoded = "tel:" + codeEncoded;
			break;
			case "website":
				codeEncoded = codeString.replace("website:", "").replace(";", "");
				codeEncoded = "https://" + codeEncoded.replace("http://", "").replace("https://", "").replace("www.", "");
			break;
			case "custom":
				codeEncoded = codeString.replace("custom:", "").replace(";", "");
			break;
			
			default:
		}
		
		codeEncoded = codePrefix + codeEncoded;
		
		if(($(".js-html").hasClass("is-online")) && (codeEncoded != null || codeEncoded != "" || codeEncoded != undefined)) {
			thatQRCodeTag.attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + codeEncoded + "&chs=500x500&chld=L|O.png");
			thatQRCodeTag.addClass("is-active");
			
//			thatHiddenQRCodeTag.attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + codeEncoded + "&chs=500x500&chld=L|O.png	");
			
			thatHiddenDownloadTag.attr("href", "https://chart.googleapis.com/chart?cht=qr&chl=" + codeEncoded + "&chs=500x500&chld=L|O.png");
			thatHiddenDownloadTag.attr("download", "https://chart.googleapis.com/chart?cht=qr&chl=" + codeEncoded + "&chs=500x500&chld=L|O.png");
		}
		else {
			thatQRCodeTag.removeClass("is-active");
		}
		
		codeEncoded = "";
		codeString = "";
	});
	$(".js-menu").click(function() {
		var theTag = $(this);
		
		attrHREF = theTag.attr("attrHREF");
		
		$(".js-menu").removeClass("is-active");
		theTag.addClass("is-active");
		
		changePageSection();
	});
	$(".js-download").click(function() {
//		$(".js-download-hidden").get(0).click();
		document.querySelector(".js-download-hidden").click();
/*
		var thatHiddenDownloadTagName = ".js-download-hidden";
		var thatHiddenImageTagName = ".js-code-hidden";

		html2canvas(document.querySelector(".js-code"), {
			scrollX: 0,
			scrollY: 0
		}).then(function(canvas) {
			var newImage = canvas.toDataURL("image/jpeg");
			document.querySelector(thatHiddenImageTagName).src = newImage;

			document.querySelector(thatHiddenDownloadTagName).href = newImage;
//				newTag.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
			document.querySelector(thatHiddenDownloadTagName).setAttribute("download", "QR-code-from-intobinary-dot-org.png");
			$(thatHiddenDownloadTagName).get(0).click();
		});
		*/

		/*
		html2canvas(document.querySelector(".main"))
			.then(canvas => {
				canvas.style.display = "none";
				document.body.appendChild(canvas);
				return canvas
			})
			.then(canvas => {
				const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
				const a = document.createElement("a");
				a.setAttribute("download", "my-image.png");
				a.click();
				canvas.remove();
			});
			*/
			
		
/*		
	html2canvas(document.querySelector("body")).then(function(canvas) {
		document.body.appendChild(canvas);
	});
	*/
			
			/*
		html2canvas($(".main"),
		{
			onrendered: function(canvas) {
				alert("HERE");
				var newTag = document.createElement("a");
				// toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
				newTag.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
				newTag.download = "QR-code-from-intobinary-dot-org.jpg";
				newTag.get(0).click();
			}
		});
		*/
	});
	$(".js-share").click(function() {
		window.open("whatsapp://send?text='Check out this QR Code Generator App, by Into Binary. Visit qr-code-generator.intobinary.org'");
	});

	function changePageSection() {
		var thatFieldsetTag = $(".js-fieldset"),
			thatTitleTag = $(".js-title");
			thatSectionTag = $(".js-section");
		
		thatFieldsetTag.html("");
		thatTitleTag.html("");
		
		thatTitleTag.html(attrHREF);
		thatSectionTag.removeClass("is-empty");
		
		switch(attrHREF) {
			case "email":
				thatFieldsetTag.html(HTMLemail);
			break;
			case "telephone":
				thatFieldsetTag.html(HTMLtelephone);
			break;
			case "website":
				thatFieldsetTag.html(HTMLwebsite);
			break;
			case "custom":
				thatFieldsetTag.html(HTMLcustom);
			break;
			
			default:
				thatSectionTag.addClass("is-empty");
		}
	}

	window.addEventListener("offline", function(event) { checkNetwork(); });
	window.addEventListener("online", function(event) { checkNetwork(); });
	window.addEventListener("load", function(event) {
		checkNetwork();
		setup();
	});
	function checkNetwork() {
		navigator.onLine ? appOnline() : appOffline();
	}
	function appOnline() {
		$(".js-html").removeClass("is-offline").addClass("is-online");
		$(".js-code").removeClass("is-active");
		$(".js-message").html("");
	}
	function appOffline() {
		$(".js-html").removeClass("is-online").addClass("is-offline");
		$(".js-message").html("You are offline. This app works with the internet!");
	}

	function setup() {
		$(".js-menu-1 .js-menu").click();
	}
});