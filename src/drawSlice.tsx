import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DrawState{
   value: boolean;
}

const initialState: DrawState = {
   value: true,
}

export const drawSlice = createSlice({
   name: 'drawSlice',
   initialState,
   reducers:{
      changeState: state => {
         if (state.value){
            state.value = false;
         }
         else{
            state.value = true;
         }
      },
   }
});

export const { changeState } = drawSlice.actions;
export default drawSlice.reducer;