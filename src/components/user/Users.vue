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
            <el-switch v-model='scope.row.state'>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size='mini'
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size='mini'
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top-start"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size='mini'
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page='this.queryInfo.pagenum'
          :page-sizes="[1, 2, 5, 10]"
          :page-size='this.queryInfo.pagesize'
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
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
      total: 1
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
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newChange) {
      this.queryInfo.pagenum = newChange
      this.getUserList()
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
