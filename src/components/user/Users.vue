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
          <el-button type='primary' @click="addDialogVisible = true">添加用户</el-button>
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
        <el-table-column label="操作">56
          <template slot-scope='scope'>
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" size='mini' @click="editUserDailog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteUser(scope.row.id)"></el-button>
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

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close='addFormClose'>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="用户名" label-width="70px" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="70px" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <span slot="footer" class="dialog-footer">
        <el-form ref="editFormRef" :model="editForm" :rules="editFormRules " label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="editConsole()">取 消</el-button>
        <el-button type="primary" @click="editUserInfo()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 1,
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: 'xiao',
        password: 'xiaoxiao',
        email: '1122211@qq.com',
        phone: '15822223333'
      },
      // 添加表单验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名称的长度应该在3到10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '用户名称的长度应该在6到16个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
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
    },
    addFormClose() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('adduser', this.addForm)
        if (res.status !== 202) {
          return this.$message.error('添加用户失败')
        }
        this.addDialogVisible = false
        this.$message.success('添加用户成功')
        this.getUserList()
      })
    },
    // 弹出修改对话框
    async editUserDailog(id) {
      const { data: res } = await this.$http.get('getUser/' + id)
      console.log(res)
      if (res.status !== 202) {
        return this.$message.error('打开用户失败')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },

    // 关闭修改弹出框
    editConsole() {
      this.editDialogVisible = false
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户的数据请求
        const { data: res } = await this.$http.put(
          'updateUser/' + this.editForm.id,
          {
            email: this.editForm.email,
            phone: this.editForm.phone
          }
        )
        console.log(res)
        if (res.status !== 202) {
          return this.$message.error('修改用户失败')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示用户修改成功
        this.$message.error('修改用户成功')
      })
    },
    deleteUser(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete('deleteUser/' + id)
          console.log(res)
          if (res.status !== 202) {
            return this.$message.error('删除用户失败')
          }
          // 刷新列表
          this.getUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
