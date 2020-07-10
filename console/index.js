(function(){

    function $(_){return document.querySelectorAll(_)}

    let content = $(".content")[0],
        textarea = $("textarea")[0],
        selector = "root@third:~$ ",
        length = selector.length,
        hover = $(".hover")[0],
        focused = false,
        key;

    hover.innerHTML = selector.replace(/ /g, "&nbsp;");
    textarea.value = selector;

    function escape(a) {
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return a.replace(/[&<>"']/g, function(m){return map[m]});
    }

    function insert(e){
        content.insertBefore(e, textarea.parentNode);
    }

    function inserttext(e){
        let par = document.createElement("div");
        par.className = "line";
        par.innerText = e;
        insert(par);
    }

    function execute(){
        let comm = textarea.value.replace(selector, "").trim(),
            div = document.createElement("div"),
            command = comm.split(" ")[0];

        div.className = "command";
        div.innerHTML = "<span class=\"selector\">" + selector + "</span>" + escape(comm);

        insert(div);

        if(command === "start"){
            inserttext("I'm Ioan, a student living in Romania. Mostly doing programming, listening to music, gaming and whatnot. Huge technology and bass addict, messing with different aspects of programming and design, working with efficiency and minimalism in mind.");
        }
        else if(command === "contact"){}
        else if(command === "help"){
            inserttext("Available commands:\n\n-> start\n\t");
        }
        else if(comm !== ""){
            inserttext("\"" + command + "\" is not a valid command. Try typing \"help\" to find what commands are available.");
        }

        textarea.value = selector;
    }

    function size(){
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    function onscroll(){
        textarea.scrollTop = 0;
    }

    function onfocus(){
        focused = true;
    }

    function onblur(){
        focused = false;
    }

    function onkeydown(e){
        if(!focused) return;

        key = e.keyCode;

        if(key === 37){
            e.preventDefault();
            if(textarea.selectionStart > length) textarea.setSelectionRange(textarea.selectionStart - 1, textarea.selectionStart - 1);
        }
        else if((key === 8 && textarea.selectionStart < length + 1) || key === 38 || key === 40){
            e.preventDefault();
        }
        else if(key === 13){
            e.preventDefault();
            execute();
        }

        size();
    }

    function onclick(e){
        if(textarea.selectionStart < length){
            e.preventDefault();
            textarea.setSelectionRange(length, length);
        }

        size();
    }

    textarea.addEventListener("focus", onfocus);
    textarea.addEventListener("blur", onblur);
    textarea.addEventListener("click", onclick);
    textarea.addEventListener("scroll", onscroll);
    window.addEventListener("keydown", onkeydown);
    window.addEventListener("contextmenu", (e) => {e.preventDefault()});

    textarea.focus();

})();
