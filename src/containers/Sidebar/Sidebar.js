import MainSidebar, { TopSidebar, Footer } from "~/components/MainSidebar";
import AccountList from "./AccountList";
import UserContext from "~/contexts/UserContext";

function Sidebar() {
    return (
        <MainSidebar>
            <TopSidebar />

            <AccountList
                heading="Suggested accounts"
                apiPath="/api/users/suggested"
                isShowPreview
            />
            <UserContext.Consumer>
                {(currentUser) =>
                    currentUser && (
                        <AccountList
                            heading="Your top accounts"
                            apiPath="/api/me/followings"
                            isShowPreview={false}
                        />
                    )
                }
            </UserContext.Consumer>

            <Footer />
        </MainSidebar>
    );
}

export default Sidebar;
