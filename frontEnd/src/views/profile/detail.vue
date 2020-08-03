<template>
  <div class="profile-detail">
    <div class="profile-top">
      <van-nav-bar
        title="个人信息"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>
      <div class="detail-bg">
      </div>
        <div class="profile-detail-body">
          <img class="body-img" :src="avatar" alt="头像" @click="toShow"/>
          <div class="body-top">
            <div class="edit-user" @click="editUser"><p>编辑资料</p></div>
            <div class="user-intro">
              <div class="user-intro-item">
                <p class="user-intro-item-number">10</p>
                <p class="user-intro-item-content">我关注的</p>
              </div>
              <div class="user-intro-item">
                <p class="user-intro-item-number">18</p>
                <p class="user-intro-item-content">关注我的</p>
              </div>
            </div>
            <div class="user-other">
              <van-cell-group class="cellgroup">
                <van-cell title="个人认证" is-link />
              </van-cell-group>
              <van-cell-group class="cellgroup">
                <van-cell is-link value="查看详情" >
                  <template slot="title">
                    <svg-icon icon-class="chengjiu" style="font-size:24px;"/>
                    <span>我的成就</span>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            <van-divider />
            <div class="user-active">
              <van-tabs v-model="active">
                <van-tab>
                  <template slot="title">
                    <div class="user-active-nav">
                      <svg-icon icon-class="dongtai" style="font-size:20px;"/>
                      <p class="user-active-nav-p">动态</p>
                    </div>
                  </template>
                    <my-active></my-active>
                </van-tab>
                <van-tab>
                  <template slot="title">
                    <div class="user-active-nav">
                      <svg-icon icon-class="guanzhu" style="font-size:20px;"/>
                      <p class="user-active-nav-p">关注</p>
                    </div>
                  </template>
                    <my-follow></my-follow>
                </van-tab>
              </van-tabs>
            </div>
          </div>
        </div>
    <!-- 隐藏的input图片上传 -->
    <input type="file" ref="fileupload" :value="uploadImg" class="hidden" @change="handleFile">
    <!-- 图片上传预览 -->
    <!-- <van-overlay :show="showMask" :z-index="20000">
      <div class="wrapper" @click.stop>
        <div class="img-preview">
          <VueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
            @imgLoad="imgLoad"
          ></VueCropper>
        </div>
        <div class="img-btn">
          <van-button type="info" @click="showMask = false">取消</van-button>
          <van-button type="info" @click="onCubeImg">确认</van-button>
        </div>
      </div>
    </van-overlay> -->
    <van-dialog v-model="showMask" title="图片裁剪" show-cancel-button @confirm="onCubeImg">
      <div style="height:300px;display: flex; justify-content: center; align-items: center;">
        <VueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
          @imgLoad="imgLoad"
        ></VueCropper>
        </div>
    </van-dialog>
    <van-action-sheet
      v-model="show"
      title="上传头像方式"
      :actions="actions"
      :close-on-click-overlay="false"
      cancel-text="取消"
      @select="onSelect"/>
  </div>
