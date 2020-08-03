<template>
  <div class="myquestion">
    <div class="myquestion-nav">
      <van-nav-bar
        title="我的说说"
        left-arrow
        fixed
        @click-left="onClickBack"
      />
    </div>
    <div class="myquestion-main">
      <div class="myquestion-main-tab">
        <van-tabs v-model="active">
          <van-tab title="已发表">
            <div v-if="currentPublicList.length === 0" class="no-data">
              <svg-icon icon-class="no-data"  style="font-size:150px;"/>
            </div>
           <div v-else class="item-wrapper">
              <template v-for="(item, i) in currentPublicList">
                <my-question-item :key="i" :qType="active" :qItem="item" @toDelete="toDeleteItem"></my-question-item>
              </template>
              <div>
                <van-pagination
                  @change="publicChange"
                  v-model="currentPublicPage"
                  :total-items="publicList.length"
                  :items-per-page="pageSize"
                />
              </div>
           </div>
          </van-tab>
          <van-tab title="草稿">
            <div v-if="currentNoPublicList.length === 0" class="no-data">
              <svg-icon icon-class="no-data"  style="font-size:150px;"/>
            </div>
            <div v-else class="item-wrapper">
              <template v-for="(item, i) in currentNoPublicList">
                <my-question-item :key="i" :qType="active" :qItem="item" @toDelete="toDeleteItem"></my-question-item>
              </template>
              <div>
                 <van-pagination
                  @change="NoPublicChange"
                  v-model="currentNoPublicPage"
                  :total-items="noPublicList.length"
                  :items-per-page="pageSize"
                />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import myQuestionItem from './myquestion-item'
export default {
  components: {
    myQuestionItem
  },
  data () {
    return {
      active: 0,
      publicList: [],
      noPublicList: [],
      currentPublicList: [],
      currentNoPublicList: [],
      currentPublicPage: 1,
      currentNoPublicPage: 1,
      pageSize: 4
    }
  },
  methods: {
    toDeleteItem ({ item, type }) {
      if (type === 0) {
        let index = -1
        index = this.publicList.findIndex(e => e.id === item.id)
        if (index > -1) {
          this.publicList.splice(index, 1)
          this.currentPublicList = this.publicList.slice((this.currentPublicPage - 1) * this.pageSize, this.currentPublicPage * this.pageSize)
        }
      } else {
        let index = -1
        index = this.noPublicList.findIndex(e => e.id === item.id)
        if (index > -1) {
          this.noPublicList.splice(index, 1)
          this.currentNoPublicList = this.noPublicList.slice((this.currentNoPublicPage - 1) * this.pageSize, this.currentNoPublicPage * this.pageSize)
        }
      }
    },
    publicChange (page) {
      this.currentPublicPage = page
      this.currentPublicList = this.publicList.slice((this.currentPublicPage - 1) * this.pageSize, this.currentPublicPage * this.pageSize)
    },
    NoPublicChange (page) {
      this.currentNoPublicPage = page
      this.currentNoPublicList = this.noPublicList.slice((this.currentNoPublicPage - 1) * this.pageSize, this.currentNoPublicPage * this.pageSize)
    },
    onClickBack () {
      this.$router.go(-1)
    },
    init () {
      let query = {
        number: 2000,
        page: 1
      }
      this.$store.dispatch('question/getQuestionsByUserId', query).then(res => {
        let data = res.data
        data.forEach(item => {
          if (item.type === 0) {
            this.noPublicList.push(item)
          } else {
            this.publicList.push(item)
          }
        })
        this.currentPublicList = this.publicList.slice((this.currentPublicPage - 1) * this.pageSize, this.currentPublicPage * this.pageSize)
        this.currentNoPublicList = this.noPublicList.slice((this.currentNoPublicPage - 1) * this.pageSize, this.currentNoPublicPage * this.pageSize)
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
.myquestion {
  min-height: 100vh;
  &-main{
    padding-top: 46px;
    &-tab{
      .item-wrapper {
        padding: 10px 5px;
      }
    }
  }
}
.no-data{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
