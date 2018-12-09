/**
 * 异步上下文模块入口
 *
 * @author: sunkeysun
 */
const ah = require('async_hooks')
const context = require('./_context')

function init(asyncId, type, triggerAsyncId) {
    const triggerContext = context.getByAsyncId[triggerAsyncId]
    if (triggerContext) {
        context.setByAsyncId(asyncId, triggerContext)
    }
}

function destroy(asyncId) {
    context.destroyByAsyncId(asyncId)
}

let hook = null

module.exports = {
    createContext() {
        if (hook) {
            throw new Error('context has been created !')
        }
        hook = ah.createHook({ init, destroy })
        hook.enable()

        return context
    },

    wrap(cb) {
        process.nextTick(cb)
    },

    enable() {
        hook.enable()
    },

    disable() {
        hook.disable()
    },
}
