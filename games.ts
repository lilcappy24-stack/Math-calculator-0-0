
import { Game, GameCategory } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: '2048',
    title: '2048 Classic',
    description: 'Join the numbers and get to the 2048 tile!',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    iframeUrl: 'https://play2048.co/'
  },
  {
    id: 'flappy-bird-remake',
    title: 'Flappy Bird',
    description: 'The legendary addictive game. How far can you fly?',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/flappy/400/300',
    iframeUrl: 'https://wayou.github.io/FlappyBird/'
  },
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'A fast-paced puzzle game inspired by Tetris but on a hexagon.',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://picsum.photos/seed/hex/400/300',
    iframeUrl: 'https://hextris.io/'
  },
  {
    id: 'tetris-web',
    title: 'Tetris Web',
    description: 'Classic block stacking gameplay in your browser.',
    category: GameCategory.RETRO,
    thumbnail: 'https://picsum.photos/seed/tetris/400/300',
    iframeUrl: 'https://tetris.com/play-tetris'
  },
  {
    id: 'chrome-dino',
    title: 'Chrome Dino',
    description: 'The famous dinosaur runner game for when you are "offline".',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/dino/400/300',
    iframeUrl: 'https://chromedino.com/'
  },
  {
    id: 'slope-run',
    title: 'Slope Game',
    description: 'Test your reflexes as you roll down a dangerous slope.',
    category: GameCategory.DRIVING,
    thumbnail: 'https://picsum.photos/seed/slope/400/300',
    iframeUrl: 'https://slope.run/'
  },
  {
    id: 'paper-io',
    title: 'Paper.io 2',
    description: 'Conquer as much territory as possible and beat the competition.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://picsum.photos/seed/paperio/400/300',
    iframeUrl: 'https://paper-io.com/'
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'The ultimate idle game. Bake all the cookies.',
    category: GameCategory.RETRO,
    thumbnail: 'https://picsum.photos/seed/cookie/400/300',
    iframeUrl: 'https://orteil.dashnet.org/cookieclicker/'
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    description: 'High-speed drifting simulator with customizable cars.',
    category: GameCategory.DRIVING,
    thumbnail: 'https://picsum.photos/seed/drift/400/300',
    iframeUrl: 'https://drift-hunters.com/'
  },
  {
    id: 'chess-web',
    title: 'Chess Online',
    description: 'Master your strategy in the game of kings.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://picsum.photos/seed/chess/400/300',
    iframeUrl: 'https://lichess.org/export/embed/69u3e9W6'
  }
];
