export default {
  data () {
    return {
    }
  },
  filters: {
    formatDate (time) {
      return new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    filterAvatar (avatar) {
      return avatar || 'http://47.106.68.248:3002/uploads/2020042909270405990avatar.jpg.jpeg'
    },
    filterAddress (adress) {
      return adress || '未设置'
    },
    filterIntro (intro) {
      return intro || '这家伙很懒，什么都没有留下'
    },
    filterTime (time) {
      let oldTime = +new Date(time)
      let nowTime = +new Date()
      let differTime = (nowTime - oldTime) / 1000
      let str = ''
      if (differTime > 3 * (30 * 24 * 60 * 60)) {
        let tmp = new Date(time)
        str = (tmp.getMonth() + 1) + '-' + tmp.getDay()
      } else if (differTime > 2 * (30 * 24 * 60 * 60)) { // 大于2个月时间的处理（秒数）
        str = '2个月前'
      } else if (differTime > 30 * 24 * 60 * 60) { // 大于1个月时间的处理（秒数）
        str = '1个月前'
      } else if (differTime > 21 * 24 * 60 * 60) {
        str = '3礼拜前'
      } else if (differTime > 14 * 24 * 60 * 60) {
        str = '2礼拜前'
      } else if (differTime > 7 * 24 * 60 * 60) {
        str = '1礼拜前'
      } else if (differTime > 6 * 24 * 60 * 60) {
        str = '6天前'
      } else if (differTime > 5 * 24 * 60 * 60) {
        str = '5天前'
      } else if (differTime > 4 * 24 * 60 * 60) {
        str = '4天前'
      } else if (differTime > 3 * 24 * 60 * 60) {
        str = '3天前'
      } else if (differTime > 2 * 24 * 60 * 60) {
        str = '2天前'
      } else if (differTime > 1 * 24 * 60 * 60) {
        str = '1天前'
      } else if (differTime > 5 * 60 * 60) {
        str = '5小时前'
      } else if (differTime > 2 * 60 * 60) {
        str = '2小时前'
      } else if (differTime > 60 * 60) {
        str = '1小时前'
      } else if (differTime > 10 * 60) {
        str = '10分钟前'
      } else if (differTime > 5 * 60) {
        str = '5分钟前'
      } else if (differTime > 3 * 60) {
        str = '3分钟前'
      } else if (differTime > 2 * 60) {
        str = '2分钟前'
      } else if (differTime > 60) {
        str = '1分钟前'
      } else {
        str = '刚刚'
      }
      return str
    },
    filterCoupon (coupon) {
      if (coupon === 0) {
        return '还没人买'
      } else if (coupon < 10) {
        return '月售' + coupon
      } else {
        return '月售' + coupon + '+'
      }
    }
  }
}
