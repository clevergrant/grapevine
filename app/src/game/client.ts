import { createClient, type Client, type EventMessage } from 'easy-p2p-netcode'
import { protocol, type Protocol } from '../protocol.ts'

export interface ClientHandle {
  client: Client<Protocol>
  close(): Promise<void>
}

export interface ClientStartOptions {
  signalingUrl: string
  lobbyCode: string
  onEvent: (event: EventMessage<Protocol>) => void
  onDisconnect?: () => void
}

export async function startClient(opts: ClientStartOptions): Promise<ClientHandle> {
  const client = await createClient<Protocol>({
    signalingUrl: opts.signalingUrl,
    lobbyCode: opts.lobbyCode,
    protocol,
    onEvent: opts.onEvent,
    ...(opts.onDisconnect !== undefined && { onDisconnect: opts.onDisconnect }),
    onError: (reason) => {
      console.warn(`client error: ${reason}`)
    },
  })

  return {
    client,
    async close() {
      await client.close()
    },
  }
}
