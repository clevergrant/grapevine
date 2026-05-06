import { el, mount, text } from '../dom.ts'
import type { FinalScore } from '../protocol.ts'

const DARK_FG_COLORS = new Set(['yellow', 'lime', 'blue'])

export interface ResultsProps {
  scores: ReadonlyArray<FinalScore>
  isHost: boolean
  onPlayAgain?: () => void
}

export function renderResults(root: HTMLElement, props: ResultsProps): void {
  const max = Math.max(1, ...props.scores.map((s) => s.points))
  const rows = props.scores.map((s) => {
    const fillPercent = Math.round((s.points / max) * 100)
    const rowClass = `result-row${DARK_FG_COLORS.has(s.color) && fillPercent > 50 ? ' fg-dark' : ''}`
    return el('div', { class: rowClass }, [
      el('div', { class: `bar swatch-${s.color}`, style: `width: ${fillPercent}%` }, []),
      el('span', { class: 'name' }, [text(s.name)]),
      el('span', { class: 'points' }, [text(String(s.points))]),
    ])
  })

  const playAgain = props.isHost
    ? el(
        'button',
        {
          class: 'play-again',
          onclick: () => props.onPlayAgain?.(),
        },
        [text('Play Again')],
      )
    : null

  mount(
    root,
    el(
      'div',
      { class: 'results-screen' },
      playAgain ? [...rows, playAgain] : rows,
    ),
  )
}
