const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  id: state => state.user.id,
  user_number: state => state.user.user_number,
  name: state => state.user.name || '没有昵称',
  avatar: state => state.user.avatar || 'http://47.106.68.248:3002/uploads/2020042909270405990avatar.jpg.jpeg',
  age: state => state.user.age,
  sex: state => state.user.sex,
  address: state => state.user.address,
  intro: state => state.user.intro || '这个人很懒，什么都没有留下,什么都没有留下',
  balance: state => state.user.balance,
  isShowBack: state => state.utils.isShowBack,
  title: state => state.utils.title,
  shoppingCat: state => state.shoppingcat.shoppingCat,
  isMobilePhone: state => state.utils.isMobilePhone,
  isConnect: state => state.chatmsg.isConnect
}
export default getters
