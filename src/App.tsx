import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Login from './pages/Login';
import ConfirmEmail from './pages/ConfirmMail';
import PrivateRoute from './components/PrivateRoute';
import UpdateEmail from './pages/UpdateEmail';
import MyPage from './pages/MyPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/confirm-email">ConfirmEmail</Link>
            </li>
            <li>
              <Link to="/mypage">MyPage</Link>
            </li>
            <li>
              <Link to="/updatemail">メールアドレス更新</Link>
            </li>
            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/updatemail">
            <UpdateEmail />
          </Route>
          <PrivateRoute path="/mypage" comp={MyPage}>
          </PrivateRoute>
          <Route path="/users">
            <SignUp />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/confirm-email">
            <ConfirmEmail />
          </Route>         
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
