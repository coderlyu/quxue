<template>
  <div class="addAddress">
    <div class="addAddress-nav">
      <van-nav-bar title="新增地址" left-arrow fixed @click-left="onClickBack" />
    </div>
    <div class="addAddress-main">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>
<script>
import areaList from '@/assets/data/areaList'
// import BMap from 'BMap'
export default {
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    onClickBack () {
      this.$router.go(-1)
    },
    onSave (content) {
      let address = {
        default_flag: content.isDefault ? 1 : 0,
        post_code: content.post_code,
        detail_address: content.addressDetail,
        area: content.county,
        city: content.city,
        province: content.province,
        phone: content.tel,
        name: content.name,
        areaCode: content.areaCode
      }
      this.$store.dispatch('user/createAddress', address).then(res => {
        this.$toast('添加成功')
        this.$router.go(-1)
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    onDelete () {
      this.$toast('delete')
    }
  }
}
</script>
<style lang="scss" scoped>
.addAddress{
  min-height: 100vh;
  &-main {
    padding-top: 46px;
    min-height: calc(100vh - 46px);
  }
}
</style>
