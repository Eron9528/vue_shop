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
      <el-table :data="rightList" border style="width: 100%">
          <el-table-column type="index"></el-table-column>
        <el-table-column v-model="rightList.permissionName" prop="permissionName" label="权限名称" width="380">
        </el-table-column>
        <el-table-column v-model="rightList.menu" prop="menu" label="路径" width="740%">
        </el-table-column>
        <el-table-column prop="address" label="权限等级" width="380%">
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>
export default {
  data() {
    return {
      // 定义接受权限列表的容器
      rightList: []
    }
  },
  // 页面加载方法
  created() {
    this.getRightList()
  },

  methods: {
    async  getRightList() {
      const { data: res } = await this.$http.get('rights/rights')
      if (res.status !== 202) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightList = res.data
      console.log(res)
    }
  }

}
</script>

<style lang="less" scoped>
</style>
