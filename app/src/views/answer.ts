import { el, mount, text } from '../dom.ts'
import type { PromptForAnswer } from '../protocol.ts'

export interface AnswerProps {
  prompts: ReadonlyArray<PromptForAnswer>
  currentIndex: number
  timerEndsAt: number
  onSubmit: (promptId: string, value: string) => void
  onProgress: (promptId: string, charsTyped: number) => void
}

export function renderAnswer(root: HTMLElement, props: AnswerProps): void {
  const prompt = props.prompts[props.currentIndex]
  if (!prompt) {
    mount(root, el('div', { class: 'answer-screen waiting' }, [text('Waiting for others...')]))
    return
  }

  const input = el('input', {
    class: 'answer-input',
    type: 'text',
    maxlength: 300,
    autofocus: true,
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') props.onSubmit(prompt.promptId, input.value)
  })
  input.addEventListener('input', () => {
    props.onProgress(prompt.promptId, input.value.length)
  })

  mount(
    root,
    el('div', { class: 'answer-screen' }, [
      el('div', { class: 'prompt' }, [text(prompt.text)]),
      input,
    ]),
  )
}
