<template>
  <div class="">
    <h3 class="biaoti">热门</h3>
    <p class="biaoti-p">这里有我们热度最高的列表推荐</p>
    <ul class="my-column">
      <template v-for="(item, index) in tableData">
        <li class="column-item margin5 flex-bt" :key="index">
          <div>
            <span class="number">{{ index + 1 }}</span>
            <span class="content">{{ item.name }}</span>
          </div>
          <p class="time">{{ item.time }}</p>
        </li>
      </template>
    </ul>
    <el-pagination
        style="text-align:right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTime } from '@/utils/util'
export default {
  name: 'hot',
  data () {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 1000,
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  methods: {
    handleSizeChange (val) {
      this.currentPage = val
      this.init()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    },
    init () {
      this.tableData = []
      const names = ['七夕节', '连衣裙', '情人节礼物', '秋季新款女外套', '男人装', '不规则卫衣女']
      for (let i = 0; i < 20; i++) {
        const item = {
          id: i + 1,
          name: names[Math.floor(Math.random() * names.length)],
          time: getTime().split(' ')[0]
        }
        this.tableData.push(item)
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
h3.biaoti {
  font-size: 17px;
  color: #444;
  padding-left: 10px;
}
p.biaoti-p {
  color: #666;
  font-size: 13px;
  text-indent: 2em;
}
.my-column {
  column-count: 3;
  list-style-type: none;
  li {
    padding: 2px 5px;
    cursor: pointer;
    color: #444;
    font-size: 15px;
    break-inside: avoid;
    span.number {
      color: #fff;
      text-align: center;
      vertical-align: middle;
      line-height: 25px;
      margin: 5px 10px;
      background: #ccc;
      box-shadow: 0px 0px 2px 2px #eee;
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    .time {
      color: #666;
      font-size: 12px;
    }
  }
  li:hover {
    background: rgba(255, 196, 205, 0.1);
    color: rgba(179, 212, 101, 1);
    .time {
      color: rgba(179, 212, 101, 1);
    }
  }
  li:nth-of-type(1) {
    span.number {
      color: #fff;
      background: rgba(237, 84, 107, 1);
      box-shadow: 0px 0px 2px 2px rgba($color: #000000, $alpha: .8);
    }
  }
  li:nth-of-type(2) {
    span.number {
      color: #fff;
      background: rgba(237, 84, 107, .7);
      box-shadow: 0px 0px 2px 2px rgba($color: #000000, $alpha: .6);
    }
  }
  li:nth-of-type(3) {
    span.number {
      color: #fff;
      background: rgba(237, 84, 107, .4);
      box-shadow: 0px 0px 2px 2px rgba($color: #000000, $alpha: .4);
    }
  }
}
@media (max-width:1200px) {
  .my-column {
    column-count: 2;
  }
}
@media (max-width:768px) {
  .my-column {
    column-count: 1;
  }
  /deep/ .el-pager li:not(.active) {
      display: none;
  }
}
</style>
