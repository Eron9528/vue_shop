<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>面试题</el-breadcrumb-item>
      <el-breadcrumb-item>添加修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">

      <el-row :gutter="20 ">
        <el-col :span="7">
          <!-- 搜索内容 -->
          <el-input placeholder="请输入内容" v-model='queryInfo.query' clearable @clear='clearFrom()'>
            <el-button slot="append" icon="el-icon-search" @click="clearFrom()"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-form ref="addFormRef" :model="addForm" label-width="80px" class="form-class">
        <el-form-item label="问题题目" prop="questionName">
          <el-input v-model="addForm.questionName" placeholder="请输入问题内容"></el-input>
        </el-form-item>
        <!-- 输入问题内容 -->

        <el-form-item label="问题内容" prop="questionContent">
          <el-input type="textarea" :rows="12" placeholder="请输入问题内容" v-model="addForm.questionContent">
          </el-input>
        </el-form-item>

        <el-form-item label="问题类型" prop="type">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="1">Java 基础</el-radio>
            <el-radio :label="2">Spring</el-radio>
            <el-radio :label="3">SpringBoot</el-radio>
            <el-radio :label="4">SpringCloud</el-radio>
            <el-radio :label="5">MySql</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-button type="primary" @click="addQuestion()">添加问题</el-button>

      </el-form>

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 搜索条件
      queryInfo: { query: '' },
      // 添加问题表单
      addForm: {
        questionName: '',
        questionContent: '',
        type: 1
      },
      type: 1
    }
  },
  created() {
    this.getQuestionList()
  },
  methods: {
    async getQuestionList() {
      console.log('初始化')
    },
    clearFrom() {
      this.$refs.addFormRef.resetFields()
    },
    async addQuestion() {
      const { data: res } = await this.$http.post(
        'basic/addQuestion',
        this.addForm
      )
      if (res.status !== 202) {
        this.$message.error('添加问题失败')
      }
      this.clearFrom()
      this.$message.success('添加问题成功')
    }
  }
}
</script>
<style lang="less" scoped>
.form-class {
  margin-top: 15px;
}
</style>
