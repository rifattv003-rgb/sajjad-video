import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { World, Overlays, Captions, Item, Cam } from './Overlays';

export const Scene: React.FC<{ id: number; items: Item[]; cam?: Cam[]; shake?: [number, number, number][]; hideCaptions?: boolean; children: React.ReactNode }> = ({ id, items, cam, shake, hideCaptions, children }) => {
  const f = useCurrentFrame();
  const fade = Math.max(0, 1 - f / 7);
  return (
    <AbsoluteFill style={{ background: '#222', overflow: 'hidden' }}>
      <World cam={cam} shake={shake}>{children}</World>
      <Overlays items={items} />
      <Captions items={items} sceneId={id} hide={hideCaptions} />
      {fade > 0 && <AbsoluteFill style={{ background: '#FFF8E7', opacity: fade }} />}
    </AbsoluteFill>
  );
};
