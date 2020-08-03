/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  title = title ? `${title}-后台管理` : '后台管理'
  window.document.title = title
}
