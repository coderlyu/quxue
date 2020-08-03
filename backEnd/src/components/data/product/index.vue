<template>
  <div class="over-flow-auto bg-white padd10 borderra4">
    <search @toSearch="toSearch" @resetForm="resetSearchForm" @exportExcel="exportExcel" />
    <template v-if="!isMobile">
      <div class="borderra4">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          size="mini"
          >
          <el-table-column
            type="index"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            property="name"
            label="商品名"
            min-width="180">
            <template slot-scope="scope">
              <a href="javascript:void(0);" @click="toDetail(scope.row)">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column
            property="sell_number"
            label="销量"
            min-width="100">
          </el-table-column>
          <el-table-column
            property="stock"
            label="库存"
            min-width="100">
          </el-table-column>
          <el-table-column
            property="create_time"
            label="创建日期"
            min-width="160">
            <template slot-scope="scope">
              <span>{{scope.row.create_time | filterTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            property="price"
            label="价格(￥)"
            min-width="100">
          </el-table-column>
          <el-table-column
            property="coupon"
            label="优惠(￥)"
            min-width="100">
          </el-table-column>
          <el-table-column label="操作" min-width="110">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template v-else>
      <h3>用户列表</h3>
      <product-item @delete="handleDelete" @edit="handleEdit" :tableData="tableData" @toDetail="toDetail" />
    </template>
    <div class="margin20 over-flow-auto flex-dc-end">
      <!-- <p>共<span class="margin5 tag-red tag">{{ total }}</span>条</p> -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        :pager-count="5"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!-- 商品详情 -->
    <detail :isShow="showDetailDialog" @cancelDetail="cancelDetail" :item="item" />
    <!-- 商品编辑 -->
    <edit :isShow="showEditDialog" :item="item" @confirmEdit="confirmEdit" @cancelEdit="cancelEdit" />
  </div>
</template>

<script>
import mixin from '@/utils/mixins'
import { mapGetters } from 'vuex'
import detail from '@/components/data/product/detail.vue'
import edit from '@/components/data/product/edit.vue'
import productItem from '@/components/data/product/product-item.vue'
import search from '@/components/data/product/search.vue'
export default {
  name: 'products',
  components: {
    detail,
    edit,
    productItem,
    search
  },
  mixins: [mixin],
  data () {
    return {
      tableData: [],
      showDetailDialog: false,
      showEditDialog: false,
      total: 1000,
      pageSize: 10,
      currentPage: 1,
      item: {
        id: '',
        price: '',
        name: '',
        old_price: '',
        info: '',
        stock: '',
        create_time: '',
        imgUrl: '',
        coupon: '',
        sell_number: '',
        imageList: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  methods: {
    init () {
      this.tableData = []
      const query = {
        page: this.currentPage,
        number: this.pageSize
      }
      this.$store.dispatch('product/getProductList', query).then(res => {
        const { data } = res
        this.tableData = data.map((item) => {
          item.fileList = item.imageList.map((url, index) => ({ name: index, url: url }))
          return item
        })
        this.total = res.total
      }).catch(err => {
        this.$notify({
          title: '错误',
          message: err.message,
          type: 'error',
          duration: 1000
        })
      })
    },
    toSearch (form) {
      console.log('查询', form)
      this.init()
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    resetSearchForm () {
      this.init()
      this.currentPage = 1
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.init()
    },
    toDetail (item) {
      this.item = item
      this.showDetailDialog = true
    },
    cancelDetail () {
      if (this.showDetailDialog) {
        this.showDetailDialog = false
      }
      this.clearItem()
    },
    cancelEdit () {
      if (this.showEditDialog) {
        this.showEditDialog = false
      }
      this.clearItem()
    },
    confirmEdit (item) {
      var index = this.tableData.findIndex(e => e.id === item.id)
      if (index > -1) {
        this.tableData.splice(index, 1, item)
      }
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this.cancelEdit()
    },
    clearItem () {
      this.item = {
        id: '',
        price: '',
        name: '',
        old_price: '',
        info: '',
        stock: '',
        create_time: '',
        imgUrl: '',
        coupon: '',
        sell_number: '',
        imageList: []
      }
    },
    handleEdit (item) {
      this.item = item
      this.showEditDialog = true
    },
    handleDelete (id) {
      var index = this.tableData.findIndex(e => e.id === id)
      if (index > -1) {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.color0 {
  color: #ED546B;
}
.color1 {
  // color: #99beff;
  color: #B3D465;
}
.color2 {
  color: #4192F3;
}
a:hover {
  color: rgba(237, 84, 107, .4);
  border-bottom: 1px dotted rgba(237, 84, 107, 1);
}
@media (max-width:768px) {
  /deep/ .el-pager li:not(.active) {
      display: none;
  }
}

</style>
