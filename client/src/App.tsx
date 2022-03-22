import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import { Route, Routes } from 'react-router-dom'
import { ErrorPage } from './pages/error/ErrorPage'
import { ExplorePage } from './pages/explore/ExplorePage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'
import { ProfilePage } from './pages/profile/ProfilePage'

export const App = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/logout" element={<LogoutPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/error" element={<ErrorPage />} />
  </Routes>
)
