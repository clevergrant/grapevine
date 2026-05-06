import { el, mount, text } from '../dom.ts'
import type { PlayerSummary } from '../protocol.ts'
import { MAX_PLAYERS, MIN_PLAYERS } from '../game/colors.ts'

export interface LobbyProps {
  code: string
  players: ReadonlyArray<PlayerSummary>
  isHost: boolean
  onStart?: () => void
}

export function renderLobby(root: HTMLElement, props: LobbyProps): void {
  const slots: HTMLElement[] = []
  for (let i = 0; i < MAX_PLAYERS; i += 1) {
    const player = props.players[i]
    if (player) {
      slots.push(el('div', { class: `player-row ${player.color}` }, [text(player.name)]))
    } else {
      slots.push(el('div', { class: 'player-row waiting' }, [text('waiting to join')]))
    }
  }

  const canStart = props.isHost && props.players.length >= MIN_PLAYERS
  const startButton = props.isHost
    ? el(
        'button',
        {
          class: 'start',
          disabled: !canStart,
          onclick: () => {
            if (canStart && props.onStart) props.onStart()
          },
        },
        [text('Start Game')],
      )
    : el('span', {}, [])

  const header = el('div', { class: 'lobby-header' }, [
    el('span', { class: 'code' }, [text(props.code)]),
    startButton,
  ])

  mount(root, el('div', { class: 'lobby-screen' }, [header, ...slots]))
}
