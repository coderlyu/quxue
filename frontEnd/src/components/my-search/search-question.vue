<template>
  <div class="search-question">
    <div class="no-resultt" v-if="questionData.length === 0">
      <svg-icon icon-class="no-data" style="font-size:150px;"/>
    </div>
    <div class="has-result" v-else>
      <template v-for="(item, index) in questionData">
        <search-question-item :qItem="item" :key="index"></search-question-item>
      </template>
      <div class="add-more">
        <van-button size="small" :disabled="showBtn" @click="addMoreComments" :loading="loading" color="linear-gradient(to right, #4bb0ff, #6149f6)">加载更多</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import searchQuestionItem from './search-question-item'
export default {
  name: 'searchQuestion',
  components: {
    searchQuestionItem
  },
  props: {
    searchVal: {
      type: String,
      default: ''
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      questionData: [],
      showBtn: false,
      loading: false,
      page: 1,
      number: 10
    }
  },
  methods: {
    addMoreComments () {
      this.loading = true
      this.page += 1
      let query = {
        content: this.searchVal,
        number: this.number,
        page: this.page
      }
      this.$store.dispatch('question/findQuestion', query).then(res => {
        this.questionData = this.questionData.contact(res.data)
        this.loading = false
        this.$toast('查询成功')
        if (this.page * this.number >= res.total) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      }).catch(err => {
        this.$toast.fail(err.message)
        this.loading = false
      })
    },
    emitChangeState () {
      this.$emit('changeState')
    },
    init () {
      this.questionData = []
      let query = {
        content: this.searchVal,
        number: this.number,
        page: this.page
      }
      this.$store.dispatch('question/findQuestion', query).then(res => {
        this.questionData = res.data
        this.$toast('查询成功')
        this.emitChangeState()
        if (this.page * this.number >= res.total) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  beforeDestoy () {
    this.emitChangeState()
  },
  watch: {
    isSearch () {
      if (this.isSearch) {
        this.init()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search-question{
  padding: 5px;
  .no-resultt{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-more{
    margin: 10px 0;
    display: flex;
    justify-content: center;
  }
}
</style>
