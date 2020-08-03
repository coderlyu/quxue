<template>
  <div class="article-edit">
    <div class="article-edit-top">
      <van-nav-bar
        title="文章编辑"
        left-arrow
        fixed
        :z-index="13000"
        @click-left="onBack"
      />
    </div>
    <div class="article-edit-middle">
      <div class="article-title">
        <p class="ptitle">标题</p>
        <van-cell-group>
          <van-field v-model="question.title" placeholder="请输入标题" />
          <van-field
            v-model="question.info"
            rows="2"
            type="textarea"
            placeholder="简单描述..." />
        </van-cell-group>
      </div>
      <div class="article-image">
        <p class="ptitle">展示的图片</p>
        <div style="margin-left:10px;">
            <van-uploader
              v-model="fileList"
              multiple
              :max-count="1"
              :before-read="beforeRead"
              :after-read="afterRead"
            />
        </div>
      </div>
      <div class="wang-editor">
        <div class="wang-editor-title">
          <span class="ptitle">内容</span>
          <svg-icon @click="clearEmpty" icon-class="clear-empty" style="font-size:20px;align-self: center;margin-right:15px;cursor: pointer;" />
        </div>
        <wang-editor :isClear="isClear" :content="question.content" @change="updateContent" />
      </div>
      <div class="talk-about">
        <div class="talk-about-btn" @click="selectTalk">#选择一个话题</div>
        <van-tag
          v-if="show.primary"
          closeable
          size="medium"
          type="primary"
          @close="close('primary')"
        >
          问题
        </van-tag>
      </div>
    </div>
    <div class="article-edit-bottom">
      <van-button type="info" size="large" @click="submitPublic">确定修改</van-button>
    </div>
    <div class="select-talk" :class="selectalk? 'select-talk-show': ''">
      <div class="select-talk-title">
        <p class="select-talk-title-center">添加话题</p>
        <p class="select-talk-title-self" @click="closeTalk">完成</p>
      </div>
      <van-search placeholder="请输入搜索关键词" v-model="searchVal" />
      <div class="result">
        <div class="hadadd">
          <p class="hadadd-title">已添加</p>
          <van-tag
            v-if="show.primary"
            closeable
            size="medium"
            type="primary"
            @close="close('primary')"
          >
          问题
          </van-tag>
        </div>
        <div class="search">
          <div class="search-item">
            <div class="search-item-img">
              <van-image
                width="30"
                height="30"
                radius="5"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="search-item-content">
              <p class="van-ellipsis search-item-content-title">javaScript</p>
              <p class="van-ellipsis search-item-content-con">21k 关注 · 2k 问题</p>
            </div>
            <div class="search-item-btn">
              <van-button type="info" size="mini">添加</van-button>
            </div>
          </div>
          <div class="search-item">
            <div class="search-item-img">
              <van-image
                width="30"
                height="30"
                radius="5"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="search-item-content">
              <p class="van-ellipsis search-item-content-title">jQuery</p>
              <p class="van-ellipsis search-item-content-con">2000 关注 · 12k 问题</p>
            </div>
            <div class="search-item-btn">
              <van-button type="info" size="mini">添加</van-button>
            </div>
          </div>
          <div class="search-item">
            <div class="search-item-img">
              <van-image
                width="30"
                height="30"
                radius="5"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="search-item-content">
              <p class="van-ellipsis search-item-content-title">jQuery</p>
              <p class="van-ellipsis search-item-content-con">2000 关注 · 12k 问题</p>
            </div>
            <div class="search-item-btn">
              <van-button type="info" size="mini">添加</van-button>
            </div>
          </div>
          <div class="search-item">
            <div class="search-item-img">
              <van-image
                width="30"
                height="30"
                radius="5"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="search-item-content">
              <p class="van-ellipsis search-item-content-title">jQuery</p>
              <p class="van-ellipsis search-item-content-con">2000 关注 · 12k 问题</p>
            </div>
            <div class="search-item-btn">
              <van-button type="info" size="mini">添加</van-button>
            </div>
          </div>
          <div class="search-item">
            <div class="search-item-img">
              <van-image
                width="30"
                height="30"
                radius="5"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="search-item-content">
              <p class="van-ellipsis search-item-content-title">jQuery</p>
              <p class="van-ellipsis search-item-content-con">2000 关注 · 12k 问题</p>
            </div>
            <div class="search-item-btn">
              <van-button type="info" size="mini">添加</van-button>
            </div>
          </div>
          <div class="search-item">
            <div class="search-item-img">
              <van-image
                width="30"
                height="30"
                radius="5"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="search-item-content">
              <p class="van-ellipsis search-item-content-title">jQuery</p>
              <p class="van-ellipsis search-item-content-con">2000 关注 · 12k 问题</p>
            </div>
            <div class="search-item-btn">
              <van-button type="info" size="mini">添加</van-button>
            </div>
          </div>
          <div class="search-item">
            <div class="search-item-img">
              <van-image
                width="30"
                height="30"
                radius="5"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="search-item-content">
              <p class="van-ellipsis search-item-content-title">jQuery</p>
              <p class="van-ellipsis search-item-content-con">2000 关注 · 12k 问题</p>
            </div>
            <div class="search-item-btn">
              <van-button type="info" size="mini">添加</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :z-index="15000" :show="selectalk"/>
  </div>
