import { el, mount, text } from '../dom.ts'
import type { VoteChoice } from '../protocol.ts'

export interface VotingProps {
  prompt: string
  choices: ReadonlyArray<VoteChoice>
  onVote: (choiceId: string) => void
}

export function renderVoting(root: HTMLElement, props: VotingProps): void {
  const choiceEls = props.choices.map((choice) =>
    el(
      'button',
      {
        class: 'choice',
        onclick: () => props.onVote(choice.choiceId),
      },
      [text(choice.text)],
    ),
  )

  mount(
    root,
    el('div', { class: 'voting-screen' }, [
      el('div', { class: 'prompt' }, [text(props.prompt)]),
      el('div', { class: 'choices' }, choiceEls),
    ]),
  )
}
