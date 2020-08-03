<template>
  <van-address-edit
    :address-info="addressInfo"
    :area-list="areaList"
    show-postal
    show-delete
    show-set-default
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
  />
</template>
<script>
import areaList from '@/assets/data/areaList.js'
export default {
  data () {
    return {
      areaList: areaList,
      addressInfo: {
        addressDetail: '1234',
        areaCode: '140406',
        city: '长治市',
        country: '',
        county: '潞城区',
        isDefault: true,
        name: '1',
        postalCode: '345122',
        province: '山西省',
        tel: '18896789560'
      }
    }
  },
  methods: {
    onSave (content) {
      console.log(content)
      this.$toast('保存成功')
    },
    onDelete () {
      this.$toast('删除成功')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
