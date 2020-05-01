    let fontsincr = 0,
        fontslength = 0;

    function fontsready(name){
        let div = document.createElement("div"),
            width,
            height;

        function fontscheck(){
            if(width !== div.offsetWidth || height !== div.offsetHeight){
                fontsincr++;
                document.body.removeChild(div);

                if(fontsincr == fontslength){
                    observer.disconnect();
                    loaded();
                }
            }
        }

        let observer = new MutationObserver(fontscheck);
        div.style.cssText = "position:absolute;left:-9999px;top:-9999px;font-family:-serif;display:inline-block;height:auto;width:auto;white-space:nowrap;margin:0;padding:0;font-variant:normal;font-size:300px;line-height:normal;";
        div.innerHTML = "BSEsbywgItTiWG@!-#/";
        document.body.appendChild(div);
        width = div.offsetWidth;
        height = div.offsetHeight;
        observer.observe(div, {
            attributes: true
        });
        delay(function(){
            div.style.fontFamily = '"' + name + '"';
        });
    }

    function fontsload(){
        let args = [].slice.call(arguments);
        fontslength = args.length;
        for(let i = 0; i < args.length; i++) fontsready(args[i]);
    }
