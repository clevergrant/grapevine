# Grapevine

A multiplayer party game inspired by Quiplash, but with a better interface and retro aesthetic.

## Overview

Grapevine is a multiplayer party game for 3-8 players where one person hosts and others join using a 6-character room code. All data is ephemeral with no database required, similar to games like scribbl.io. Players answer prompts, vote on each other's responses, and compete for points in a retro-styled interface.

## Game Mechanics

### Player Count

- **Minimum**: 3 players
- **Maximum**: 8 players
- Each player receives a unique color (red, orange, yellow, lime, green, blue, indigo, violet)

### Prompts & Answers

- **Source**: Hardcoded prompts (potentially from [Quiplash prompt lists](https://jackboxgames.fandom.com/wiki/Quiplash_(series)/List_of_Prompts))
- **Distribution**: Exactly 1 prompt per player in the game
- **Assignment**: Each prompt is given to exactly 2 different players
- **Total Answers**: Each player answers exactly 2 prompts
- **Randomization**: Prompts are shuffled at game start, then distributed using fixed pattern:

  ```text
  Q1: P1, P2
  Q2: P3, P4
  Q3: P5, P6
  Q4: P7, P8
  Q5: P2, P3
  Q6: P4, P5
  Q7: P6, P7
  Q8: P8, P1
  ```

  _(Pattern scales for games with fewer players)_

- **Character Limit**: 300 characters maximum per answer

### Voting

- **Rounds**: 1 voting round per prompt (equals number of players)
- **Format**: Each prompt displays 2 responses side-by-side
- **Restriction**: Players cannot vote on prompts they answered
- **Participation**: Each prompt receives votes from all non-authors (e.g., 6 voters in an 8-player game)
- **Frequency**: Each player votes once per prompt they didn't answer

### Scoring

- **Point Award**: 1 point to the response with the most votes (winner-takes-all)
- **Ties**: No points awarded if responses tie
- **Final Results**: Displayed as proportional bars relative to the winner's score
- **Future Enhancement**: Potential for spectator voting and bonus points

### Disconnection Handling

**General Behavior:**

- Session data stored locally in each client (usernames and answers only)
- Players rejoin seamlessly with same username and room code
- Rejoining players maintain their original color/slot
- Game state automatically syncs to current phase upon reconnection

**During Answer Phase:**

- Disconnected players can rejoin and resume with remaining time
- Timer served by host; reconnecting clients sync to host's timer immediately
- Incomplete answers submitted as-is if player doesn't return before timeout

**During Other Phases:**

- Players can rejoin during waiting room, voting, or results phases
- Their previous answers remain in the game for voting/scoring

**Host Disconnection:**

- Next available player automatically becomes new host
- New host uses local session data to continue serving timer and game state
- If original host reconnects, they detect host transfer and continue as regular player
- Original host retains their original color

**Connection Management:**

- No special reconnection timers - players rejoin anytime during active game
- All clients maintain session state for seamless transitions

## Game Flow

### Title Screen

Players are presented with two options:

1. **Create Lobby** - Host a new game session
2. **Join Lobby** - Join an existing game with a room code

### Create Lobby

1. Host enters their username
2. Host is brought to lobby screen with:
   - Header row (beige background, black text) displaying:
     - 6-character alphanumeric lobby code
     - "Start Game" button (disabled until enough players join, only visible to host)
   - 8 player rows below:
     - First row shows host with red background and white text
     - Remaining rows show "waiting to join" with dark bluish background

### Join Lobby

1. Player enters room code
2. Player enters username
3. Player joins lobby and takes next available color/row

### Lobby

Once enough players are present (minimum 3, maximum 8), the host can enable and press "Start Game" to begin.

### Answer Phase

Players answer prompts with the following UI:

- Screen split vertically (beige left, black right)
- Prompt displayed centered in left column (black text)
- Invisible styled text input centered in right column (white text, 300 char max)
- Timer represented by colored line growing across top (player's color)
- Each player answers exactly 2 prompts
- Press Enter to submit, or auto-submit when time expires

### Waiting Room

After completing prompts, players see:

- 8 rows representing each player
- Real-time progress bars showing:
  - Current question progress (characters typed / max characters)
  - Overall progress across all questions
  - Player names left-justified in white text
- Progress updates live as other players type or delete

### Voting Phase

Players vote on responses they didn't write:

- Screen split horizontally
- Top half: Prompt display (beige background, black text)
- Bottom half: Two columns with competing responses (black background)
- Selected response highlights with the author's player color
- Automatically proceeds to next prompt after selection
- Total rounds equals number of prompts (1 per player)

### Results Screen

Final scores displayed:

- One row per player (up to 8)
- Progress bars showing relative scores:
  - Winner's bar filled 100% with their color
  - Others filled proportionally (e.g., 900/1000 points = 90% filled)
  - Black background, white player names (left-justified)
- "Play Again" button visible only to host (positioned on right side of their row)

### Play Again

When host selects "Play Again":

- All players return to name entry screen with names auto-filled
- Same 6-character room code is reused
- First player to submit becomes first in new lobby
- Host can change their name

## Color Scheme

- **Player Colors**: `.red`, `.orange`, `.yellow`, `.lime`, `.green`, `.blue`, `.indigo`, `.violet`
- **Backgrounds**: `.beige` (light), `.black` (dark)
- **Text**: `.black`, `.white`
- **UI Element**: Dark bluish for "waiting to join" rows

## Tech Stack

- **Backend**: Node.js with Express and Socket.IO
- **Frontend**: React with retro-styled UI
