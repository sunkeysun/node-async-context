/**
 * 异步上下文模块入口
 *
 * @author: sunkeysun
 */
const ah = require('async_hooks')
const context = require('./lib/_context')

function init(asyncId, type, triggerAsyncId) {
    const triggerContext = context.getByAsyncId(triggerAsyncId)

    if (triggerContext) {
        context.setByAsyncId(asyncId, triggerContext)
    }
}

function destroy(asyncId) {
    context.destroyByAsyncId(asyncId)
}

// hook 为单例子
let hook = null

module.exports = {
    create() {
        if (hook) {
            throw new Error('context has been created !')
        }
        hook = ah.createHook({ init, destroy })
        hook.enable()

        return context
    },
}
