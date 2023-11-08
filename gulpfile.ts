import { src, dest, series } from 'gulp'
import axios from 'axios'
const file = require('gulp-file')

async function convertBlogToMarkdowns(cb: any) {
  try {
    const { data } = await axios('https://affine.pro/api/blog')
    const pages = data.pages
    if (!pages || !pages.length) {
      throw new Error('No pages')
    }
    pages
      .filter((page: any) => page.publish)
      .map((page: any, index: number) => {
        return src('/content/*')
          .pipe(file(`${page.slug}.json`, JSON.stringify(page, null, 2)))
          .pipe(dest('./content/blog'))
      })
  } catch (error) {
    console.log('convertBlogToMarkdowns error', error)
    throw error
  }
  cb()
}

exports.default = series(convertBlogToMarkdowns)
