# node-async-context

node 异步上下文管理
### module api

#### createContext
创建 context

#### wrap(cb) (其中 cb 会回调函数)
包装异步函数，避免异步对象复用，造成上下文冲突

#### enable (不常用)
启动 context

#### disable (不常用)
禁用 context

### context api
#### get(key)
获取当前异步上下文的值

#### set(key, val)
设置当前异步上下文的值

#### getByAsyncId (不常用)
获取当前异步上下文

#### setByAsyncId (不常用)
设置当前异步上下文

#### destroyByAsyncId (不常用)
销毁当前异步上下文