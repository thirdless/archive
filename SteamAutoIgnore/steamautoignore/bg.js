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

/*function searchArray(array,string){
	for(var i=0;i<array.length;i++){
		if(array[i].indexOf(string)>-1) return i;
	}
	return -1;
}*/

function sumstr(a,b){
	if(typeof a !== "string" || typeof b !== "string")return;
	var zrx = /^0+/;
	a = a.replace(zrx, '').split('').reverse();
	b = b.replace(zrx, '').split('').reverse();
	var result = [], max = Math.max(a.length, b.length);
	for(var memo=0,i=0;i<max;i++) {
		var res = parseInt(a[i] || 0) + parseInt(b[i] || 0) + memo;
		result[i] = res % 10;
		memo = (res - result[i]) / 10;
	}
	if(memo) result.push(memo);
	return result.reverse().join('');
}

var storageDefault = {
	power : "off",
	interval : "5",
	apiKey : "",
	groupKeywords : "",
	groupBlock : false,
	friendKeywords : "",
	levelReject : 0,
	privateReject : false,
	tradebanReject : false,
	vacReject : false,
	cbanReject : false
};
var i=0;

if(typeof window.localStorage.steamAutoIgnore === "string"){
	window.storage = JSON.parse(window.localStorage.steamAutoIgnore);
}
else if(typeof window.localStorage.steamAutoIgnore === "undefined"){
	window.storage = {};
};
for(i in storageDefault){
		if(typeof storage[i] === "undefined") storage[i] = storageDefault[i];
	};
window.localStorage.steamAutoIgnore = JSON.stringify(storage);

