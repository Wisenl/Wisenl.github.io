视图 State 规划

1. 在请求服务器数据时，显示 “加载中” 弹窗或图标，并设置图层中断 UI 操作

   虽然在产品角度，强制打断用户的操作不是合理的方式，但是依然会遇到这个需求

   在设置 store 中的 state 时需要考虑，可以将该字段放入UI层。

   另外，由于请求过程是异步的，可以进一步考虑将其与**网络请求模块**封装在一起，只提供是否显示‘加载’的参数，降低程序耦合

   ```Json
   store: {
     UI: {
       loading: true    // 弹窗
     }
     Data: {
       a: 1,
     	b: 2
     }
   }
   ```

2. 页面滚动位置

   在遇到列表页的时候，记录页面滚动位置可以很好的提升产品使用性。与此同时，如果是分页加载的话也需要缓存列表数据。

   ```json
   store: {
     UI: {
       loading: true    // 弹窗
       scrollLoaction: 0   // 滚动位置
     }
     Data: {
       a: 1,
     	b: 2，
     	listArr: [xxx,xxx,xxx]   // 列表数据
     }
   }
   ```

3. 用户数据

   应用内获取到用户相关数据（从服务器请求，或者在本地设备持久化数据中获取到），可以在store中存放

   ```Json
   store: {
     UI: {
       loading: true    // 弹窗
       scrollLoaction: 0   // 滚动位置
     },
     UserInfo: {
       name: 'Wisen',
       avatar: 'http://wisenl.png'
     }
     Data: {
       a: 1,
     	b: 2，
     	listArr: [xxx,xxx,xxx]   // 列表数据
     }
   }
   ```

4. ​