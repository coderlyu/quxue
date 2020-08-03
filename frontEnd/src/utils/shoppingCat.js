// import Shopping from '@/model/shopping.js'
class ShoppingCat {
  shoppingList = []
  constructor () {
    this.shoppingList = []
  }
  addProduct (product) {
    if (this.isHaveProduct(product.id)) {
      return false
    } else {
      this.shoppingList.push(product)
      return true
    }
  }
  removeProduct (pId) {
    if (this.isHaveProduct(pId)) {
      let index = this.findProductIndex(pId)
      this.shoppingList.splice(index, 1)
    } else {
      return false
    }
  }
  findProduct (pId) {
    let haveProduct = null
    this.shoppingList.some(item => {
      if (item.id === pId) {
        haveProduct = item
        return true
      }
    })
    return haveProduct
  }
  isHaveProduct (pId) {
    let isHave = this.shoppingList.some(item => {
      return item.id === pId
    })
    return isHave
  }
  findProductIndex (pId) {
    let isHaveIndex = -1
    if (this.isHaveProduct(pId)) {
      this.shoppingList.some((item, index) => {
        if (item.id === pId) {
          isHaveIndex = index
          return true
        }
      })
    }
    return isHaveIndex
  }
  getShoppingList () {
    return this.shoppingList
  }
  changeNumber (pId, number) {
    if (this.isHaveProduct(pId)) {
      let oldProduct = this.findProduct(pId)
      if (oldProduct.changeNumber(number)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
export default ShoppingCat
