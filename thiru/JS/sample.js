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
let counterIncrementer = counterObj[0];
let accessCounter = counterObj[1];

counterIncrementer();
console.log(accessCounter());
counterIncrementer();
console.log(accessCounter());
counterIncrementer();
console.log(accessCounter());