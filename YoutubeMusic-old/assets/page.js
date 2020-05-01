let win = require("electron").remote.getCurrentWindow();

function parseMsg(e){
    let msgstring = "window-youtubemusic-",
        message = e.channel;

    if(message === msgstring + "close") win.close();
    else if(message === msgstring + "mini") win.minimize();
    else console.log(message);
}

window.onload = function(){
    let main = document.querySelector(".main");
    
    main.innerHTML = `
        <webview src="https://music.youtube.com" preload="${__dirname + "\\youtube.js"}"></webview>
    `;

    let webview = document.querySelector("webview");
    webview.addEventListener("ipc-message", parseMsg);
};
