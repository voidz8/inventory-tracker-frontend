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
import SoldSneakerPage from "./pages/SoldSneakerPage";
import SettingsPage from "./pages/SettingsPage";
import SoldItemPage from "./pages/SoldItemPage";

function App() {
  return (
    <Switch>
      <Route exact path={"/"}>
        <HomePage />
      </Route>
      <Route exact path={"/sneakers"}>
        <SneakerPage />
      </Route>
      <Route exact path={"/items"}>
        <ItemPage />
      </Route>
      <Route exact path={"/proxies"}>
        <ProxyPage />
      </Route>
      <Route exact path={"/bots"}>
        <BotPage />
      </Route>
      <Route exact path={"/profile"}>
        <ProfilePage />
      </Route>
      <Route exact path={"/login"}>
        <SignInPage />
      </Route>
      <Route exact path={"sold-sneakers"}>
        <SoldSneakerPage />
      </Route>
      <Route exact path={"/sign-up"}>
        <SignUpPage />
      </Route>
      <Route exact path={"/settings"}>
        <SettingsPage />
      </Route>
      <Route exact path={"/sold-items"}>
        <SoldItemPage />
      </Route>
    </Switch>
  );
}

export default App;
