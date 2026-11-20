import { loadFont } from '@remotion/google-fonts/HindSiliguri';
import timeline from './data/timeline.json';

export const { fontFamily } = loadFont('normal', { weights: ['400', '600', '700'], subsets: ['bengali', 'latin'] });
export const FPS = 30;
export const W = 1920;
export const H = 1080;
export const AUDIO_END = timeline.audioEnd;
export const TOTAL_FRAMES = Math.ceil(AUDIO_END * FPS) + 1;
export const OUTLINE = '#222222';
export const SW = 2.5;
export const C = {
  ink: '#222222', paper: '#FFF8E7', yellow: '#FFD23F', orange: '#FF8C42', red: '#E4572E', green: '#3DAA5C', blue: '#3A86FF',
  navy: '#1B2A4A', pink: '#FF8FAB', cream: '#FBEFD5',
};
