var logs = [{"id": "19", "date": "2019-07-20", "remain": "5", "hours": "3", "username": "Ashwin"}, 
{"id": "20", "date": "2019-07-20", "remain": "3", "hours": "2", "username": "Ashwin"}, 
{"id": "21", "date": "2019-07-20", "remain": "2", "hours": "1", "username": "Ashwin"}, 
{"id": "22", "date": "2019-07-20", "remain": "1", "hours": "1", "username": "Ashwin"}]

var editCount = 0
var hours = 4
var iterId = 19
var prevRemain

logs.forEach(data => {
    if(data.id == iterId && data.date == "2019-07-20" && data.username == "Ashwin") {
        prevRemain = parseInt(data.remain) + parseInt(data.hours)
        editCount++
    }else if(data.date == "2019-07-20" && data.username == "Ashwin") {
        if(editCount != 0) {
            data.remain = parseInt(prevRemain) - parseInt(data.hours)
            prevRemain = parseInt(data.remain)
        }
    }
});

console.log(logs)

// logs.forEach((data) => {
//     if(editCount == 0) {
//         prevRemain = data.remain
//     }
//     if(data.id == iterId && data.date == "2019-07-20" && data.username == "Ashwin") {
//         if(editCount == 0) {
//             data.remain = 8 - hours
//             prevRemain = data.remain
//             data.hours = hours
//             // console.log(editCount)
//         }else {
//             data.remain = prevRemain - hours
//             prevRemain = data.remain
//             data.hours = hours
//             // console.log(editCount)
//         }
//     }else if(editCount != 0 && data.date == "2019-07-20" && data.username == "Ashwin") {
//         data.remain = prevRemain - data.hours
//         prevRemain = data.remain
//         console.log(editCount)
//     }
//     editCount++
// })
// console.log(logs)