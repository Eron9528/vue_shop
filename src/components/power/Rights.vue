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
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">
            <el-row :gutter="20 ">
              <el-col :span='7'>
                <!-- 搜索框，按钮，在同一行 -->
                <el-input placeholder="请输入权限名称" v-model='queryInfo.query' clearable @clear='getMeunList()'>
                  <el-button slot="append" icon="el-icon-search" @click="getMeunList()"></el-button>
                </el-input>
              </el-col>
              <el-col :span='4'>
                <el-button type='primary' @click="addDialogVisible = true">添加权限</el-button>
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
      data: [
        {
          label: '目录',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  // 页面加载方法
  created() {
    this.getRightList()
  },

  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get('rights/rights')
      if (res.status !== 202) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightList = res.data
      console.log(res)
    },
    // 点击树节点方法
    handleNodeClick(data) {
      console.log('点击节点触发函数' + data)
    },
    getMeunList() {
      console.log('获取本级权限')
    }
  }
}
</script>

<style lang="less" scoped>
.table-el {
  margin-top: 15px;
}

</style>
