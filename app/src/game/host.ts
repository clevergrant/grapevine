import { createHost, type Host } from 'easy-p2p-netcode'
import { protocol, type Protocol } from '../protocol.ts'

export interface HostHandle {
  host: Host<Protocol>
  close(): Promise<void>
}

export interface HostStartOptions {
  signalingUrl: string
  hostName: string
  onLobbyChange: () => void
}

export async function startHost(opts: HostStartOptions): Promise<HostHandle> {
  // TODO: state machine for game phases, intent dispatch, event broadcast.
  const host = await createHost<Protocol>({
    signalingUrl: opts.signalingUrl,
    protocol,
    onPeerJoined: () => opts.onLobbyChange(),
    onPeerLeft: () => opts.onLobbyChange(),
    onIntent: (_peerId, _intent) => {
      // TODO: dispatch by intent.type, mutate game state, broadcast events
    },
    onError: (peerId, reason) => {
      console.warn(`peer ${peerId} error: ${reason}`)
    },
  })

  return {
    host,
    async close() {
      await host.close()
    },
  }
}
