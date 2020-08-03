<template>
  <el-dialog
    title="提示"
    :visible.sync="showDialog"
    :width="isMobile ? '95%' : '50%'"
    @close="$emit('cancelEdit')"
    center>
    <el-form ref="editForm" :model="item" label-width="80px" :rules="rules" size="mini">
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="item.imgUrl" :src="item.imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="编号">
        <el-input v-model="item.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="name">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="item.create_time"
          type="datetime"
          placeholder="选择日期时间"
          disabled
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="简介" prop="info">
        <el-input type="textarea" :rows="5" v-model="item.info"></el-input>
      </el-form-item>
      <el-form-item class="flex-end">
        <el-button type="danger" @click="$emit('cancelEdit')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'question-edit',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDialog: this.isShow,
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        info: [{ required: true, message: '简介不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$emit('confirmEdit', this.item)
          console.log(this.item)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess () {
      console.log('触发：handleAvatarSuccess')
    },
    beforeAvatarUpload () {
      console.log('触发：beforeAvatarUpload')
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  watch: {
    isShow () {
      this.showDialog = this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409EFF;
    }
    &-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
  }
  /deep/ .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
