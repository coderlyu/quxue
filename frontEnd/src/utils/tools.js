export function dataURLtoBlob (dataURL, type) { // 将base64转换为blob
  var binary = atob(dataURL.split(',')[1])
  var array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: type })
}
export function dataURLtoFile (dataurl, filename) { // 将base64转换为文件
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
export function blobToFile (theBlob, fileName) {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return theBlob
}

// export function dataURLtoFile(dataurl, filename) {
//   var arr = dataurl.split(',')
//   var mime = arr[0].match(/:(.*?);/)[1]
//   var bstr = window.atob(arr[1])
//   var n = bstr.length
//   var u8arr = new Uint8Array(n)
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n)
//   }
//   var blob = new Blob([u8arr], { type: mime })
//   blob.lastModifiedDate = new Date()
//   blob.name = filename
//   return blob
// }
