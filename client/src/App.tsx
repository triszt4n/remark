import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ExplorePage } from './pages/explore/ExplorePage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'

export const App = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
)
