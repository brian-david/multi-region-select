import './App.css';
import DrawAnnotations from './comconents/drawing-canvas';
import { ChangeState } from './drawState';

function App() {
  return (
    <div>
      <h1>This is a persistent drawing area example</h1>
      <ChangeState></ChangeState>
      <DrawAnnotations></DrawAnnotations>
    </div>
  );
}

export default App;