/**
 * Base64Url 编码（JWT 标准）
 */
function base64urlEncode(str) {
  return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * 生成 JWT Token
 * @param {object} payload 载荷
 * @param {string} secret 密钥
 * @param {object} options 配置，如 expiresIn
 */
function generateJwtWithNodeCrypto(payload, secret, options = {}) {
  // 1. Header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  // 2. 处理过期时间
  const now = Math.floor(Date.now() / 1000)
  const payloadWithExp = {
    ...payload,
    iat: now,
    ...(options.expiresIn && {
      exp: now + parseInt(options.expiresIn),
    }),
  }

  // 3. 编码 Header 和 Payload
  const encodedHeader = base64urlEncode(JSON.stringify(header))
  const encodedPayload = base64urlEncode(JSON.stringify(payloadWithExp))

  // 4. 签名 HMAC-SHA256
  const signature = require('crypto')
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  return `${encodedHeader}.${encodedPayload}.${signature}`
}
