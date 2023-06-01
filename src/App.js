
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MoviesPage from './Components/moviesPage/moviesPage';
import MoviApiData from './Components/moviApidata';
import Layout from './Components/Layout';
import About from './Components/about';
import Search from './Components/search';

function App () {

  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MoviApiData />
        },
        {
          path: "/movies",
          element: <MoviesPage />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/Search",
          element: <Search />
        }
      ]
    }
  ])

  return (
    <div className="App">

      <RouterProvider router={ appRoute } />

    </div>
  );
}

export default App;
