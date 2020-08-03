const getters = {
  leftOpen: state => state.app.leftOpen,
  isMobile: state => state.app.isMobile,
  isLoading: state => state.app.isLoading,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  age: state => state.user.age,
  sex: state => state.user.sex,
  address: state => state.user.address,
  phone: state => state.user.phone,
  likes: state => state.user.likes,
  user: state => state.user.user,
  token: state => state.user.token
}
export default getters
