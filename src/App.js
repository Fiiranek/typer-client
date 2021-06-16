import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './parts/Navbar/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import TokenManager from './token/TokenManager'
import { Provider } from 'react-redux'
import TokenContextProvider from './contexts/TokenContext';
import NewMatch from './pages/NewMatch/NewMatch'
import Types from './pages/Types/Types'
import Matches from './pages/Matches/Matches'
import Table from './pages/Table/Table'
function App() {

  return (

    <TokenContextProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/table" component={() => <Table />} />
            <Route path="/matches" component={() => <Matches />} />
            <Route path="/types" component={() => <Types />} />
            <Route path="/new-match" component={() => <NewMatch />} />
            <Route path="/register" component={() => <Register />} />
            <Route path="/login" component={() => <Login />} />
            <Route path="/" component={() => <Home />} />

          </Switch>
        </div>
      </Router>
    </TokenContextProvider>
  );
}

export default App;
