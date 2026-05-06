import { renderTitle } from './views/title.ts'

const root = document.getElementById('root')
if (!root) throw new Error('missing #root element')

const SIGNALING_URL = '/api/signaling'

renderTitle(root, {
  onCreate: (name) => {
    // TODO: const handle = await startHost({ signalingUrl: SIGNALING_URL, hostName: name, ... })
    console.log('TODO: create lobby for', name, 'via', SIGNALING_URL)
  },
  onJoin: (code, name) => {
    // TODO: const handle = await startClient({ signalingUrl: SIGNALING_URL, lobbyCode: code, ... })
    console.log('TODO: join lobby', code, 'as', name, 'via', SIGNALING_URL)
  },
})
