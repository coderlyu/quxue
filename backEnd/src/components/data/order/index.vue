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
            label="用户"
            min-width="100">
            <template slot-scope="scope">
              <a href="javascript:void(0);" @click="toUserDetail(scope.row.User[0])">{{ scope.row.User[0].name }}</a>
            </template>
          </el-table-column>
          <el-table-column
            property="name"
            label="商品"
            min-width="200">
            <template slot-scope="scope">
              <a href="javascript:void(0);" @click="toProductDetail(scope.row.Product[0])">{{ scope.row.Product[0].name }}</a>
            </template>
          </el-table-column>
          <el-table-column
            property="price"
            label="单价(￥)"
            min-width="100">
          </el-table-column>
          <el-table-column
            property="total_price"
            label="总格(￥)"
            min-width="100">
          </el-table-column>
          <el-table-column
            property="create_time"
            label="创建日期"
            min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.create_time | filterTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            property="info"
            label="备注"
            min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.info ? scope.info : '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="60">
            <template slot-scope="scope">
              <!-- <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" circle></el-button> -->
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template v-else>
      <h3>订单列表</h3>
      <order-item @delete="handleDelete" :tableData="tableData" @toUserDetail="toUserDetail" @toProductDetail="toProductDetail"  />
    </template>
    <div class="margin20 over-flow-auto flex-dc-end">
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
    <!-- 用户详情 -->
    <user-detail :isShow="showUserDetail" @cancelDetail="cancelUserDetail" :item="userItem" />
    <!-- 商品详情 -->
    <product-detail :isShow="showProductDetail" @cancelDetail="cancelProductDetail" :item="productItem" />
    <!-- 订单编辑 -->
    <!-- <edit :isShow="showEditDialog" :item="item" @confirmEdit="confirmEdit" @cancelEdit="cancelEdit" /> -->
  </div>
</template>

<script>
import mixin from '@/utils/mixins'
import { mapGetters } from 'vuex'
import userDetail from '@/components/data/user/detail.vue'
import productDetail from '@/components/data/product/detail.vue'
// import edit from '@/components/data/product/edit.vue'
import orderItem from '@/components/data/order/order-item.vue'
import search from '@/components/data/order/search.vue'
export default {
  name: 'orders',
  components: {
    userDetail,
    productDetail,
    // edit,
    orderItem,
    search
  },
  mixins: [mixin],
  data () {
    return {
      tableData: [],
      showUserDetail: false,
      showProductDetail: false,
      showEditDialog: false,
      total: 1000,
      pageSize: 10,
      currentPage: 1,
      item: {
        id: '',
        info: '',
        status: '',
        create_time: '',
        number: '',
        price: '',
        total_price: '',
        User: [{
          id: '',
          name: '',
          avatar: '',
          create_time: ''
        }],
        Product: [{
          id: '',
          name: '',
          imgUrl: '',
          imageList: [],
          create_time: ''
        }],
        Address: [{
          id: '',
          name: '',
          phone: '',
          detail_address: ''
        }]
      },
      userItem: {
        id: '',
        name: '',
        avatar: '',
        create_time: ''
      },
      productItem: {
        id: '',
        name: '',
        imgUrl: '',
        imageList: [],
        create_time: ''
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
      this.$store.dispatch('product/getOrderList', query).then(res => {
        const { data } = res
        this.tableData = data
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
    toUserDetail (item) {
      this.userItem = item
      this.showUserDetail = true
    },
    toProductDetail (item) {
      this.productItem = item
      this.showProductDetail = true
    },
    cancelUserDetail () {
      if (this.showUserDetail) {
        this.showUserDetail = false
      }
      this.clearItem()
    },
    cancelProductDetail () {
      if (this.showProductDetail) {
        this.showProductDetail = false
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
        info: '',
        status: '',
        create_time: '',
        number: '',
        price: '',
        total_price: '',
        User: [{
          id: '',
          name: '',
          avatar: '',
          create_time: ''
        }],
        Product: [{
          id: '',
          name: '',
          imgUrl: '',
          imageList: [],
          create_time: ''
        }],
        Address: [{
          id: '',
          name: '',
          phone: '',
          detail_address: ''
        }]
      }
      this.userItem = {
        id: '',
        name: '',
        avatar: '',
        create_time: ''
      }
      this.productItem = {
        id: '',
        name: '',
        imgUrl: '',
        imageList: [],
        create_time: ''
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
