<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>About me</span>
        </div>
        <div class="flex-cr">
          <pan-thumb width="100px" height="100px" :image="$store.getters.avatar">
          {{ $store.getters.name }}
        </pan-thumb>
        </div>
        <div>
          <h2 style="margin-top:20px;">任务</h2>
          <!-- <el-divider></el-divider> -->
          <ul class="tips">
            <li>
              <span class="title">修改用户信息</span>
              <el-progress :percentage="90" />
            </li>
            <li>
              <span class="title">添加管理员</span>
              <el-progress :percentage="10" />
            </li>
            <li>
              <span class="title">导出excel</span>
              <el-progress :percentage="100" status="success" />
            </li>
          </ul>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="18" :xl="18">
      <el-card class="box-card" :class="isMobile ? 'margin10': ''">
        <h3 class="margin20">基本信息</h3>
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="头像" prop="avatar">
            <img v-if="!isUpdate" :src="userForm.avatar" alt="头像" style="width:130px; height:130px; border-radius: 50%;">
            <el-upload
              v-else
              class="avatar-uploader"
              action="http://47.106.68.248:3002/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <p v-if="!isUpdate">{{ userForm.name }}</p>
            <el-input v-else v-model="userForm.name" placeholder="你的姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <p v-if="!isUpdate">{{ userForm.phone }}</p>
            <el-input v-else v-model="userForm.phone" placeholder="你的电话"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <p v-if="!isUpdate">{{ userForm.sex === '1' ? '男' : '女'}}</p>
            <el-select v-else v-model="userForm.sex" placeholder="请设置你的性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="你的爱好" prop="likes">
            <p v-if="!isUpdate">{{ userForm.likes.join() }}</p>
            <el-checkbox-group v-else v-model="userForm.likes">
              <el-checkbox label="健身" name="likes"></el-checkbox>
              <el-checkbox label="读书" name="likes"></el-checkbox>
              <el-checkbox label="游戏" name="likes"></el-checkbox>
              <el-checkbox label="恋爱" name="likes"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="你的地址" prop="address">
            <p v-if="!isUpdate">{{ userForm.address }}</p>
            <el-input v-else type="textarea" v-model="userForm.address" placeholder="你的地址"></el-input>
          </el-form-item>
          <div>
            <el-button v-if="!isUpdate" @click="toggle">修改信息</el-button>
            <el-button v-if="isUpdate" type="primary" @click="submitForm">确认修改</el-button>
            <el-button v-if="isUpdate" type="danger" @click="cancel">取消</el-button>
          </div>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/pant-humb'
export default {
  name: 'info',
  components: {
    PanThumb
  },
  data () {
    return {
      isUpdate: false,
      userForm: {
        name: '',
        sex: '',
        phone: '',
        avatar: '',
        age: '',
        likes: [],
        address: ''
      },
      rules: {
        name: [{ required: true, message: '请输入你的姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请设置你的性别', trigger: 'change' }],
        likes: [{ type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }],
        address: [{ required: true, message: '请填写你的地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    toggle () {
      this.isUpdate = true
    },
    cancel () {
      this.userForm = {
        name: this.name,
        sex: this.sex,
        phone: this.phone,
        avatar: this.avatar,
        age: this.age,
        likes: this.likes,
        address: this.address
      }
      this.isUpdate = false
    },
    submitForm () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/changeUserInfo', this.userForm)
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.isUpdate = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess (e) {
      if (e.code === 1) {
        this.userForm.avatar = e.data[0]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'age',
      'sex',
      'phone',
      'avatar',
      'likes',
      'address',
      'isMobile'
    ])
  },
  created () {
    this.userForm = {
      name: this.name,
      sex: this.sex,
      phone: this.phone,
      avatar: this.avatar,
      age: this.age,
      likes: this.likes,
      address: this.address
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
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
ul.tips {
  list-style-type: none;
  border-top: 1px solid #DCDFE6;
  li {
    margin: 3px 0;
    span.title {
      color: #444;
      font-size: 14px;
    }
  }
}
</style>
