<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <div class="bg-white padd20 margin5 borderra4">
        <bar-graph />
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <div class="bg-white padd20 margin5 borderra4">
        <candle-chart />
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <div class="bg-white padd20 margin5 borderra4">
        <columnar />
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <div class="bg-white padd20 margin5 borderra4">
        <discount-figure />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import barGraph from '@/components/charts/barGraph'
import candleChart from '@/components/charts/candleChart'
import columnar from '@/components/charts/columnar'
import DiscountFigure from '@/components/charts/DiscountFigure'
export default {
  name: 'charts',
  components: {
    barGraph,
    candleChart,
    columnar,
    DiscountFigure
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
