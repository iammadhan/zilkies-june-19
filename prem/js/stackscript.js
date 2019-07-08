let counter = 0;
function stackUp() {

    let divContainer = document.createElement("div");
    if (counter < 5) {
        counter++;
        let node = document.createTextNode(counter);
        divContainer.appendChild(node);

        let classname = "box box" + counter;

        divContainer.setAttribute("class", classname);

        let element = document.getElementById("stack");
        element.appendChild(divContainer);

        if(counter===5)
        {
            document.getElementById("submit").textContent="SWAP";
            document.getElementById("note").style.display="block";
        }
    }
    else {
        var top = document.getElementById("stack").lastElementChild;

        var bottom = document.getElementById("stack").firstElementChild;
        top.after(bottom);
    }


}