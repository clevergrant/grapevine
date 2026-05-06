export const PLAYER_COLORS = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'blue',
  'indigo',
  'violet',
] as const

export type PlayerColor = (typeof PLAYER_COLORS)[number]

export const MAX_PLAYERS = PLAYER_COLORS.length
export const MIN_PLAYERS = 3
