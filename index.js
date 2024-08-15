import * as mupdf from "mupdf"

const filename = './pdfdir./ครั้งที่ 3 (พฤ.8 ต.ค.58).pdf'
const file = Bun.file(filename)
const buffer = await file.arrayBuffer()
const doc = mupdf.Document.openDocument(buffer, "application/pdf")

let i = 0
// while (i < doc.countPages()) {
  const page = doc.loadPage(i)
  console.log(mupdf.Matrix.identity)
  console.log(mupdf.ColorSpace.DeviceGray)

  let pixmap = page.toPixmap(mupdf.Matrix.scale(2.2, 2.2), mupdf.ColorSpace.DeviceGray, false, true)
  let pngImage = pixmap.asPNG()
  await Bun.write(`./pages/${i}.png`, Buffer.from(pngImage, 'binary'))
  i++
// }