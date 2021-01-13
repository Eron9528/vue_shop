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
          <el-input placeholder="请输入内容" v-model='queryInfo.query' clearable @clear='getUserList()'>
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>

        </el-col>
        <el-col :span='4'>
          <el-button type='primary' @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="用户id" width="180">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope='scope'>
            <el-switch v-model='scope.row.state' @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" size='mini'></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" size='mini'></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top-start">
              <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='this.queryInfo.pagenum' :page-sizes="[1, 2, 5, 10]" :page-size='this.queryInfo.pagesize' layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="用户名" label-width="70px" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

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
      total: 1,
      dialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: ''
      },
      // 添加表单验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名称的长度应该在3到10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '用户名称的长度应该在6到16个字符之间', trigger: 'blur' }
        ]
      }
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
    },
    // 监听swtich 状态的改变
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/${userInfo.state}`
      )
      if (res.status !== 202) {
        this.userInfo.state = !userInfo.state
        return this.$message.error('更新状态失败')
      }
    },
    // 根据名称搜索用户
    async findUser(username) {
      const { data: res } = await this.$http.get(`getUserByName/${username}`)
      console.log(res)
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
