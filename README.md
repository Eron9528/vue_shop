#### 21-1-3
 * 搭建前端页面
   - 利用elememnt.js 搭建

#### 21-1-4
 * axios发送请求

#### 21-1-7 
 * 后台主页，导航菜单，布局

#### 21-1-9 
 * 后台获取菜单栏，遍历赋值，点击折叠，菜单栏美化

#### 21-1-10
 * 用户表单获取

#### 21-1-11 
 * 自定义插槽  实现操作列的效果

#### 21-1-12 
 * 后台发送restFul 风格请求修改用户状态

#### 21-1-13
 * 添加用户表单，弹出添加页面

#### 21-1-14
 * 加入表单验证
 * 加入关闭重置表单
 * 加入发起请求前的预校验判断

#### 21-1-15
 * 添加新用户后
 * 修改用户对话框

#### 21-1-16
 * 提交修改用户表单
 * 删除用户 

#### 21-1-17
 * 通过路由展示权限列表
 * 加入权限页面面包屑导航和卡片视图
 * 调用API 获取权限列表
 * 渲染权限列表UI 结构     
 * 通过路由展示角色列表
 * 绘制基本布局结构并获取列表数据
 * 渲染角色列表数据

#### 21-1-18
 * 所用于分配给角色的权限，由于没有创建功能，现在使用树形图添加的方式补充上

#### 21-1-20
 * 点击权限树形图刷新对应的表单页面

#### 21-1-21
 * 弄懂tree 数据怎么绑定
 * 后台一直没弄通，网上找了一个权限树的结构，但是查询一直有问题

#### 21-1-22
 * 调试后台，请求后台发送的树形权限数据

#### 21-1-23
 * 后台可以发送树形数据，但是格式是类内嵌类。需要取出来对应的值然后赋值给Tree
 * 经过修改的后台，按照tree 要求的格式把树的值传到前端
 * 三层权限表格，通过点击树形结构只显示添加本层权限的表格， 通过v-show 可以控制div 显示或隐藏
 * 点击树通过menuId 获取本层的下级权限
 * 进入权限页面后添加的就是第一层，当点击第一层就会变成添加本层的下一层的按钮
 * 权限添加页面， 权限校验

#### 21-1-24
 * 定义from 数据如果用[] 则为数组，{} 则为对象
 * 添加的时候只选择一个，选中一个，去掉其他的
 * 添加按钮提交信息到后台
 * 如果添加的是第一层直接把0 当作upId 当作参数传到后台，如果是其他的情况把menuId 当作id 上传回去
 * 编写后台添加方法
 * 必须点击单选框选中才可以添加

#### 21-1-25
 * 现在可以自由添加权限，前台没有做修改删除，直接在数据库做修改删除操作
 * 修改原来写死的菜单， 动态绑定到自己添加的权限树结构
 * 测试提交
 * 通过github fork 项目后可以先提交fork 的项目，然后再merge到原来的项目。后台代码没有fork ，前台通过fork 的项目提交
 * 添加日历权限，导入和展示的vue 页面
 * 添加element 日历
 * 添加搜索框，根据名字搜索对应员工的工作排班
 * 添加上传文件组件

#### 21-1-26
 * 加入排版表，日历表，增加图片删除图片后台方法
 
#### 21-1-27 
 * 新建视图对排班表的每天的信息汇总到月，通过查询日历可以把本月的信息直接显示到日历(没搞出来，同一月份的记录排不到一列)
 * 通过for 循环渲染第一级角色的权限信息
 * 美化一级权限的UI 结构
 * 通过for 循环渲染第二级角色的权限信息

 #### 21-1-28
 * 将原来的后台获取两层权限修改为三层，添加删除权限的方法，和分配权限按钮弹出框中的树结构
 * 点击删除按钮弹出对话框
 *




 
