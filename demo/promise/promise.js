class W_Promise {
    constructor (executor) {
        let _this = this
        _this.status = 'pending'
        _this.value = undefined;
        this.resolve = (x) => {
            if (this === x) {
                this.status = 'fulfilled'
            }
            if ((typeof x === 'object' || typeof x === 'function') && typeof x.then === 'function') {
                this.then = x.then
            }
            this.status = 'fulfilled'
            this.value = x
        };
        this.reject = (val) => {
            this.status = 'rejected'
            this.value = val
        }
        executor(this.resolve, this.reject)
    }

    then (resolved, rejected) {
        // 如果两个参数不是函数，则被忽略
        let fun_res = typeof resolved === 'function' ? resolved : () => {};
        let fun_rej = typeof rejected === 'function' ? rejected : () => {};
        //  1. fulfilled / rejected 后调用，只能调用一次 2. 第一个参数是promise的值

        if ( this.status === 'fulfilled' ) {
            fun_res(this.value)
        }
        if ( this.status === 'rejected') {
            fun_rej(this.value)
        }
        return new W_Promise(() => {})
    }
}

exports.w_promise =  W_Promise