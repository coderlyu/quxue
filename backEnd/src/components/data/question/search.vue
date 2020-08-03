<template>
  <div class="margin5">
    <el-form :model="formInline" class="demo-form-inline" :size="isMobile ? 'mini' : ''" ref="userSearch">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item prop="title">
            <el-input v-model="formInline.title" placeholder="标题" style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item prop="create_time">
            <el-date-picker
              v-model="formInline.create_time"
              type="datetime"
              placeholder="创建日期"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item>
            <el-button @click="$emit('exportExcel')">导出Excel</el-button>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'question-search',
  data () {
    return {
      formInline: {
        title: '',
        create_time: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('toSearch', this.formInline)
    },
    resetForm () {
      this.$refs.userSearch.resetFields()
      this.$emit('resetForm')
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
