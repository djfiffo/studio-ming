import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Section from "./pages/Section.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import { flattenedSections } from "./content/structure.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {flattenedSections
            .filter((s) => s.slug !== "about")
            .map((s) => (
              <Route
                key={s.slug}
                path={`/${s.slug}`}
                element={<Section slug={s.slug} />}
              />
            ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
