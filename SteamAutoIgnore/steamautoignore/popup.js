"use strict";
function $(a){return"undefined"===typeof a?document:document.querySelectorAll(a)};
Element.prototype.remove = function() {
			this.parentElement.removeChild(this);
		};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
			for(var i = this.length - 1; i >= 0; i--) {
			if(this[i] && this[i].parentElement) {
				this[i].parentElement.removeChild(this[i]);
				}
			}
		};

var i=0;

if(typeof window.localStorage.steamAutoIgnore === "string"){
	var storage = JSON.parse(window.localStorage.steamAutoIgnore);
}
else alert("Something went wrong. Try reinstalling the extension.");
function changePower(a){
	if(a === false){
		$("body>.on-off")[0].className = "on-off";
		storage["power"] = "off";
	}
	else if(a === true){
		$("body>.on-off")[0].className = "on-off on";
		storage["power"] = "on";
	}
	var temp = JSON.stringify(storage);
	window.localStorage.steamAutoIgnore = temp;
	temp = "";
	chrome.runtime.sendMessage("power",function(response){});
}
if(storage.power == "off") $("body>.on-off")[0].className = "on-off";
else if(storage.power == "on") $("body>.on-off")[0].className = "on-off on";

$("#refreshTime")[0].value = parseInt(storage.interval);
$("#apiKey")[0].value = storage.apiKey;
$("#groupKeywords")[0].value = storage.groupKeywords;
$("#groupBlock")[0].checked = storage.groupBlock;
$("#friendKeywords")[0].value = storage.friendKeywords;
$("#levelReject")[0].value = storage.levelReject;
$("#privateReject")[0].checked = storage.privateReject;
$("#tradebanReject")[0].checked = storage.tradebanReject;
$("#vacReject")[0].checked = storage.vacReject;
$("#cbanReject")[0].checked = storage.cbanReject;

function switchPower(){
	if(storage.power == "on") changePower(false);
	else if(storage.power == "off") changePower(true);
}

$("body>.on-off")[0].addEventListener("click",switchPower);

document.body.className = "show";

function saveObject(){
	
	try{
	
		var l_interval =  $("#refreshTime")[0];
		if(!l_interval.value) throw {type:"error",message:"The interval value must be specified"};
		else if(parseInt(l_interval.value) < l_interval.min || parseInt(l_interval.value)>l_interval.max) throw {type:"error",message:"The interval value needs to be between "+l_interval.min+" and "+l_interval.max};
		
		if($("#apiKey")[0].value.length != 0)
			if($("#apiKey")[0].value.length != 32 || !$("#apiKey")[0].value.match(/^[A-Z0-9]+/g)[0] || $("#apiKey")[0].value.match(/^[A-Z0-9]+/g)[0].length != 32)
				throw {type:"error",message:"Please type the API Key correctly"};
		
		if(($("#privateReject")[0].checked || $("#tradebanReject")[0].checked || $("#vacReject")[0].checked || $("#cbanReject")[0].checked) && !$("#apiKey")[0].value)
			throw {type:"error",message:"If you want to use one of the friend invites options you need to complete the Steam API Key input."};
	
		storage["interval"] = parseInt($("#refreshTime")[0].value);
		storage["apiKey"] = $("#apiKey")[0].value;
		storage["groupKeywords"] = $("#groupKeywords")[0].value;
		storage["groupBlock"] = $("#groupBlock")[0].checked;
		storage["friendKeywords"] = $("#friendKeywords")[0].value;
		storage["levelReject"] = $("#levelReject")[0].value;
		storage["privateReject"] = $("#privateReject")[0].checked;
		storage["tradebanReject"] = $("#tradebanReject")[0].checked;
		storage["vacReject"] = $("#vacReject")[0].checked;
		storage["cbanReject"] = $("#cbanReject")[0].checked;
	
		var temp = JSON.stringify(storage);
	
		window.localStorage.steamAutoIgnore = temp;
		
		chrome.runtime.sendMessage("save",function(response){
			if(!response.saved || response.saved != true){
				var fdiv = document.createElement("div");
				fdiv.innerHTML = "Failed!";
				fdiv.id = "failed-text";
				$("body>#failed-text").remove();
				$("body")[0].appendChild(fdiv);
			}
			else{
				if($("body>#saved-text").length==0){
					$("body>#failed-text").remove();
					var div = document.createElement("div");
					div.innerHTML = "Saved!";
					div.id = "saved-text";
					$("body")[0].appendChild(div);
					setTimeout(function(){
						div.remove();
					},3E3)
				}
			}
		});
	
		temp = "";
  
	}
	catch(m){
		if(typeof m === "object" && m.constructor === Object){
			if(!!m.type && m.type == "error"){
				var fdiv = document.createElement("div");
				fdiv.innerHTML = "Failed!";
				fdiv.id = "failed-text";
				$("body>#failed-text").remove();
				$("body")[0].appendChild(fdiv);
				if(m.message)alert(m.message);
			}
		}
		else alert(m);
	}
}

$("#save-button")[0].addEventListener("click",saveObject);
