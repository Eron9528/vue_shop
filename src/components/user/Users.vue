<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>

    </el-breadcrumb>

    <el-card class="box-card">

      <el-row :gutter="20 ">
        <el-col :span='7'>
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>

        </el-col>
        <el-col :span='4'>
          <el-button type='primary'>添加用户</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="userList"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="id"
          label="用户id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
        >
          <template slot-scope='scope'>
            <el-switch
              v-model='scope.row.state'
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.status !== 202) return this.$message.error('获取用户失败')
      this.userList = res.data
      console.log(res.data)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 10px;
}
</style>
