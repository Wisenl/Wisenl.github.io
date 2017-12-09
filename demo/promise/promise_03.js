class W_Promise {
    constructor (executor) {
        this.status = 'padding'
        this.resolve = (val) => {
            setTimeout(() => {
                this.status = 'resolved'
                this.resolved(val)
            }, 0)
        }
        this.reject = (val) => {
            setTimeout(() => {
                this.status = 'rejected'
                this.rejected(val)
            }, 0)
        }
        executor(this.resolve, this.reject)
    }

    then (resolved, rejected) {
        let x
        this.resolved = (val) => {
            x = resolved(val)
        }
        this.rejected = (val) => {
            x = rejected(val)
        }
        return new W_Promise(() => {})
    }
}

exports.w_promise =  W_Promise