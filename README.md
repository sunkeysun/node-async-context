# node 异步上下文容器

## 容器 Api
#### create() (应用启动时只需要调用一次, 重复调用会抛出异常)
创建异步上下文容器
```
    const asyncContext = require('node-async-context')
    process.context = asyncContext.create()
```

## 实例 Api

#### set(key, val)
设置当前异步上下文的值
```
    process.context.set('demoKey', 'demoValue')
```

#### get(key)
获取当前异步上下文的值
```
    const value = process.context.get('demoKey')
```

### del(key)
删除当前异步上下文的值
```
    process.context.del('demoKey')
```

### destory() (在请求结束前(尾中间件)务必调用销毁，否则一些异步类型(如Promise)会引起内存泄漏)
销毁当前异步上下文
```
    process.context.destroy()
```

#### getByAsyncId (不常用)
获取当前异步上下文
```
    const ah = require('async_hooks')

    const asyncId = ah.executionAsyncId()
    const currentContext = process.context.getByAsyncId(asyncId)
```

#### setByAsyncId (不常用)
设置当前异步上下文
```
    const ah = require('async_hooks')

    const asyncId = ah.executionAsyncId()
    process.context.setByAsyncId(asyncId, { demoKey: 'demoValue' })
```

#### destroyByAsyncId (不常用)
销毁当前异步上下文
```
    const ah = require('async_hooks')

    const asyncId = ah.executionAsyncId()
    process.context.destroyByAsyncId(asyncId)
```

#### run(cb) (其中 cb 是回调函数)
运行一个新的异步上下文
```
    const express = require('express')
    const app = express()

    app.use((req, res, next) => {
        process.context.run(next)
    })
```