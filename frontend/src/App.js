import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import DashboardStudent from './pages/DashboardStudent/DashboardStudent';
import DashboardTeacher from './pages/DashboardTeacher/DashboardTeacher';


function App() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/login" /> {/* Redireciona para a página de login quando a raiz é acessada */}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/mainStudent" component={DashboardStudent} />
      <Route path="/mainTeacher" component={DashboardTeacher} />
    </Router>
  );
}

export default App;
