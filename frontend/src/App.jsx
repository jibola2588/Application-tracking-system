import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from './routes';
import { PageLoader } from "./components/loader";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader/>}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.element/>}
            >
              {route.children && route.children.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={<childRoute.element/>}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
