import { el } from '../dom.ts'
import { PLAYER_COLORS } from '../game/colors.ts'

export function rainbow(): HTMLElement {
  return el(
    'div',
    { class: 'rainbow' },
    PLAYER_COLORS.map((c) => el('div', { class: `stripe swatch-${c}` }, [])),
  )
}
