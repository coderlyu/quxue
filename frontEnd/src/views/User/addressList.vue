<template>
  <div class="address-list">
    <div class="address-list-nav">
      <van-nav-bar title="我的地址" left-arrow fixed @click-left="onClickBack" />
    </div>
    <div class="address-list-body">
      <div class="no-data" v-if="addressList.length === 0">
        <svg-icon icon-class="no-data" style="font-size:150px;"/>
        <div class="no-data-btn">
          <van-button @click="onAdd" color="#EE0A24">新增地址</van-button>
        </div>
      </div>
      <div v-else>
        <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chosenAddressId: '',
      addressList: []
    }
  },
  methods: {
    onAdd () {
      this.$router.push({ path: '/user/addAddress' })
    },
    onClickBack () {
      this.$router.go(-1)
    },
    onEdit (item, index) {
      this.$router.push({ name: 'editAddress', params: { id: item.id } })
    },
    init () {
      this.chosenAddressId = ''
      this.$store.dispatch('user/getAddressListByUserId').then(res => {
        let list = res.data
        let arr = []
        list.forEach((item, index) => {
          let tmpArr = {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: item.province + item.city + item.area + ' ' + item.detail_address,
            isDefault: item.default_flag === 1
          }
          if (item.default_flag === 1) {
            this.chosenAddressId = item.id
          }
          arr.push(tmpArr)
        })
        this.addressList = arr
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  watch: {
    $route (to, from) {
      if ((from.name === 'addAddress' || from.name === 'editAddress') && to.name === 'addressList') {
        this.init()
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.address-list{
  padding-top: 46px;
  .address-list-body{
    background: #f5f5f5;
    min-height: calc(100vh - 46px);
    position: relative;
    .no-data{
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      &-btn{
        display: flex;
        width: 100%;
        flex-direction: column;
        position: absolute;
        bottom: 0;
      }
    }
  }
}
</style>
