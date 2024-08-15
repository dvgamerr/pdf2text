
import { createWorker } from 'tesseract.js'
import * as mupdf from "mupdf"
import pino from 'pino'

const logger = pino({ level: Bun.env.DEBUG || 'info' })
const filename = './pdfdir/ครั้งที่ 3 (พฤ.8 ต.ค.58).pdf'
const file = Bun.file(filename)
const buffer = await file.arrayBuffer()
const doc = mupdf.Document.openDocument(buffer, "application/pdf")

const zoom = 2.2

let i = 0
// while (i < doc.countPages()) {
const page = doc.loadPage(i)
const pixmap = page.toPixmap(mupdf.Matrix.scale(zoom, zoom), mupdf.ColorSpace.DeviceGray, false, true)
await Bun.write(`./pdfdir/pages/${i}.png`, Buffer.from(pixmap.asPNG(), 'binary'))
// }

const worker = await createWorker('tha', 1);

logger.info('Processing')

const { data: { text, hocr } } = await worker.recognize(`./pdfdir/pages/${i}.png`);

await Bun.write(`./pdfdir/pages/${i}.text.txt`, text)
await Bun.write(`./pdfdir/pages/${i}.hocr.txt`, hocr)
await worker.terminate();

logger.info('Finish')