function checkAll(){
	
	// group checking
	if(storage.groupKeywords || storage.friendKeywords || parseInt(storage.levelReject) || storage.privateReject || storage.tradebanReject || storage.vacReject || storage.cbanReject){
		
		var g_keywords = storage.groupKeywords.toLowerCase().trim().split(","),
			f_keywords = storage.friendKeywords.toLowerCase().trim().split(",");
		
		for(var i=0;i<g_keywords.length;i++)g_keywords[i] = g_keywords[i].replace(/\s+/g, ' ').trim();
		g_keywords.filter(Boolean);
		for(var i=0;i<f_keywords.length;i++)f_keywords[i] = f_keywords[i].replace(/\s+/g, ' ').trim();
		f_keywords.filter(Boolean);
		
		//document.querySelectorAll('a[href^="javascript:FriendAccept("')[0].getAttribute("href").replace(/ /g,"").split("(")[1].split(",")[0].replace(/'/g,"")
		
		function invitepage(html){
			
			var gelem = html.querySelectorAll('a[href^="javascript:GroupAccept("'),
				felem = html.querySelectorAll('a[href^="javascript:FriendAccept("'),
				sessionID = html.getElementsByName("sessionID")[0].value,
				processURL = html.querySelectorAll('body script[type="text/javascript"][language="javascript"]')[0].innerHTML.trim().split(";")[0].split("=")[1].trim().replace(/'/g,"");
			
			if(!~processURL.indexOf("home_process")){new Error("could not parse the processURL correctly")}
			function rejectInvite(fid,type,performt){
				var performt = (typeof performt !== 'undefined') ? performt : "ignore";
				var dataObj = {
					"json": 1,
					"xml": 1,
					"action": "approvePending",
					"itype": type,
					"perform": performt,
					"id": fid,
					"sessionID": sessionID
				};
				
				var pairs = [];
				for (var v in dataObj){
					var value = dataObj[v].toString();
					var pair = encodeURIComponent(v).replace(/%20/g,'+') + '=' + encodeURIComponent( value ).replace(/%20/g,'+');
					pairs.push(pair);
				}
				dataObj = pairs.join('&');
				
				var xhr2 = new XMLHttpRequest();
				xhr2.open("POST",processURL,true);
				xhr2.onreadystatechange = function(){
					if(xhr2.readyState==4&&xhr2.status==200){
					}
				}
				xhr2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xhr2.send(dataObj);
			}	
				
			if(storage.groupKeywords){
				for(var i=0;i<(gelem.length/2);i++){
				
					var index = i * 2,
						title = gelem[index].parentNode.parentNode.getElementsByClassName("linkTitle")[0].innerHTML.toLowerCase();
					
					if(storage.groupKeywords != "*"){
						for(var j=0;j<g_keywords.length;j++){
							if(title.indexOf(g_keywords[j])>-1){
								var idToRemove = gelem[index].getAttribute("href").replace(/ /g,"").split("(")[1].split(",")[0].replace(/'/g,"");
								rejectInvite(idToRemove,"group");
								if(storage.groupBlock){
									var profileBlock = gelem[index].parentNode.parentNode.querySelectorAll(".linkStandard[data-miniprofile]")[0].getAttribute("data-miniprofile"),
										idToBlock = sumstr(profileBlock,"76561197960265728");
									rejectInvite(idToBlock,"friend","block");
								}
								break;
							}
						}
					}
					else{
						var idToRemove = gelem[index].getAttribute("href").replace(/ /g,"").split("(")[1].split(",")[0].replace(/'/g,"");
						rejectInvite(idToRemove,"group");
						if(storage.groupBlock){
							var profileBlock = gelem[index].parentNode.parentNode.querySelectorAll(".linkStandard[data-miniprofile]")[0].getAttribute("data-miniprofile"),
								idToBlock = sumstr(profileBlock,"76561197960265728");
							rejectInvite(idToBlock,"friend","block");
						}
					}
				}
			}
			
			if((storage.friendKeywords || parseInt(storage.levelReject) || storage.privateReject || storage.tradebanReject || storage.vacReject || storage.cbanReject) && storage.apiKey){
				
				var frReqIds = [],
					levelNum = parseInt(storage.levelReject);
					
				for(var i=0;i<(felem.length/3);i++){
					
					var index = i * 3,
						friendID = felem[index].getAttribute("href").replace(/ /g,"").split("(")[1].split(",")[0].replace(/'/g,""),
						friendlvl = parseInt(felem[index].parentNode.parentNode.querySelectorAll(".friendPlayerLevelNum")[0].innerHTML),
						friendName = felem[index].parentNode.parentNode.querySelectorAll(".eventTitle .linkTitle")[0].innerHTML;
					
					
					if(levelNum){
						if(friendlvl < levelNum){
							rejectInvite(friendID,"friend");
							continue;
						}
					}
					
					if(storage.friendKeywords){
						if(storage.friendKeywords != "*"){
							for(var j=0;j<f_keywords.length;j++){
								if(friendName.indexOf(f_keywords[j])>-1){
									rejectInvite(friendID,"friend");
									break;
								}
							}
						}
						else{
							rejectInvite(friendID,"friend");
							continue;
						}
					}
					
					if(storage.privateReject || storage.tradebanReject || storage.vacReject || storage.cbanReject) frReqIds.push(friendID);
					
				}
				
				if(typeof gelem !== "undefined" && typeof felem !== "undefined") gelem = "", felem = "";
				
				function afterPrivate(a,b){
					
					if(storage.tradebanReject || storage.vacReject || storage.cbanReject){
						
						for(var i=0;i<a.length;i++){
							
							var query2 = a.slice(i*b,(i+1)*b).join("+");
							
							var q = new XMLHttpRequest();
							q.open("GET","http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=" + storage.apiKey + "&steamids=" + query2,true);
							q.onreadystatechange = function(){
								if(q.readyState==4&&q.status==200){
									var response2 = JSON.parse(q.responseText);
									
									if(response2 && typeof response2["players"] === "object" && response2["players"].constructor === Array){

										for(var j=0;j<response2["players"].length;j++){
											
											var profile = response2["players"][j];
											
											if((storage.tradebanReject && profile.EconomyBan == "banned") || 
												(storage.vacReject && (profile.VACBanned == true || parseInt(profile.NumberOfGameBans)>0)) || 
												(storage.cbanReject && profile.CommunityBanned == true))
												
													rejectInvite(profile.SteamId,"friend");
										}
										
										
									}
								}
							}
							q.send();
						}
					
					}
					
				}
				
				
				var slicenum = 50;
				
				for(var i=0;i<(frReqIds.length/slicenum);i++){
					
					var query = frReqIds.slice(i*slicenum,(i+1)*slicenum).join("+");
					
					var x = new XMLHttpRequest();
					x.open("GET","http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + storage.apiKey + "&steamids=" + query, true);
					x.onreadystatechange = function(){
						if(x.readyState==4&&x.status==200){

							var response = JSON.parse(x.responseText);
							
							if(response && response["response"] && typeof response["response"]["players"] === "object" && response["response"]["players"].constructor === Array){
								var tempArray = frReqIds;
								
								if(storage.privateReject){
									for(var j=0;j<response["response"]["players"].length;j++){
										var profile = response["response"]["players"][j];

										if(profile.communityvisibilitystate == 1){
											rejectInvite(profile.steamid,"friend");
											var aIndex = tempArray.indexOf(profile.steamid);
											tempArray.splice(aIndex,1);
										}
									}
								}
								

								
								frReqIds = tempArray;
								tempArray = "";
								afterPrivate(frReqIds,slicenum);
								
							}
						}
					}
					query = "";
					x.send();

				}
					

			}
			
		}
		
		var xhr = new XMLHttpRequest();
		xhr.open("GET","http://steamcommunity.com/my/home/invites/",true);
		xhr.responseType = "document";
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4&&xhr.status==200){invitepage(xhr.responseXML);}
		}
		xhr.send();
	}
	
}

function doCheck(){
	checkAll();
	window.timeoutCheck = undefined;
	window.timeoutCheck = setTimeout(doCheck,parseInt(storage.interval) * 60 * 1000);
	return;
}
if(storage.power == "on"){
	window.timeoutCheck = setTimeout(doCheck,parseInt(storage.interval) * 60 * 1000);
}
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
    if(request == "save" || request == "power"){
		
		window.storage = JSON.parse(window.localStorage.steamAutoIgnore);
		
		if(typeof window.timeoutCheck !== "undefined" || storage.power == "off"){
			clearTimeout(window.timeoutCheck);
			window.timeoutCheck = undefined;
		}
		if(storage.power == "on"){
			window.timeoutCheck = setTimeout(doCheck,parseInt(storage.interval) * 60 * 1000);
		}
		
	}
    sendResponse({saved:true});
});
