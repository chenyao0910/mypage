import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/mypage/",
  plugins: [vue(),
  createSvgIconsPlugin({
                         iconDirs: [path.resolve(process.cwd(), 'src/icons')],
                         symbolId: 'icon-[dir]-[name]',
                       }),
  ]
})
