import indexHtml from './app/index.html'

const server = Bun.serve({
  port: 3000,
  development: true,
  routes: {
    '/': indexHtml,
    '/api/signaling': async (req) => {
      const { default: handler } = await import('./netlify/functions/signaling.ts')
      return handler(req)
    },
  },
  fetch() {
    return new Response('Not found', { status: 404 })
  },
})

console.log(`Dev server: http://localhost:${server.port}`)
