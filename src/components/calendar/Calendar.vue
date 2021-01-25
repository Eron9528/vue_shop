<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作排班</el-breadcrumb-item>
      <el-breadcrumb-item>查看排班</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20 ">
        <!-- 查询按钮 -->
        <el-col :span='7'>
          <el-input placeholder="请输入查询员工的中文姓名的大写拼音" v-model='queryInfo.query' clearable @clear='getUserList()'>
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-calendar class="el-calendar">
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template slot="dateCell" slot-scope="{date, data}">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
          </p>
        </template>
      </el-calendar>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: ''
      }
    }
  },
  methods: {
    getUserList() {
      console.log('执行查询方法')
    }
  }
}
</script>

<style lang="less" scoped>
.el-calendar {
  padding-top: 15px;
}
</style>
