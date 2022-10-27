import React, { useState, useEffect } from 'react'

import {Wrapper, Header, Content, Empty } from '~/components/NotificationPreview'
import { NotifyIcon } from '~/packages/ducdm-icon'

const TAB_ALL = 'TAB_ALL'
const TAB_LIKES = 'TAB_LIKES'
const TAB_COMMENTS = 'TAB_COMMENTS'
const TAB_MENTIONS = 'TAB_MENTIONS'
const TAB_FOLLOWERS = 'FOLLOWERS'

const tabs = [
    {
        title: 'All',
        type: TAB_ALL
    },
    {
        title: 'Likes',
        type: TAB_LIKES
    },
    {
        title: 'Comments',
        type: TAB_COMMENTS
    },
    {
        title: 'Mentions',
        type: TAB_MENTIONS
    },
    {
        title: 'Followers',
        type: TAB_FOLLOWERS
    }
]

function Notification() {
    const [activeTab, setActiveTab] = useState(TAB_ALL)
    const [currentTab, setCurrentTab] = useState([])

    const handleClickTab = (type) => {
        setActiveTab(type)
    }

    useEffect(() => {
        const  currentTabActive = tabs.filter(tab => tab.type === activeTab)
        setCurrentTab(currentTabActive)

    },[activeTab])


    return (
        <Wrapper>
            <Header 
                tabs={tabs}
                onChangeTab={handleClickTab}
                currentTab={currentTab}
            />
            <Content> 
                {activeTab === TAB_ALL && (
                    <Empty tabName="all">
                        <NotifyIcon type="all"/>
                    </Empty>
                )}
                {activeTab === TAB_LIKES && (
                    <Empty tabName="likes">
                        <NotifyIcon type="like"/>
                    </Empty>
                )}
                {activeTab === TAB_COMMENTS && (
                    <Empty tabName="comments">
                        <NotifyIcon type="comment"/>
                    </Empty>
                )}
                {activeTab === TAB_MENTIONS && (
                    <Empty tabName="mentions">
                        <NotifyIcon type="mention"/>
                    </Empty>
                )}
                {activeTab === TAB_FOLLOWERS && (
                    <Empty tabName="followers">
                        <NotifyIcon type="follower"/>
                    </Empty>
                )}
            </Content>

        </Wrapper>
            
    )
}

export default Notification
