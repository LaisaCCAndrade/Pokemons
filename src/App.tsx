import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

import './scss/index.scss';
import { Suspense, lazy, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearToasts } from './app/slices/AppSlice';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import styled from 'styled-components';

import background from './assets/background.jpg';

const Search = lazy(() => import('./pages/Search'));
const Compare = lazy(() => import('./pages/Compare'));
const Pokemon = lazy(() => import('./pages/Pokemon'));

export default function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: 'bottom-right',
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  return (
    <MainContainer>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Apps>
            <Navbar />
            <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<Compare />} path="/compare" />
              <Route element={<Pokemon />} path="/pokemon/:id" />
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes>
            <Footer />
            <ToastContainer />
          </Apps>
        </Suspense>
      </BrowserRouter>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
  max-width: 100vw;
  overflow: hidden;
  height: 100vh;
`;

const Apps = styled.div`
  z-index: 1;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 8px 32px 0 rgba(6, 8, 28, 0.37);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(13px);
  height: 100vh;
  width: 100vw;

  .content {
    border: 0.5px solid rgba(255, 255, 255, 0.203);
    border-top: none;
    border-bottom: none;
    height: 80vh;
    overflow: scroll;
  }
`;
