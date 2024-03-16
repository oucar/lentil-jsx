import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/CellList";
import Home from "./components/Home";
import Documentation from "./components/Documentation";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/editor" element={<CellList />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
