import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostPage from "../pages/PostPage/PostPage";
import DefaultPage from "../pages/DefaultPage/DefaultPage";
import Timeline from "../components/Timeline/Timeline";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<DefaultPage />}>
            <Route path="/" element={<Timeline />} />
            <Route path="/r/:sub/comments/:key/:title" element={<PostPage />} />
            <Route path="/search" element={<Timeline />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
