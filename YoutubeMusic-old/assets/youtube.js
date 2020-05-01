window.onload = function(){

    let { ipcRenderer } = require('electron'),
        ipc = ipcRenderer;

    let backBtn = document.createElement('paper-icon-button');
    backBtn.setAttribute('icon', 'arrow-back');
    backBtn.setAttribute('id', 'backButton');
    backBtn.setAttribute('class', 'x-scope paper-icon-button-0');
    backBtn.style = "position:relative;right:-8px;top:0px;width:48px;height:48px;opacity:1;transition:opacity .2s ease-in-out";

    let pivotBar = document.querySelector('ytmusic-pivot-bar-renderer');
    pivotBar.insertBefore(backBtn, pivotBar.firstChild);

    let miniBtn = document.createElement('paper-icon-button');
    miniBtn.setAttribute('icon', 'arrow-downward');
    miniBtn.setAttribute('id', 'miniButton');
    miniBtn.setAttribute('class', 'x-scope paper-icon-button-0');
    miniBtn.style = "position:relative;margin-left:20px;width:26px;height:26px;opacity:1;transition:opacity .2s ease-in-out;padding:0;";

    let settingsBar = document.querySelector('ytmusic-settings-button');
    settingsBar.appendChild(miniBtn, settingsBar.firstChild);

    let closeBtn = document.createElement('paper-icon-button');
    closeBtn.setAttribute('icon', 'close');
    closeBtn.setAttribute('id', 'closeButton');
    closeBtn.setAttribute('class', 'x-scope paper-icon-button-0');
    closeBtn.style = "position:relative;margin-left:20px;width:26px;height:26px;opacity:1;transition:opacity .2s ease-in-out;padding:0;";

    settingsBar.appendChild(closeBtn, settingsBar.firstChild);

    function postmsg(e){
        let msg = "window-youtubemusic-";

        if(e.currentTarget === miniBtn) msg += "mini";
        else if(e.currentTarget === closeBtn) msg += "close";

        ipc.sendToHost(msg);
    }

    function back(){
        history.back();
    }

    miniBtn.addEventListener("click", postmsg);
    closeBtn.addEventListener("click", postmsg);
    backBtn.addEventListener("click", back);

};
