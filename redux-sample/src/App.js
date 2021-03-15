import React from 'react';
import Counter from './components/Counter.js';
import Todos from './components/Todos.js';
const App = () => {
  return (
    <div className="App">
      <Counter number={0} />
      <hr />
      <Todos />
    </div>
  );
}

export default App;
