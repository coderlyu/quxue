class Shopping {
  id = ''
  price = ''
  totalPrice = 0
  number = 0
  img = ''
  title = ''
  tags = '热销'
  message = ''
  constructor ({ id, price, number, img, tags, title, message }) {
    this.id = id
    this.price = price
    this.number = parseInt(number)
    this.img = img
    this.title = title
    this.tags = tags
    this.message = message
    this.initTotalPrice()
  }
  initTotalPrice () {
    this.totalPrice = parseInt(this.price) * parseInt(this.number)
  }
  changeNumber (number) {
    try {
      this.number = number
      this.initTotalPrice()
      return true
    } catch (e) {
      return false
    }
  }
  getProductId () {
    return this.id
  }
  changeChecked (checked) {
    try {
      this.checked = checked
      return true
    } catch (e) {
      return false
    }
  }
}
export default Shopping
