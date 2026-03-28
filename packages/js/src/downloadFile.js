async function downloadFile(url, outputPath) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`下载失败: ${res.status} ${res.statusText}`)
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  await require('fs/promises').mkdir(require('path').dirname(outputPath), { recursive: true })
  await require('fs/promises').writeFile(outputPath, buffer)

  console.log('下载完成:', outputPath)
  return outputPath
}
