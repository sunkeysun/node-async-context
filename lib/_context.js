/**
 * 上下文对象
 *
 * @author: sunkeysun
 */

const ah = require('async_hooks')
const _ = require('lodash')

module.exports = {
    _context: {},

    _getAsyncId() {
        const asyncId = ah.executionAsyncId()
        return asyncId
    },

    get(key) {
        const asyncId = this._getAsyncId()

        return _.get(this._context, `${asyncId}.${key}`)
    },

    set(key, val) {
        const asyncId = this._getAsyncId()

        return _.set(this._context, `${asyncId}.${key}`, val)
    },

    del(key) {
        const asyncId = this._getAsyncId()
        return _.unset(this._context, key)
    },

    destroy() {
        const asyncId = ah.executionAsyncId()
        const asyncContext = this.getByAsyncId(asyncId)

        if (asyncContext) {
            _.each(this._context, (ctx, asyId) => {
                if (ctx === asyncContext) {
                    this.destroyByAsyncId(asyId)
                }
            })
        }
    },

    getByAsyncId(asyncId) {
        return _.get(this._context, asyncId)
    },

    setByAsyncId(asyncId, context) {
        return _.set(this._context, asyncId, context)
    },

    destroyByAsyncId(asyncId) {
        return _.unset(this._context, asyncId)
    },

    run(cb) {
        process.nextTick(cb)
    },
}
