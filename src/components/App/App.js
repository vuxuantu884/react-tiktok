
import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import { Grid, Row, Column } from '@mycv/mycv-grid'

import HeaderContainer from '~/containers/Header'
import SidebarContainer from '~/containers/Sidebar'
import HomeContainer from '~/containers/Home'
import ProfileContainer from '~/containers/Profile/Loadable'
import SearchListContainer from '~/containers/Search/Loadable'
import PostDetailContainer from '~/containers/PostDetail/Loadable'
import FollowingListContainer from '~/containers/Following/Loadable'
import ConversationContainer from '~/containers/Conversation/Loadable'
import ErrorContainer from '~/containers/Error'
import UploadContainer from '~/containers/Upload/Loadable'
import config from '~/config'
import UserContext from '~/contexts/UserContext'
import UserProvider from '~/containers/UserProvider'

function App() {
    const [currentUser, setCurrentUser] = useState(null)

    const renderWithSidebar = Component => {
        return () => (
            <Grid type="wide" maxWidth={config.mainWidth}>
                <Row>
                    <Column size={0} sizeTablet={4} sizeDesktop={3}>
                        <SidebarContainer />
                    </Column>
                    <Column size={12} sizeTablet={8} sizeDesktop={9}>
                        <Component />
                    </Column>
                </Row>
            </Grid>
        )
    }

    return (
        <UserContext.Provider value={currentUser}>
            <Router basename={config.routes.base}>
                <Grid type="fullWidth">
                    <UserProvider setCurrentUser={setCurrentUser} />
                    <HeaderContainer />
                    <Switch>
                        <Route exact path={config.routes.home} component={renderWithSidebar(HomeContainer)} />
                        <Route path={config.routes.upload} component={UploadContainer} />
                        <Route path={config.routes.message} component={ConversationContainer} />
                        <Route path={config.routes.postDetail} component={renderWithSidebar(PostDetailContainer)} />
                        <Route path={config.routes.following} component={renderWithSidebar(FollowingListContainer)} />
                        <Route path={config.routes.search} component={renderWithSidebar(SearchListContainer)} />
                        <Route path={config.routes.profile} component={renderWithSidebar(ProfileContainer)} />
                        <Route component={ErrorContainer} />
                    </Switch>
                </Grid>
            </Router>
        </UserContext.Provider>
    )
}

export default App