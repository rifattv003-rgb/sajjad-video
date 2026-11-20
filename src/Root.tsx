import React from 'react';
import { Composition } from 'remotion';
import { Story } from './Story';
import { FPS, W, H, TOTAL_FRAMES } from './theme';

export const RemotionRoot: React.FC = () => (
  <Composition id="Story" component={Story} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
