function homesetnext(element, time){
        homenexttime = time;

        let div = createElement();
            parent = querySelector(element, "div");

        div.className = "spinner";
        div.innerHTML = '<svg viewBox="0 0 100 100"><path d="M 90, 50 a 40,40 0 1,1 -80,0 a 40,40 0 1,1 80,0"/></svg>';

        let svg = querySelector(div, "svg");
        homenextcircle = querySelector(svg, "path");

        parent.appendChild(div);
        document.documentElement.style.setProperty("--stroke-length", homenextcircle.getTotalLength() + "px");

        element.addEventListener("mouseenter", homenextstart);
        element.addEventListener("mouseleave", homenextstop);
    }
