<template>
  <div class="editAddress">
    <div class="editAddress-nav">
      <van-nav-bar title="编辑地址" left-arrow fixed @click-left="onClickBack" />
    </div>
    <div class="editAddress-main">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :address-info="addressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>
<script>
import areaList from '@/assets/data/areaList'
export default {
  data () {
    return {
      id: this.$route.params.id,
      areaList,
      searchResult: [],
      addressInfo: {
        id: '',
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail: '',
        postalCode: '',
        areaCode: '',
        isDefault: ''
      }
    }
  },
  methods: {
    onClickBack () {
      this.$router.go(-1)
    },
    onSave (content) {
      let address = {
        id: content.id,
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
      this.$store.dispatch('user/updateAddress', address).then(res => {
        this.$toast('修改成功')
        this.$router.go(-1)
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    onDelete () {
      this.$store.dispatch('user/deleteAddress', this.id).then(res => {
        this.$toast('删除成功')
        this.$router.go(-1)
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    init () {
      this.$store.dispatch('user/getAddressDetailById', { id: this.$route.params.id }).then(res => {
        let data = res.data
        this.addressInfo = {
          id: data.id,
          name: data.name,
          tel: data.phone,
          province: data.province,
          city: data.city,
          county: data.area,
          addressDetail: data.detail_address,
          postalCode: data.post_code,
          isDefault: data.default_flag === 1,
          areaCode: data.areaCode
        }
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
.editAddress{
  min-height: 100vh;
  &-main {
    padding-top: 46px;
    min-height: calc(100vh - 46px);
  }
}
</style>
