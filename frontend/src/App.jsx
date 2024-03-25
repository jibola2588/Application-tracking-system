import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import { routes } from './routes'

function App() {
return( 
<BrowserRouter> 
    <Suspense fallback={<span>is loading...</span>}> 
    <Routes>
    {routes.map((route, index) =>
      <Route
              key={index}
              path={route.path}
              element={<route.element />} />
     )}
     </Routes>
    </Suspense>
</BrowserRouter>
)
}

export default App
