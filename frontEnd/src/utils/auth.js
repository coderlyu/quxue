const shoppingCat = 'shoppingCat'
const TokenKey = 'quwan-token'
const ChatList = 'ChatList'
// tooken
export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}

// 购物车
export function getShoppingCat () {
  return JSON.parse(localStorage.getItem(shoppingCat))
}

export function setShoppingCat (newCat) {
  return localStorage.setItem(shoppingCat, JSON.stringify(newCat))
}

export function removeShoppingCat () {
  return localStorage.removeItem(shoppingCat)
}

// 聊天记录
export function getChatList () {
  return JSON.parse(localStorage.getItem(ChatList))
}

export function setChatList (newChatList) {
  return localStorage.setItem(ChatList, JSON.stringify(newChatList))
}

export function removeChatList () {
  return localStorage.removeItem(ChatList)
}
