import { configureStore } from '@reduxjs/toolkit'
import changeState from './drawSlice';

export const store = configureStore({
  reducer: {
    drawState: changeState,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;