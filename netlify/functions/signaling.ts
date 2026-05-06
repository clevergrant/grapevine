import { getStore } from '@netlify/blobs'
import { createSignalingHandler, createBlobsStore } from 'easy-p2p-netcode/signaling'

const blobs = getStore({ name: 'grapevine-lobbies', consistency: 'strong' })
const store = createBlobsStore({
  async get(key, opts) {
    if (opts?.type === 'json') return await blobs.get(key, { type: 'json' })
    return await blobs.get(key)
  },
  async setJSON(key, value) {
    await blobs.setJSON(key, value)
  },
  async delete(key) {
    await blobs.delete(key)
  },
})

const handler = createSignalingHandler({ store })

export default async function (request: Request): Promise<Response> {
  return handler(request)
}