</template>
<script>
import wangEditor from '@/components/wang-editor'
import { uploadImg } from '@/api/upload.js'
// import { type } from 'os'
export default {
  components: {
    wangEditor
  },
  data () {
    return {
      id: this.$route.params.id,
      fileList: [],
      searchVal: '',
      selectalk: false,
      question: {
        title: '',
        info: '',
        content: '',
        imgUrl: '',
        type: 1
      },
      isClear: false,
      show: {
        primary: true,
        success: true
      },
      timeout: '',
      imgType: ['image/jpeg', 'image/png', 'image/jpg']
    }
  },
  methods: {
    // 图片上传前验证
    beforeRead (file) {
      if (this.imgType.indexOf(file.type) === -1) {
        this.$toast.fail('请上传jpg、png格式图片')
        return false
      }
      return true
    },
    // 图片上传结束，开始上传到服务器
    afterRead (file) {
      let formData = new FormData()
      formData.append('file', file.file)
      uploadImg(formData).then(res => {
        if (res.code === 1) {
          console.log(res.data[0])
          this.question.imgUrl = res.data[0]
        } else {
          this.$toast.fail('图片上传到服务器失败')
        }
      }).catch(() => {
        this.$toast.fail('图片上传到服务器失败')
      })
    },
    onBack () {
      this.$router.go(-1)
    },
    clearEmpty () {
      if (this.question.content) {
        this.isClear = true
        if (this.timeout) {
          window.clearTimeout(this.timeout)
        }
        this.timeout = window.setTimeout(() => {
          this.isClear = false
          this.timeout = ''
        }, 1000)
      }
    },
    updateContent (val) {
      this.question.content = val
    },
    close (type) {
      this.show[type] = false
    },
    selectTalk () {
      this.selectalk = true
    },
    closeTalk () {
      this.selectalk = false
    },
    submitPublic () {
      if (this.question.type === 0) {
        this.editQuestion(0)
      } else {
        this.editQuestion(1)
      }
    },
    editQuestion (type) {
      if (!this.question.title) {
        this.$toast('标题不能为空')
        return
      }
      if (!this.question.content) {
        this.$toast('内容不能为空')
        return
      }
      if (!this.question.imgUrl || this.fileList.length === 0) {
        this.$toast('图片不能为空')
        return
      }
      if (type === 0 && this.question.type === 1) {
        this.$toast('已发表的无法保存为草稿')
        return
      }
      this.question.type = type
      this.$store.dispatch('question/toUpdateQuestion', this.question).then(res => {
        if (type === 0) {
          this.$toast('保存成功')
        } else {
          this.$toast('修改成功')
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    init () {
      this.$store.dispatch('question/getDetail', this.$route.params.id).then(data => {
        this.question = Object.assign(this.question, data[1])
        this.fileList.push({ url: this.question.imgUrl })
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.ptitle {
  margin: 5px 0;
  line-height: 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 3px;
  text-indent: 1em;
}
.article-edit{
  overflow: hidden;
  background: #f1f1f1;
  margin-top: 46px;
  padding-bottom: 60px;
  &-middle{
    .article-title{
      background: #fff;
      margin: 10px 0;
      width: 100%;
      textarea{
        width: 100%;
        height: 40px;
        margin: 2px;
      }
    }
    .article-image {
      background: #fff;
    }
    .wang-editor{
      margin: 5px 0;
      background: white;
      &-title{
        display: flex;
        justify-content: space-between;
      }
    }
    .talk-about{
      display: flex;
      &-btn{
        margin: 0 10px;
        background: #b7e8e6;;
        padding: 2px;
        // border:1px solid #ccc;
        border-radius: 10px;
        width: 100px;
        text-align: center;
        font-size: 13px;
        line-height: 20px;
        color: #86594f;
      }
    }
  }
  &-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 14000;
  }
}
.select-talk{
  z-index: 20000;
  position: fixed;
  // top: calc(315px - 100vh);
  top: 100vh;
  background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 300px;
  padding-top: 15px;
  transition: all .5s;
  &-title{
    position: relative;
    display: flex;
    height: 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: row;
    font-size: 17px;
    font-weight: 600;
    &-self{
      position: absolute;
      right: 6px;
      color: #1989FA;
      margin-right: 10px;
    }
  }
  .result{
    width: 100%;
    height: 216px;
    overflow: auto;
    .hadadd{
      padding-left: 10px;
      &-title{

        font-size: 14px;
        color: #666;
        margin: 3px 0;
      }
    }
    .search{
      overflow: hidden;
      padding-bottom: 50px;
      &-item{
        margin-top: 10px;
        border-top: 1px solid #f5f5f5;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        &-img{
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &-content{
          display: flex;
          flex: 1;
          overflow: hidden;
          flex-direction: column;
          &-title{
            font-size: 15px;
            font-weight: 600;
          }
          &-con{
            font-size: 12px;
            color: #6d6d6d;
          }
        }
        &-btn{
          width: 60px;
        }
      }
    }
  }
}
.select-talk-show{
  top: calc(100vh - 315px);
}
</style>
