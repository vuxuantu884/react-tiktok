import { useEffect, useState } from "react"
import axios from "axios"
import { Row } from '@mycv/mycv-grid'

import UserContext from "~/contexts/UserContext";
import FollowingEntity from "~/entities/Following"
import FollowingVideo from '~/containers/FollowingVideo'
import  {FollowingList, FollowingItem } from "../../components/FollowingList"

function Following() {
    const [followingList, setFollowingList] = useState([])
    const [currentAccount, setCurrentAccount] = useState(null)
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
    })
    useEffect(() => {
        axios
            .get(`/api/users/suggested?page=${pagination.currentPage}`)
            .then((res) => {
                
                setFollowingList(prevState => [
                    ...prevState,
                    ...FollowingEntity.createFromList(res.data)
                ])

                setPagination({
                    total: res.meta.pagination.total,
                    currentPage: res.meta.pagination.current_page,
                    totalPages: res.meta.pagination.total_pages,
                    perPage: res.meta.pagination.per_page,
                })

                setCurrentAccount(followingList[0])
            })
            .catch((err) => {
                console.log(err)
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.currentPage]);

    const handleLoadMore = () => {
        if (
            followingList.length >= pagination.perPage &&
            pagination.currentPage < pagination.totalPages
        ) {
            setPagination({
                currentPage: pagination.currentPage + 1
            })
        }
    }

    const checkPlaying = account => {
        return !!currentAccount && currentAccount.id === account.id
    }

    const handleMouseEnterAccount = account => {
        setCurrentAccount(account)
    }
                     
    return (
    <UserContext.Consumer>
        {(currentUser) => currentUser ? <FollowingVideo /> : (
        <FollowingList>
            <Row>
            {followingList.map((followingItem, index) => (
                <FollowingItem
                    key={followingItem.id}
                    data={followingItem}
                    isPlaying={checkPlaying(followingItem)}
                    isLast={followingList.length - 1 === index}
                    onMouseEnter={handleMouseEnterAccount}
                    onLastEnter={handleLoadMore}
                />
            ))}
            </Row>
        </FollowingList>
        )}
        
    </UserContext.Consumer>
    )
}

export default Following;
