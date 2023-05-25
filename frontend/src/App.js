import { HashRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { Provider } from 'react-redux'

// import './App.css';
import './styles/styles.scss';

import { store } from '../src/store/store'
import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { Dashboard } from './pages/dashboard.jsx'
import { ToyIndex } from '../src/pages/toy-index'
import { ToyDetails } from '../src/pages/toy-details'
import { ToyEdit } from '../src/pages/toy-edit'
import { UserProfile } from '../src/pages/user-profile'
import { AppHeader } from '../src/cmps/app-header'
import { AppFooter } from '../src/cmps/app-footer'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/edit" />
              <Route element={<ToyEdit />} path="/edit/:toyId" />
              <Route element={<UserProfile />} path="/user/:userId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}

export default App;
