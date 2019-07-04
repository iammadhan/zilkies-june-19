function increment() {
    let counter = 0;
    return [
        function counterIncrementer() {
            ++counter;
        },
        function accessCounter() {
            return counter;
        }
    ];
}
let counterObj = increment();
let incrementer = counterObj[0];
let access = counterObj[1];
let blocksList = [];


function handleClick() {
    let stackContainer = document.getElementById("stack");

    incrementer();
    let counter = access();
    if (counter < 6) {
        let block = document.createElement("div");
        let textNode = document.createTextNode(counter);
        block.setAttribute("class", "block");
        block.setAttribute("id", "block-" + counter)
        blocksList.push("block-" + counter);
        block.appendChild(textNode);
        stackContainer.appendChild(block);
    } else {
        // console.log(blocksList);
        let block = document.getElementById("stack");
        for (let i = 0; i < blocksList.length; i++) {
            // console.log(blocksList[i]);
            let child = document.getElementById(blocksList[i]);
            // console.log(child);
            block.removeChild(child);
        }
        blocksList = arrayRotate(blocksList);
        for (let i = 0; i < blocksList.length; i++) {
            // console.log(blocksList[i]);
            let child = document.createElement("div");
            let textNode = document.createTextNode(blocksList[i][blocksList[i].length - 1]);
            child.setAttribute("class", "block");
            child.setAttribute("id", blocksList[i])
            child.appendChild(textNode);
            // console.log(child);
            block.appendChild(child);
        }
    }

}

function arrayRotate(arr) {
    arr.push(arr.shift());
    // console.log(arr);
    return arr;
}