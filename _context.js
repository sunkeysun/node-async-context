const ah = require('async_hooks')
/**
 * 上下文对象
 *
 * @author: sunkeysun
 */
module.exports = {
    _context: {},

    get(key) {
        const eid = ah.executionAsyncId()
        if (!this._context[eid]) {
            return null
        }

        return this._context[eid][key]
    },

    set(key, val) {
        const eid = ah.executionAsyncId()
        if (!this._context[eid]) {
            this._context[eid] = {}
        }

        this._context[eid][key] = val
        return true
    },

    getByAsyncId(asyncId) {
        return this._context[asyncId]
    },

    setByAsyncId(asyncId, context) {
        this._context[asyncId] = context
        return true
    },

    destroyByAsyncId(asyncId) {
        delete this._context[asyncId]
    },
}
