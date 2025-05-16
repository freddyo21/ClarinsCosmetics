import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import "./utils/fas-color.css";
import { routes } from './pages/route'
import { Suspense } from 'react';
import SuspenseFallback from './utils/suspense-fallback';

const router = createBrowserRouter(routes);

export default function App() {

  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}
