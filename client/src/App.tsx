import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import { Route, Routes } from 'react-router-dom'
import './global.css'
import { ErrorPage } from './pages/error/ErrorPage'
import { ExplorePage } from './pages/explore/ExplorePage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'
import { ProfilePage } from './pages/user/ProfilePage'
import { UserPage } from './pages/user/UserPage'

export const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<IndexPage />} />
      <Route path="explore" element={<ExplorePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="logout" element={<LogoutPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="u">
        <Route path=":username" element={<UserPage />} />
      </Route>
      <Route path="ch">
        <Route path=":uriName" element={<UserPage />} />
      </Route>
      <Route path="error" element={<ErrorPage />} />
    </Route>
  </Routes>
)
