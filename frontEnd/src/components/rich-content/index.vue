<template>
  <div class="rich-content">
    <div class="content" v-html="content"></div>
  </div>
</template>
<script>
import articleData from '@/assets/data/article.js'
export default {
  props: {
    content: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      articleList: articleData.data
    }
  }
}
</script>
<style lang="scss" scoped>
.rich-content{
  padding: 5px;
  /deep/ .content{
    h2{
      margin-left: 5px;
    }
    p{
      color: #393939;
      margin: 15px 0;
      font-size: 16px;
    }
    li{
      font-size: 14px;
      line-height: 17px;
      margin: 4px 0;
    }
    ul, ol {
      margin: 10px 0;
    }
    ul {
      list-style: decimal;
    }
    pre{

    }
  }
}
</style>
