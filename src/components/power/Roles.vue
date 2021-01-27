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
      <el-table :data="rolesList" border style="width: 100%" class="roletable" stripe type="expend">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 通过for 循环渲染一级权限 -->
            <el-row :class="['bdbutton', i1 === 0 ? 'bdtop' : '']" v-for="(item1, i1) in scope.row.childrenList" :key="item1.id">
              <!-- 第一级权限 -->
              <el-col :span = "5">
                <el-tag>{{item1.lable}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 第二级权限和第三级权限 -->
              <el-col :span = "19">
                <el-row :class="[i2 === 0 ? '' : 'bdtop']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-row :span = "5">
                    <el-tag type="success"> {{item2.lable}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-row>
                  <el-row></el-row>
                </el-row>
              </el-col>
            </el-row>
            <pre>
              {{scope.row}}
              </pre>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="380">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="740">
        </el-table-column>
        <el-table-column label="操作">
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

    <!-- 添加角色弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close='addFormClose'>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="角色名称" label-width="130px" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="130px" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close='editFormClose'>
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="角色名称" label-width="130px" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="130px" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 定义角色列表容器
      rolesList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加角色的表单数据
      addForm: {
        roleName: '主管',
        roleDesc: '管理权限'
      },
      editForm: {},
      // 添加表单验证规则对象
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '角色名称的长度应该在2到10个字符之间',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      editFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '角色名称的长度应该在2到10个字符之间',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getRolesList()
  },

  methods: {
    // 获取角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('/roles/roles')
      if (res.status !== 202) {
        return this.$message.error('获取角色失败')
      }
      this.rolesList = res.data
    },
    addFormClose() {
      this.addDialogVisible = false
    },
    editFormClose() {
      this.editDialogVisible = false
      this.$refs.editFormRef.resetFields()
    },
    addRole() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加角色的请求
        const { data: res } = await this.$http.post(
          'roles/addRole',
          this.addForm
        )
        if (res.status !== 202) {
          return this.$message.error('添加角色失败')
        }
        this.addDialogVisible = false
        this.$message.success('添加角色成功')
        this.getRolesList()
      })
    },
    // 编辑角色
    async editRolesDialog(id) {
      const { data: res } = await this.$http.get('roles/findRole/' + id)
      if (res.status !== 202) {
        return this.$message.error('获取角色失败')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 修改角色信息并提交
    editRole() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          'roles/updateRole/' + this.editForm.id,
          {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          }
        )
        if (res.status !== 202) {
          return this.$message.error('修改角色失败')
        }
        this.editDialogVisible = false
        this.$message.success('修改角色成功')
        this.getRolesList()
      })
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            'roles/deleteRole/' + id
          )
          console.log(res)
          if (res.status !== 202) {
            return this.$message.error('删除角色失败')
          }
          // 刷新列表
          this.getRolesList()
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
.roletable {
  margin-top: 15px;
}
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee
}
.bdbutton{
  border-bottom: 1px solid #eee;
}
</style>
