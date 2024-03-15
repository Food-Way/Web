import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Permite conexões externas
    host: '0.0.0.0',
    // Especifica a porta, opcionalmente, se você quiser forçar uma porta diferente de 5173
    port: 5173,
    // Configurações adicionais do servidor podem ser adicionadas aqui
  },
})
