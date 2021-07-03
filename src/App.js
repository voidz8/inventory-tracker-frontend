import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SneakerPage from "./pages/SneakerPage";
import ItemPage from "./pages/ItemPage";
import ProxyPage from "./pages/ProxyPage";
import BotPage from "./pages/BotPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Switch>
      <Route exact path={"/"}>
        <HomePage />
      </Route>
      <Route path={"/sneakers"}>
        <SneakerPage />
      </Route>
      <Route path={"/items"}>
        <ItemPage />
      </Route>
      <Route path={"/proxies"}>
        <ProxyPage />
      </Route>
      <Route path={"/bots"}>
        <BotPage />
      </Route>
      <Route path={"/profile"}>
        <ProfilePage />
      </Route>
      <Route path={"/login"}>
        <SignInPage />
      </Route>
      <Route>
        <SignUpPage path={"/sign-up"} />
      </Route>
    </Switch>
  );
}

export default App;
