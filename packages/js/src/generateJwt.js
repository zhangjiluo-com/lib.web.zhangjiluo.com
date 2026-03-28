function base64url(buffer) {
  return Buffer.from(buffer).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * 生成 JWT（HS256）
 * @param {object} payload 载荷
 * @param {string} secret 密钥
 * @param {object} options 过期时间等
 */
async function generateJwt(payload, secret, options = {}) {
  const encoder = new TextEncoder()

  // 1. Header
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = base64url(encoder.encode(JSON.stringify(header)))

  // 2. 加入过期时间
  const now = Math.floor(Date.now() / 1000)
  const fullPayload = {
    ...payload,
    iat: now,
    ...(options.expiresIn && { exp: now + options.expiresIn }),
  }
  const encodedPayload = base64url(encoder.encode(JSON.stringify(fullPayload)))

  // 3. 使用 Web Crypto API 生成 HMAC-SHA256 签名
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ])

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${encodedHeader}.${encodedPayload}`))

  const encodedSignature = base64url(signature)

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
}
