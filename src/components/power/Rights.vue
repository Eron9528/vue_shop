<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card class="box-card">
      <el-row>
        <!--  树形图表示权限结构 -->
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-tree :data="RoleTreeData" @check="removeOtherNode" :props="defaultProps" ref="treeRef" show-checkbox :highlight-current="true" :check-strictly="true" node-key="menuId" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
          </div>
        </el-col>
        <el-col :span="20">

          <!-- 添加一级权限 -->
          <div class="grid-content bg-purple-light">
            <el-row :gutter="20 ">
              <el-col :span='7'>
                <!-- 搜索框，按钮，在同一行 -->
                <el-input placeholder="请输入权限名称" v-model='queryInfo.query' clearable @clear='getMeunList()'>
                  <el-button slot="append" icon="el-icon-search" @click="getMeunList()"></el-button>
                </el-input>
              </el-col>
              <el-col :span='4' v-show="layer1">
                <el-button type='primary' @click="addDialogVisible = true">添加一级权限</el-button>
              </el-col>
              <el-col :span='4' v-show="layer2">
                <el-button type='primary' @click="addDialogVisible = true">添加二级权限</el-button>
              </el-col>
              <el-col :span='4' v-show="layer3">
                <el-button type='primary' @click="addDialogVisible = true">添加三级权限</el-button>
              </el-col>
            </el-row>
            <!-- 权限循环列表 -->
            <el-table :data="rightList" border style="width: 100%" class="table-el">
              <el-table-column type="index"></el-table-column>
              <el-table-column v-model="rightList.permissionName" prop="permissionName" label="权限名称" width="350">
              </el-table-column>
              <el-table-column v-model="rightList.menu" prop="menu" label="路径" width="600%">
              </el-table-column>
              <el-table-column prop="address" label="权限等级" width="350%">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close='addFormClose'>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="权限名称" label-width="130px" prop="permissionName">
          <el-input v-model="addForm.permissionName"></el-input>
        </el-form-item>
        <el-form-item label="权限路径" label-width="130px" prop="menu">
          <el-input v-model="addForm.menu"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRight()">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      // 定义接受权限列表的容器
      rightList: [],
      // 搜索用户
      queryInfo: {
        query: ''
      },
      // 树形图结构
      RoleTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'lable'
      },
      // 添加第一层权限是否显示
      layer1: false,
      layer2: false,
      layer3: false,
      // 添加权限弹窗
      addDialogVisible: false,
      // 添加表单数据
      addForm: {},
      // 验证添加表单数据
      addFormRules: {
        permissionName: [
          { require: true, message: '请添加权限名称', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '角色名称的长度应该在2到1个字符之间',
            trigger: 'blur'
          }
        ],
        menu: [
          { require: true, message: '请添加路径', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '角色名称的长度应该在2到20个字符之间',
            trigger: 'blur'
          }
        ]
      },
      // 点击按钮获取索要添加节点的状态
      treeNode: {},
      listQuery: []
    }
  },
  // 页面加载方法
  created() {
    // 得到本机
    this.getRightList()
    this.getRightTree()
  },

  methods: {
    // 得到权限列表
    async getRightList() {
      const { data: res } = await this.$http.get('rights/rights')
      if (res.status !== 202) {
        return this.$message.error('获取权限列表失败')
      }
      // 将第一层设为显示
      this.layer1 = true
      this.rightList = res.data
      console.log(this.rightList)
    },

    // 得到权限tree数据
    async getRightTree() {
      const { data: res } = await this.$http.get('rights/getRightsTree')
      if (res.status !== 202) {
        return this.$message.error('获取权限列表失败')
      }
      // 将数据赋值到中转数组
      this.RoleTreeData = res.data
    },
    // 点击树节点方法
    async handleNodeClick(data) {
      console.log('点击节点触发函数' + data.menuId)
      const { data: res } = await this.$http.get(
        'rights/getRightsByMenuId/' + data.menuId
      )
      if (res.status !== 202) {
        this.$message.error('获取权限信息失败')
      }
      this.rightList = res.data
      // 刷新右侧的权限菜单，
      // 根据层级替换table 框，
      // 点击一级的时候，显示添加一级目录， 点击二级的时候，显示添加二级目录
      console.log(data.layer)
      if (data.layer === 1) {
        this.layer1 = false
        this.layer2 = true
        this.layer3 = false
      } else if (data.layer === 2) {
        this.layer1 = false
        this.layer2 = false
        this.layer3 = true
      } else if (data.layer === 3) {
        // 预留
      }
    },
    getMeunList() {
      console.log('获取本级权限')
    },
    // 关闭添加权限模态框
    addFormClose() {
      this.addDialogVisible = false
    },
    async addRight() {
      // 判断是添加那一层，如果树形图没有被选中，则是添加第一层，
      // 如果选中，则获取menuId 添加对应的下层的权限
      this.treeNode = this.$refs.treeRef.getCheckedNodes()[0]
      // 如果是undefined 说明是添加第一层
      if (this.treeNode === undefined) {
        const { data: res } = await this.$http.post('rights/addNode/' + 0, {
          permissionName: this.addForm.permissionName,
          menu: this.addForm.menu
        })
        if (res.status !== 202) {
          this.$message.error('添加权限出错')
        }
        this.$message.success('添加权限成功')
      } else {
        const { data: res } = await this.$http.post(
          'rights/addNode/' + this.treeNode.menuId,
          {
            permissionName: this.addForm.permissionName,
            menu: this.addForm.menu
          }
        )
        if (res.status !== 202) {
          this.$message.error('添加权限出错')
        }
        this.$message.success('添加权限成功')
      }
    },
    // 当点击一个节点的时候去掉其他的节点
    removeOtherNode(data, checked) {
      // 保留本层对应的添加
      if (data.layer === 1) {
        this.layer1 = false
        this.layer2 = true
        this.layer3 = false
      } else if (data.layer === 2) {
        this.layer1 = false
        this.layer2 = false
        this.layer3 = true
      } else if (data.layer === 3) {
        // 预留
      }
      if (checked) {
        this.listQuery.menuId = data.menuId
        this.$refs.treeRef.setCheckedKeys([data.menuId], true)
      } else {
        this.listQuery.menuId = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-el {
  margin-top: 15px;
}
</style>
