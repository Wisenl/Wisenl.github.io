const w_promise = require('./promise_03');

let p_start = true;
let p_answer = 'answer:' + p_start;
let p_w = new w_promise.w_promise((resolve, reject) => {
    setTimeout(() => {
         p_start ? resolve(p_answer) : reject(p_answer)
    }, 0)
});
p_w.then((res_val) => {
    console.log(res_val, this)
    return 'good!'
}, (rej_val) => {
    console.log(rej_val)
});

// let start = true
// let answer = 'answer:' + start
//
//
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//        return start ? resolve(answer) : reject(answer)
//     }, 2000)
// })

// p1.then((answer) => {
//     console.log('resolve' + answer)
//     // return new Promise(() => {})
// }).then((res) => {
//     console.log(res)
// })
