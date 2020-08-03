export default {
  sku: {
    tree: [
      {
        k: '规格', // skuKeyName：规格类目名称
        k_id: '1',
        v: [
          {
            id: '10001', // skuValueId：规格值 id
            name: '加大', // skuValueName：规格值名称
            imgUrl: 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg' // 规格类目图片，只有第一个规格类目可以定义图片
            // previewImgUrl: 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg' // 用于预览显示的规格类目图片
          }
        ],
        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      }
    ],
    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
    list: [
      {
        id: 1, // skuId，下单时后端需要
        price: 9900, // 价格（单位分）
        s1: '10001', // 规格类目 k_s 为 s1 的对应规格值 id
        s2: '0', // 规格类目 k_s 为 s2 的对应规格值 id
        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
        stock_num: 110 // 当前 sku 组合对应的库存
      }
    ],
    price: '199.99', // 默认价格（单位元）
    stock_num: 227, // 商品总库存
    collection_id: 1, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
    none_sku: false, // 是否无规格商品
    messages: [
      {
        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
        name: '订单备注', // 留言名称
        type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
        placeholder: '选填，请先和卖家协商一致' // 可选值，占位文本
      }
    ],
    hide_stock: false // 是否隐藏剩余库存
  }
}
