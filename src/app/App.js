import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostPage from "../pages/PostPage/PostPage";
import DefaultPage from "../pages/DefaultPage/DefaultPage";
import Timeline from "../components/Timeline/Timeline";
import SubRedditPage from "../pages/SubRedditPage/SubRedditPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<DefaultPage />}>
            <Route path="/" element={<Timeline />} />
            <Route path="/r/:sub/comments/:key/:title" element={<PostPage />} />
            <Route path="/search" element={<Timeline />} />
            <Route path="/r/:sub" element={<SubRedditPage />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
