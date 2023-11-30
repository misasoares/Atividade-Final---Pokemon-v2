import { Provider } from "react-redux";
import Home from "./pages/Home";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import './index.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
