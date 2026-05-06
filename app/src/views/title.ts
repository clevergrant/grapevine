import { el, mount, text } from '../dom.ts'
import { rainbow } from './rainbow.ts'

export interface TitleProps {
  onCreate: (name: string) => void
  onJoin: (code: string, name: string) => void
}

export function renderTitle(root: HTMLElement, props: TitleProps): void {
  const titleBar = el('div', { class: 'title-bar' }, [
    el('h1', { class: 'title' }, [text('Grapevine')]),
    rainbow(),
  ])

  const menu = el('div', { class: 'title-menu' }, [
    el(
      'button',
      {
        class: 'menu-btn create',
        onclick: () => {
          const name = window.prompt('Your name?')?.trim()
          if (name) props.onCreate(name)
        },
      },
      [text('Create Lobby')],
    ),
    el(
      'button',
      {
        class: 'menu-btn join',
        onclick: () => {
          const code = window.prompt('Lobby code?')?.trim()
          const name = window.prompt('Your name?')?.trim()
          if (code && name) props.onJoin(code, name)
        },
      },
      [text('Join Lobby')],
    ),
  ])

  mount(root, el('div', { class: 'title-screen' }, [titleBar, menu]))
}
