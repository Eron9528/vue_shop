<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type='primary' @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border style="width: 100%" class="roletable">
        <el-table-column type="index"></el-table-column>
        <el-table-column v-model="rolesList.roleName" prop="roleName" label="角色名称" width="380">
        </el-table-column>
        <el-table-column v-model="rolesList.roleDesc" prop="roleDesc" label="角色描述" width="740">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="380%">
          <template slot-scope='scope'>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" size='mini' @click="editRolesDialog(scope.row.id)">编辑</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteRole(scope.row.id)">删除</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top-start">
              <el-button type="warning" icon="el-icon-setting" size='mini'>分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 定义角色列表容器
      rolesList: []
    }
  },

  created() {
    this.getRolesList()
  },

  methods: {
    // 获取角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('/roles/roles')
      console.log(res)
      if (res.status !== 202) {
        return this.$message.error('获取角色失败')
      }
      this.rolesList = res.data
    },
    // 编辑角色
    editRolesDialog(id) {},

    deleteRole(id) {}
  }
}
</script>

<style lang="less" scoped>
.roletable {
  margin-top: 15px;
}
</style>
