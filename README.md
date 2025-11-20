# Grapevine

A multiplayer party game inspired by Quiplash, but with a better interface and retro aesthetic.

## Overview

Grapevine is a peer-to-peer multiplayer game where one person hosts and others join using a room code. All data is ephemeral with no database required, similar to games like scribbl.io.

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
Once enough players are present, the host can enable and press "Start Game" to begin.

### Game Loop - Answer Phase
Players answer prompts with the following UI:
- Screen split vertically (beige left, black right)
- Prompt displayed centered in left column (black text)
- Invisible styled text input centered in right column (white text)
- Timer represented by colored line growing across top (player's color)
- Players answer 2 prompts each (for 8-player games)
- Press Enter to submit, or auto-submit when time expires

### Waiting Room
After completing prompts, players see:
- 8 rows representing each player
- Real-time progress bars showing:
  - Current question progress (characters typed / max characters)
  - Overall progress across all questions
  - Player names left-justified in white text
- Progress updates live as other players type or delete

### Voting Round
Players vote on their preferred responses:
- Screen split horizontally
- Top half: Prompt display (beige background, black text)
- Bottom half: Two columns with responses (black background)
- Selected response highlights with the author's color
- Proceeds to next prompt after selection

### Results Screen
Final scores displayed:
- 8 rows, one per player
- Progress bars showing relative scores:
  - Winner's bar filled 100% with their color
  - Others filled proportionally (e.g., 900/1000 points = 90% filled)
  - Black background, white player names (left-justified)
- "Play Again" button visible only to host (right side of their row)

### Play Again
When host selects "Play Again":
- All players return to name entry screen with names auto-filled
- Same 6-character room code is reused
- First player to submit becomes first in new lobby
- Host can change their name

## Color Scheme
- `.red`, `.orange`, `.yellow`, `.lime`, `.green`, `.blue`, `.indigo`, `.violet` - Player colors
- `.beige` - Light backgrounds
- `.black` - Dark backgrounds and text
- `.white` - Light text

## Tech Stack
- **Backend**: Node.js with Express and Socket.IO
- **Frontend**: React with retro-styled UI
