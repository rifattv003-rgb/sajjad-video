import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { FPS, TOTAL_FRAMES } from './theme';
import { SceneStartCtx } from './time';
import timeline from './data/timeline.json';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';
import { Scene9 } from './scenes/Scene9';
import { Scene10 } from './scenes/Scene10';
import { Scene11 } from './scenes/Scene11';

const COMPS = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9, Scene10, Scene11];

export const Story: React.FC = () => (
  <AbsoluteFill style={{ background: '#222' }}>
    {timeline.scenes.map((sc, i) => {
      const from = Math.round(sc.start * FPS);
      const end = i === timeline.scenes.length - 1 ? TOTAL_FRAMES : Math.round(timeline.scenes[i + 1].start * FPS);
      const C = COMPS[i];
      return (
        <Sequence key={sc.id} from={from} durationInFrames={end - from}>
          <SceneStartCtx.Provider value={from}><C /></SceneStartCtx.Provider>
        </Sequence>
      );
    })}
    <Audio src={staticFile('voice.mp3')} volume={1} />
  </AbsoluteFill>
);
