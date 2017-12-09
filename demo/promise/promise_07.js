class W_Promise {
    constructor (executor) {
        this.status = 'padding'
        this.resolve = (val) => {
            this.status = 'resolved'
            this.value = val
        }
        this.reject = (val) => {
            this.status = 'rejected'
            this.value = val
        }
        executor(this.resolve, this.reject)
    }

    then (resolved, rejected) {
        if ( this.status === 'resolved' ) {
            resolved(this.value)
        }
        if ( this.status === 'rejected') {
            rejected(this.value)
        }
    }
}

exports.w_promise =  W_Promise