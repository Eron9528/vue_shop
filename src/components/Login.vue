<template>
  <div class="login_container">
    <div class="login_box">
        <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
        </div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type='password' placeholder="请输入密码" prefix-icon="el-icon-s-goods"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="loginFormRef" >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginFormRef () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          const result = await this.$http.get('api/login?username=' + this.loginForm.username + '&password=' + this.loginForm.password)
          if (result.data.data === 'success') {
            this.$message.success('登录成功')
          } else {
            this.$message.error('登录失败')
          }
          // 1.将登录后的token,保存到客户端的 sessionStroage 中
          //   1.1 项目中除了登录之外的其他API 接口，必须在登录之后才能访问
          //   1.2 token 只应在当前网站打开期间生效， 所以将 token 保存在 sessionStorage 中
          // 2.通过编程式导航跳转到后台主页， 路由地址是 /home
          window.sessionStorage.setItem('token', result.data.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    background-color: #fff;
    width: 450px;
    height: 300px;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
