export default class Message {
  type = ''
  time = new Date( + new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  content = ''
  constructor ({ type, content}) {
    this.type = type
    this.content = content
  }
}
