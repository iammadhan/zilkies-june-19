
function logic() {
    var click = n()
    if (click < 10) {
        var node = document.getElementById("left-list").firstChild
        var list = document.getElementById("right-list")
        list.insertBefore(node, list.childNodes[0])
        click++;
    } else {
        var currentList = document.getElementById("right-list")
        var nodeCurr = currentList.lastChild
        currentList.style.backgroundColor = "lightyellow"
        currentList.style.borderRadius = "8px"
        currentList.style.boxShadow = "0 2px 2px 0 rgba(0, 0, 0, .14)"
        currentList.insertBefore(nodeCurr, currentList.childNodes[0])
    }
}

var counter = (function() {
    var clicks = 0;
    return (function() {
        return clicks++;
    })
})

var n = counter()