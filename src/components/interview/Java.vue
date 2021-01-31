<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>面试题</el-breadcrumb-item>
      <el-breadcrumb-item>JAVA 基础</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="JavaData" stripe style="width: 100%">
        <el-table-column prop="questionName" label="题目" width="680">
        </el-table-column>
        <!-- <el-table-column prop="address" label="是否解答">
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      JavaData: []
    }
  },
  created() {
    this.getQuestionList()
  },
  methods: {
    async getQuestionList() {
      const { data: res } = await this.$http.get('basic/getBasic/JAVA')
      console.log(res.data)
      if (res.status !== 202) {
        this.$message.error('获取问题错误')
      }
      this.res.data = this.JavaData
      this.$message.success('获取问题成功')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
