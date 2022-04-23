import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import { Route, Routes } from 'react-router-dom'
import './global.css'
import { ChannelPage } from './pages/channel/ChannelPage'
import { ChannelProxyPage } from './pages/channel/ChannelProxyPage'
import { ErrorPage } from './pages/error/ErrorPage'
import { ExplorePage } from './pages/explore/ExplorePage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'
import { PostPage } from './pages/post/PostPage'
import { ProfilePage } from './pages/user/ProfilePage'
import { UserPage } from './pages/user/UserPage'
import { UserProxyPage } from './pages/user/UserProxyPage'

export const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<IndexPage />} />
      <Route path="explore" element={<ExplorePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="logout" element={<LogoutPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="u">
        <Route path=":username" element={<UserProxyPage />} />
      </Route>
      <Route path="users">
        <Route path=":userId" element={<UserPage />} />
      </Route>
      <Route path="ch">
        <Route path=":uriName" element={<ChannelProxyPage />} />
      </Route>
      <Route path="channels">
        <Route path=":channelId">
          {/** Show channel */}
          <Route index element={<ChannelPage />} />
          <Route path="posts">
            {/** Show post */}
            <Route path=":postId" element={<PostPage />} />
            {/** Edit post */}
            <Route path="edit" element={<></>} />
            {/** Create post */}
            <Route path="new" element={<></>} />
          </Route>
        </Route>
      </Route>
      <Route path="error" element={<ErrorPage />} />
      <Route
        path="*"
        element={
          <ErrorPage title="Page not found" messages={['Oops, it looks like you want to visit a page that is not found anymore!']} />
        }
      />
    </Route>
  </Routes>
)
