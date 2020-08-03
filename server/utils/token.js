const crypto = require("crypto");
const secret = "coderly.cn";
const token = {
  createToken: function (payload) {
    let obj2 = {
      data: payload, // payload
      created: parseInt(Date.now() / 1000), // token生成的时间的，单位秒
      // exp: parseInt(timeout) || 10 // token有效期 单位是秒
      exp: 7 * 24 * 60 * 60 // 7天过期
    };
    // payload信息
    let base64Str = Buffer.from(JSON.stringify(obj2), "utf8").toString(
      "base64"
    );
    // 添加签名，防篡改
    let hash = crypto.createHmac("sha256", secret);
    hash.update(base64Str); // 要加密的内容
    let signature = hash.digest("base64"); // 指定加密的编码方式
    return base64Str + "." + signature;
  },
  decodeToken: function (token) {
    let decArr = token.split(".");
    if (decArr.length < 2) {
      // token不合法
      return false;
    }
    let payload = {};
    // 将payload json字符串 解析为对象
    try {
      payload = JSON.parse(Buffer.from(decArr[0], "base64").toString("utf8"));
    } catch (e) {
      return false;
    }
    // 检验签名
    let hash = crypto.createHmac("sha256", secret);
    hash.update(decArr[0]);
    let checkSignature = hash.digest("base64");
    return {
      payload: payload,
      signature: decArr[1],
      checkSignature: checkSignature
    };
  },
  checkToken: function (token) {
    let resDecode = this.decodeToken(token);
    if (!resDecode) {
      return false;
    }
    // 是否过期
    let expState =
      parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created) >
      parseInt(resDecode.payload.exp)
        ? false
        : true;
    if (resDecode.signature === resDecode.checkSignature && expState) {
      return true;
    }
    return false;
  }
};
module.exports = token;
