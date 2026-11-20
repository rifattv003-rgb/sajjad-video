// Local preview shim (NOT shipped to Remotion): minimal remotion API so frames can be rendered with react-dom/server.
import React, { createContext, useContext } from 'react';
export const FrameCtx = createContext(0);
export const globalFrame = { v: 0 };
export const useCurrentFrame = () => useContext(FrameCtx);
export const AbsoluteFill: React.FC<any> = ({ style, children }) => <div style={{ position: 'absolute', inset: 0, ...style }}>{children}</div>;
export const Sequence: React.FC<any> = ({ from = 0, durationInFrames, children }) => { const f = useContext(FrameCtx); if (f < from || f >= from + durationInFrames) return null; return <FrameCtx.Provider value={f - from}>{children}</FrameCtx.Provider>; };
export const Audio = () => null;
export const staticFile = (s: string) => s;
