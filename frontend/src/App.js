import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import DashboardStudent from './pages/DashboardStudent/DashboardStudent';
import DashboardTeacher from './pages/DashboardTeacher/DashboardTeacher';
import Class from './pages/Class/Class';
import User from './pages/User/User';


function App() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/login" /> {/* Redireciona para a página de login quando a raiz é acessada */}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/mainStudent" component={DashboardStudent} />
      <Route path="/mainTeacher" component={DashboardTeacher} />
      <Route path="/class" component={Class} />
      <Route path="/user" component={User} />
    </Router>
  );
}

export default App;
