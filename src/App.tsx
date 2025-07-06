import { Route, Switch, Redirect } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';

function App() {
  return (
    <Switch>
      <Route exact path="/welcome" component={LandingPage} />
      <Route path="">
        <Redirect to="welcome" />
      </Route>
    </Switch>
  );
}

export default App;
