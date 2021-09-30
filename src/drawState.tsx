import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { changeState } from './drawSlice';

export function ChangeState(){
   const drawState = useSelector((state:RootState) => state.drawState.value);

   const dispatch = useDispatch();
   return (
      <div>
         <button onClick={() => dispatch(changeState())}>Edit</button>
      </div>
   )
}