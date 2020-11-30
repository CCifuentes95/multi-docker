import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <div className="App">

        <div>
          <Route exact path='/' component={Fib} />     
          <Route path='/other' component={OtherPage} />     
        </div>
      </div>
    </Router>
  );
}

export default App;
