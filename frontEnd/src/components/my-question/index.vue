<template>
  <div class="question-wrapper">
    <div v-if="lists.length > 0">
      <template v-for="item in lists">
        <question-item :item="item" :key="item._id" @updateItem="updateItem"></question-item>
      </template>
      <div class="add-more">
        <van-button @click="addMore" :disabled="btnShow" type="primary" size="small">加载更多</van-button>
      </div>
    </div>
    <div class="no-data" v-else>
       <svg-icon icon-class="no-data" style="font-size:150px;"/>
    </div>
  </div>
</template>
<script>
import questionItem from './questionItem'
export default {
  components: {
    questionItem
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    itemType: {
      type: Number,
      required: true
    },
    btnShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      lists: this.items,
      timeout: null
    }
  },
  methods: {
    updateItem (item) {
      this.$emit('updateQuextion', { type: this.itemType, question: item })
    },
    addMore () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.$emit('addMore', { type: this.itemType })
        clearTimeout(this.timeout)
      }, 1000)
    }
  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
  watch: {
    items () {
      this.lists = this.items
    }
  }
}
</script>
<style lang="scss" scoped>
.question-wrapper{
  padding: 0 5px;
  // padding-bottom: 50px;
  .add-more {
    text-align: center;
    margin: 10px 0;
    clear: both;
  }
}
.no-data {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
