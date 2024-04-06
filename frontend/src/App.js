// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Class from './pages/Class/Class';
import User from './pages/User/User';


function App() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/login" /> {/* Redireciona para a página de login quando a raiz é acessada */}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/class" component={Class} />
      <Route path="/user" component={User} />
    </Router>
  );
}

export default App;
