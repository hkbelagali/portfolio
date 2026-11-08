import { fileURLToPath, URL } from 'node:url'
import { execFileSync } from 'node:child_process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Read the checked-out commit, including in GitHub Actions' shallow checkout.
// Never substitute the build date: an archive without Git history has no known date.
let lastCommitDate = ''
try {
  lastCommitDate = execFileSync('git', ['log', '-1', '--format=%cI'], {
    cwd: fileURLToPath(new URL('.', import.meta.url)),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })
    .trim()
    .slice(0, 10)
} catch {
  console.warn('Git history unavailable; last updated date will be omitted.')
}

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_LAST_COMMIT_DATE': JSON.stringify(lastCommitDate),
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
})
