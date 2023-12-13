// Import the native module. On web, it will be resolved to FloatWindow.web.ts
// and on native platforms to FloatWindow.ts
import FloatWindowModule from './FloatWindowModule';

// Get the native constant value.
export const PI = FloatWindowModule.PI;

export function isFloatwindowOpen(): boolean {
  return FloatWindowModule.isFloatwindowOpen();
}

export async function openFloatwindow() {
  return await FloatWindowModule.openFloatwindow();
}