</template>
<script>
import { dataURLtoFile } from '@/utils/tools.js'
import { uploadImg } from '@/api/upload.js'
import { VueCropper } from 'vue-cropper'
import myActive from '@/components/my-profile/my-active'
import myFollow from '@/components/my-profile/my-follow'
export default {
  name: 'myDetail',
  components: {
    myActive,
    myFollow,
    VueCropper
  },
  data () {
    return {
      active: 0,
      show: false,
      showMask: false,
      uploadImg: '',
      actions: [
        { name: '本地图片' },
        { name: '拍照上传' }
      ],
      option: {
        img: '',
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        canScale: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 250,
        autoCropHeight: 250,
        fixedBox: true
      },
      preUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    realTime (data) {
      // console.log('realTime', data)
      this.preUrl = data
    },
    imgLoad (msg) {
      console.log('imgLoad')
      console.log(msg)
    },
    editUser () {
      this.$router.push('/user/edit')
    },
    toShow () {
      this.show = true
    },
    onSelect (item) {
      this.show = false
      switch (item.name) {
        case '本地图片':
          this.$refs.fileupload.click()
          break
        case '拍照上传':
          if (this.$store.getters.isMobilePhone) {
            this.cameraTakePicture()
          } else {
            this.$toast.fail('当前不是移动设备，无法打开摄像头')
          }
          break
        default:
          break
      }
    },
    cameraTakePicture () {
      navigator.camera.getPicture(imageData => {
        // var image = document.getElementById('myImage')
        // image.src = 'data:image/jpeg;base64,' + imageData
        this.option.img = 'data:image/jpeg;base64,' + imageData
        this.showMask = true
      }, message => {
        alert('Failed because: ' + message)
      }, {
        quality: 50,
        // eslint-disable-next-line no-undef
        destinationType: Camera.DestinationType.DATA_URL
      })
    },
    handleFile () {
      let file = this.$refs.fileupload.files[0]
      const imgtype = ['image/png', 'image/jpg', 'image/jpeg']
      if (imgtype.indexOf(file.type) === -1) {
        this.$toast('只能上传png/jpeg格式的图片')
      } else {
        let reader = new FileReader()
        reader.onload = e => {
          this.option.img = e.target.result
          this.showMask = true
          // console.log(e.target.result)
        }
        reader.readAsDataURL(file)
      }
      // console.log(this.$refs.fileupload.files)
    },
    onCubeImg () {
      this.$refs.cropper.getCropData(data => {
        this.option.img = ''
        // 将剪裁后base64的图片转化为file格式
        let file = dataURLtoFile(data, '裁剪图片')
        // console.log(file)
        console.log(file)
        let formData = new FormData()
        formData.append('file', file)
        // TODO
        uploadImg(formData).then(data => {
          if (data.code === 1) {
            let url = data.data[0]
            this.$store.dispatch('user/update', { avatar: url }).then(() => {
              this.showMask = false
              this.$toast.success('图片修改成功')
            }).catch(err => {
              // this.$toast.fail('图片信息修改失败')
              this.$toast.fail(err.message)
            })
          } else {
            this.$toast.fail('图片上传失败')
          }
        }).catch(err => {
          this.$toast.fail(err.message)
        })
      })
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  overflow: hidden;
  border-radius: 5%;
  position: relative;
  width: 250px;
  height: 300px;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  .img-preview{
    width: 200px;
    height: 200px;
    margin: 10px auto;
  }
  .img-btn{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  }
}
.hidden{
  visibility: hidden;
}
.profile-detail{
  min-height: calc(100vh - 50px - 46px);
  position: relative;
  background: #f7f7f7;
  padding-bottom: 60px;
  .detail-bg{
    position: absolute;
    top: 0;
    width: 100%;
    height: 150px;
    background: #2883d2;
    // background: #000000;
    background: -moz-linear-gradient(top,  #2883d2 0%, #ffffff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#2883d2), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top,  #2883d2 0%,#ffffff 100%);
    background: -o-linear-gradient(top,  #2883d2 0%,#ffffff 100%);
    background: -ms-linear-gradient(top,  #2883d2 0%,#ffffff 100%);
    background: linear-gradient(to bottom,  #2883d2 0%,#ffffff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff',GradientType=0 );
    // border-bottom-left-radius: 40%;
    // border-bottom-right-radius: 40%;
  }
  &-body{
    display: flex;
    position: absolute;
    width: 100%;
    // height: 100px;
    background: white;
    top: 100px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .body-img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      top: -50px;
      left: 20px;
      // outline: 2px solid #2883d2;
      // -moz-outline-radius: 50%;
      // -moz-outline-radius: 30px;
      box-shadow: 0 0 0 3px white;
    }
    .body-top{
      width: 100%;
      // height: 100px;
      // background: #2883d2;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 10px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      .edit-user{
        background: #3088d4;
        color: white;
        align-self: flex-end;
        font-size: 15px;
        font-weight: 600;
        width: 100px;
        height: 22px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 5px 0 0;
        cursor: pointer;
      }
      .user-intro{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        &-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 40%;
          cursor: pointer;
          &-number{
            color: #038aff;
            font-size: 18px;
            font-weight: 600;
          }
          &-content{
            font-size: 13px;
            font-weight: 200;
            color: #666;
            margin-top: 2px;
          }
        }
      }
      .user-other{
        padding: 0 5%;
        margin-top: 10px;
      }
      .user-active{
        &-nav{
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          &-p{
            margin-left: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
