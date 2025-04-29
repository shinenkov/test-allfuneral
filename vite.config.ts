import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const mockHOST = env.MOCK_HOST
  const proxyConfigLocal = {
    '/proxy': {
      target: mockHOST,
      changeOrigin: true,
      rewrite: (path: string ) => path.replace(/\/proxy/, '')
    },
  }

  return {
    plugins: [react(), svgr()],
    define: {
      "process.env": env,
    },
    server: {
      port: env.PORT as unknown as number,
      proxy: proxyConfigLocal
    }
  }
})
