// import shoppingCat from '@/utils/shoppingCat.js'
import Shopping from '@/model/shopping'
import { getShoppingCat, setShoppingCat } from '@/utils/auth.js'
import { getProductList, getProductDetailById, toBuyProducts } from '@/api/product'
const state = {
  shoppingCat: getShoppingCat() || [],
  totalPrice: 0,
  selectP: [],
  flag: true
}
const mutations = {
  ADD_NEW_P (state, payload) {
    // 添加新的产品
    state.shoppingCat.push(payload.product)
    setShoppingCat(state.shoppingCat)
  },
  REMOVE_P (state, payload) {
    // 移除产品
    state.shoppingCat.splice(payload.index, payload.number)
    setShoppingCat(state.shoppingCat)
  },
  CHANGE_P (state, payload) {
    let index = parseInt(payload.index)
    // 修改某个产品
    let oldP = state.shoppingCat.slice(index, index + 1)
    oldP = oldP[0] // 获取第一个实例
    let { id, price, number, title, img, tags } = oldP
    oldP = new Shopping({ id, price, title, number, img, tags })
    oldP.changeNumber(payload.number)
    state.shoppingCat.splice(index, 1, oldP)
    setShoppingCat(state.shoppingCat)
  },
  CHANGE_SELECT_P (state, payload) {
    state.selectP = payload.selectArr
    setShoppingCat(state.shoppingCat)
  },
  CHANGE_TOTALPRICE (state, { totalPrice }) {
    state.totalPrice = totalPrice
    setShoppingCat(state.shoppingCat)
  },
  DELETE_ITEM (state, { index }) {
    state.shoppingCat.splice(index, 1)
    setShoppingCat(state.shoppingCat)
  }
}
const actions = {
  addProduct ({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      try {
        let pModel = payload.pModel
        let newP = new Shopping({ id: pModel.id, price: pModel.price, title: pModel.title, number: pModel.number, img: pModel.img, tags: pModel.tags, message: pModel.message })
        let index = getters.findProductIndex(pModel.id)
        if (index !== -1) { // 产品已存在
          let oldP = getters.findProduct(pModel.id)
          let newNum = parseInt(oldP.number) + parseInt(pModel.number)
          commit('CHANGE_P', { index, number: newNum })
          oldP = getters.findProduct(pModel.id)
          resolve(oldP)
        } else {
          commit('ADD_NEW_P', { product: newP })
          resolve(newP)
        }
      } catch (err) {
        reject(new Error(err))
      }
    })
  },
  removeProduct ({ commit, getters }, payload) {
    let pId = payload.id
    if (getters.isHaveProduct(pId)) {
      let index = getters.findProductIndex(pId)
      commit('REMOVE_P', { index, number: 1 })
      return true
    } else {
      return false
    }
  },
  changeNumber ({ commit, getters }, payload) {
    console.log(payload)
    try {
      let pId = payload.id
      let number = payload.number
      if (getters.isHaveProduct(pId)) {
        let oldProduct = getters.findProduct(pId)
        let newNum = parseInt(oldProduct.number) + number
        let index = getters.findProductIndex(pId)
        commit('CHANGE_P', { index, number: newNum })
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  },
  toggleSetlectAll ({ commit, getters }, { checkAll }) {
    let selectArr = []
    if (checkAll) {
      let ps = getters.getCat
      ps.forEach(ele => {
        selectArr.push(String(ele.id))
      })
    }
    commit('CHANGE_SELECT_P', { selectArr, souce: 'toggleSetlectAll' })
  },
  selectChangeById ({ commit, getters }, payload) {
    let { type, pId } = payload
    let selectArr = getters.getSelectP
    switch (type) {
      case 'add':
        if (selectArr.indexOf(String(pId)) === -1) {
          selectArr.push(String(pId))
          commit('CHANGE_SELECT_P', { selectArr, souce: 'selectChangeById+++add' })
        }
        break
      case 'del':
        if (selectArr.indexOf(String(pId)) > -1) {
          let index = selectArr.indexOf(String(pId))
          selectArr.splice(index, 1)
          commit('CHANGE_SELECT_P', { selectArr, souce: 'selectChangeById--- del' })
        }
        break
      default:
        break
    }
  },
  deleteProductById ({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      try {
        let id = String(payload.id)
        let index = getters.findProductIndex(id)
        let selec = getters.getSelectP
        if (index !== -1) {
          commit('DELETE_ITEM', { index })
          if (selec.indexOf(String(id)) !== -1) {
            selec.splice(selec.indexOf(String(id)), 1)
            commit('CHANGE_SELECT_P', { selectArr: selec })
          }
          resolve()
        } else {
          reject(new Error('不存在'))
        }
      } catch (err) {
        reject(new Error(err))
      }
    })
  },
  getProductList ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getProductList(payload).then(res => {
        console.log(res)
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getProductDetailById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getProductDetailById({ p_id: id }).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('查询出错'))
        }
        resolve(res)
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  toBuyProducts ({ commit, getters, dispatch }, address) {
    let shoppingCat = getters.getCat
    let selectArr = getters.getSelectP
    let productList = []
    shoppingCat.forEach(item => {
      if (selectArr.indexOf(item.id) > -1) {
        let product = { id: item.id, number: item.number, message: item.message, addressId: address.id, address: address.address }
        productList.push(product)
      }
    })
    return new Promise((resolve, reject) => {
      toBuyProducts(productList).then(async res => {
        if (res.code === 1) {
          await productList.forEach(async (item) => {
            await dispatch('removeProduct', item)
          })
          resolve(res)
        } else {
          reject(new Error(res.msg))
        }
        resolve(res)
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  // 买东西交易完成了，将选中的删除以及加入购物车的相应产品删除
  successToBuyProducts ({ commit, getters, dispatch }) {
    let shoppingCat = getters.getCat
    let selectArr = getters.getSelectP
    selectArr.forEach(ele => {
      let index = -1
      index = shoppingCat.indexOf(e => e.id === ele)
      if (index > -1) {
        commit('DELETE_ITEM', { index })
      }
    })
  },
  toBuySingleProduct ({ commit, getters, dispatch }, product) {
    return new Promise((resolve, reject) => {
      let arr = []
      arr.push(product)
      toBuyProducts(arr).then(async res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error(res.msg))
        }
        resolve(res)
      }).catch(err => {
        reject(new Error(err))
      })
    })
  }
}
const getters = {
  findProduct (state) {
    return function (pId) {
      let haveProduct = null
      state.shoppingCat.some(item => {
        if (item.id === pId) {
          haveProduct = item
          return true
        }
      })
      return haveProduct
    }
  },
  isHaveProduct (state) {
    return function (pId) {
      let isHave = state.shoppingCat.some(item => {
        return item.id === pId
      })
      return isHave
    }
  },
  findProductIndex (state, getters) {
    return function (pId) {
      let isHaveIndex = -1
      if (getters.isHaveProduct(pId)) {
        state.shoppingCat.some((item, index) => {
          if (item.id === pId) {
            isHaveIndex = index
            return true
          }
        })
      }
      return isHaveIndex
    }
  },
  getSelectTotal (state, getters, commit) {
    let arr = state.selectP
    let totalPrice = 0
    if (state.selectP.length > 0) {
      totalPrice = state.shoppingCat.reduce((total, item) => {
        if (arr.indexOf(item.id) !== -1) {
          return total + item.totalPrice
        } else {
          return total
        }
      }, 0)
    }
    // commit('CHANGE_TOTALPRICE', { totalPrice })
    return totalPrice
  },
  getSelectP (state) {
    return state.selectP
  },
  getCat (state) {
    return state.shoppingCat
  },
  isSelectAll (state) {
    return (state.shoppingCat.length === state.selectP.length) && state.selectP.length !== 0
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
