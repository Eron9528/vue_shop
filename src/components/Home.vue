<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/images/shouye.png" />
        <span>书城后台管理</span>
      </div>
      <el-button
        type='info'
        @click="logout"
      >退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409FFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active='activePath'
        >
          <el-submenu :index="index+''" v-for="(index,item) in menulist" :key="index+''">
            <template slot="title">
              <i :class="iconObj[item]"></i>
              <span>{{item}}</span>
            </template>
            <el-menu-item :index="'/'+li[0]" v-for="li in menulist[item]" :key="li[0]+''" @click="saveNavState('/'+li[0])">
              <template slot="title">
                <li class="el-icon-menu"></li>
                <span>{{li[1]}}</span>
              </template></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单栏数据
      menulist: [],
      iconObj: {
        用户管理: 'el-icon-s-shop',
        商品管理: 'el-icon-s-shop',
        订单管理: 'el-icon-s-order'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('/getMenu')
      if (res.status !== 202) {
        return this.$message.error(res.msg)
      }
      this.menulist = res.data
      console.log(this.menulist)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
}

</style>
