import { useState, useEffect } from 'react'
import axios from 'axios'

import Account from '~/entities/Account'
import { AccountList as AccountListComponent, AccountItem } from '~/components/MainSidebar'
import Popper from '~/components/Popper'
import AccountPreview from '~/components/AccountPreview'


function AccountList({
    isShowPreview,
    heading = '',
    apiPath = '',
}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [accounts, setAcounts] = useState([])
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
    })

    useEffect(() => {
        // Get  Account
        axios.get(`${apiPath}?page=${pagination.currentPage}`)
            .then(res => {

                setAcounts(prevState => [
                    ...prevState,
                    ...Account.createFromList(res.data)
                ])

                setPagination({
                    total: res.meta.pagination.total,
                    currentPage: res.meta.pagination.current_page,
                    totalPages: res.meta.pagination.total_pages,
                    perPage: res.meta.pagination.per_page,
                })

            })
            .catch(err => {

            })
    }, [pagination.currentPage, apiPath])

    const handleSeeToggle = () => {
        setIsExpanded(!isExpanded)
        if (pagination.currentPage < pagination.totalPages) {

            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    const handleLoadMore = () => {
        if (
            accounts.length > pagination.perPage &&
            pagination.currentPage < pagination.totalPages
        ) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    const collapsedHeight = isExpanded ? 'initial' : pagination.perPage * 64

    return (
        <AccountListComponent
            heading={heading}
            isExpanded={isExpanded}
            hideSeeBtn={pagination.currentPage <= pagination.totalPages}
            collapsedHeight={collapsedHeight}
            onSeeToggle={handleSeeToggle}
        >
            {accounts.map((account, index) => (
                <Popper
                    key={account.id}
                    placement="bottom"
                    interactive
                    minWidth={320}
                    offset={[34, 0]}
                    delay={[1000, 0]}
                    render={() => ( isShowPreview ? (
                        <AccountPreview
                            avatar={account.avatar}
                            title={account.nickname}
                            desc={`${account.first_name} ${account.last_name} `}
                            followersCount={account.followers_count}
                            likesCount={account.likes_count}
                            linkTo={`/@${account.nickname}`}
                            tick={account.tick}
                        />) : null)}
                >
                    <AccountItem
                        key={account.id}
                        avatar={account.avatar}
                        title={account.nickname}
                        desc={`${account.first_name} ${account.last_name} `}
                        tick={account.tick}
                        linkTo={`/@${account.nickname}`}
                        isLast={accounts.length - 1 === index}
                        onLastEnter={handleLoadMore}
                    />
                </Popper>
            ))}
        </AccountListComponent>
    )
}

export default AccountList