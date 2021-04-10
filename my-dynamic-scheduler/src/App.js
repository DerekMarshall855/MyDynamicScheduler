import Main from './components/Main.jsx';
import {Beforeunload} from 'react-beforeunload';




function App() {
  return (
    <div className="App">
      <Beforeunload onBeforeunload={() => {
        localStorage.removeItem("username");
        localStorage.removeItem("auth");
        localStorage.removeItem("schedule");
      }}>
        <Main />
      </Beforeunload>
    </div>
  );
}

export default App;
