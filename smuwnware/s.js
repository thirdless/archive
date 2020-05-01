"use strict";
var icon_map = {
	"image" : "assets/icons/file-picture.png",
	"file" : "assets/icons/file-text.png",
	"code" : "assets/icons/file-code.png",
	"sound" : "assets/icons/file-sound.png",
	"video" : "assets/icons/file-video.png",
	"game" : "assets/icons/gamepad.png",
	"terminal" : "assets/icons/terminal.png",
	"link" : "assets/icons/file-link.png",
	"contact" : "assets/icons/bubblesa-alt.png",
	"dir" : "assets/icons/folder.png",
	"sound-p" : "assets/icons/music.png",
	"browser" : "assets/icons/globe.png"
},
	path = {
		Desktop : [
			{
				type : "dir",
				name : "Music",
				content : [
					{
						type : "sound",
						name : "Music",
						url : ""
					}
				]
			}
		]
	},
	
	engine = {};
