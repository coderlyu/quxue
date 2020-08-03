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
            label="昵称"
            min-width="100">
            <template slot-scope="scope">
              <a href="javascript:void(0);" @click="toDetail(scope.row)">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column
            property="sex"
            label="性别"
            min-width="100">
            <template slot-scope="scope">
              <p :class="'color' + scope.row.sex">
                {{ scope.row.sex > 1 ? '未知': (scope.row.sex === 1 ? '男': '女')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            property="user_number"
            label="用户名/账号"
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
            property="intro"
            label="简介"
            min-width="150">
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
      <user-item @delete="handleDelete" @edit="handleEdit" :tableData="tableData" @toDetail="toDetail" />
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
    <!-- 用户详情 -->
    <detail :isShow="showDetailDialog" @cancelDetail="cancelDetail" :item="item" />
    <!-- 用户编辑 -->
    <edit :isShow="showEditDialog" :item="item" @confirmEdit="confirmEdit" @cancelEdit="cancelEdit" />
  </div>
</template>

<script>
import mixin from '@/utils/mixins'
import { mapGetters } from 'vuex'
import detail from '@/components/data/user/detail.vue'
import edit from '@/components/data/user/edit.vue'
import userItem from '@/components/data/user/user-item.vue'
import search from '@/components/data/user/search.vue'
export default {
  name: 'users',
  components: {
    detail,
    edit,
    userItem,
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
        age: '',
        name: '',
        user_number: '',
        intro: '',
        balance: '',
        create_time: '',
        avatar: '',
        sex: ''
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
      this.$store.dispatch('user/getUserList', query).then(res => {
        this.tableData = res.data
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
    exportExcel () {
      this.$confirm('该操作将导出所有的数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        require.ensure([], () => {
          const { exportJsonToExcel } = require('../../excel/Export2Excel')
          const tHeader = ['编号', '姓名', '年龄', '用户名', '密码', '性别', '电话号码', '头像', '地址', '创建时间'] // 设置Excel的表格第一行的标题
          const filterVal = ['id', 'name', 'age', 'userNumber', 'password', 'sex', 'phone', 'avatar', 'address', 'date'] // index、nickName、name是tableData里对象的属性
          const list = this.tableData // 把data里的tableData存到list
          const data = this.formatJson(filterVal, list)
          exportJsonToExcel(tHeader, data, '教师列表') // 导出Excel 文件名
        })
        this.$message({
          type: 'success',
          message: '导出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        })
      })
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
        age: '',
        name: '',
        user_number: '',
        intro: '',
        balance: '',
        create_time: '',
        avatar: '',
        sex: ''
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
