<template>
  <div class="search-quesion-item" @click="toQuestionDetail">
    <p class="search-title">{{ qItem.title }}</p>
    <p class="search-time">{{ qItem.time }}</p>
    <p class="search-content van-multi-ellipsis--l3">{{ qItem.content }}</p>
    <div class="search-footer">
      <div class="search-footer-item">
        <van-icon name="good-job-o" class="i-icon" />
        <p>{{ qItem.support }}</p>
      </div>
      <div class="search-footer-item">
       <van-icon name="comment-o" class="i-icon" />
        <!-- <p>{{ qItem.comments }}</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchQuestionItem',
  props: {
    qItem: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toQuestionDetail () {
      this.$router.push({ name: 'articleDetail', params: { id: this.qItem.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-quesion-item{
  background: white;
  height: 125px;
  border-radius: 10px;
  padding: 5px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .search-title{
    font-size: 16px;
    font-weight: 600;
  }
  .search-time{
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
    color: #666;
    margin: 2px 0;
  }
  .search-content{
    font-size: 14px;
    color: #444;
    text-indent: 2em;
  }
  .search-footer{
    margin-top: 2px;
    padding-right: 10px;
    display: flex;
    color: #666;
    justify-content: flex-end;
    &-item {
      display: flex;
      margin-left: 20px;
      .i-icon{
        font-size: 20px;
        margin-right: 3px;
      }
      p{
        font-size: 14px;
        font-weight: 200;
        align-self: flex-end;
      }
    }
  }
}
</style>
