import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import AccountSearch from "~/entities/AccountSearch"
import SearchList from '~/components/SearchList'
import { SearchItem } from '~/components/SearchList'

function Search() {
    const location = useLocation()
    const { q: searchValue } = qs.parse(location.search.slice(1))

    const [searchList, setSearchList] = useState([])
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
    })
    useEffect(() => {
        // Get search List
        axios.get(`/api/users/search?q=${searchValue}&type=more&page=${pagination.currentPage}`)
            .then(res => {
                setSearchList(prevState => [
                    ...prevState,
                    ...AccountSearch.createFromList(res.data)
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

    }, [searchValue, pagination.currentPage])

    const handleSeeToggle = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    if (!searchList) {
        return <h2>Loading</h2>
    }

    return (
        <SearchList
            hideLoadBtn={pagination.currentPage < pagination.totalPages}
            showLoadMore={handleSeeToggle}
        >
            {searchList.map((searchItem) => (
                <SearchItem
                    key={searchItem.id}
                    avatar={searchItem.avatar}
                    title={searchItem.nickname}
                    desc={`${searchItem.first_name} ${searchItem.last_name}`}
                    tick={searchItem.tick}
                    followerCount={searchItem.followers_count}
                    bio={searchItem.bio}
                    linkTo={`/@${searchItem.nickname}`}
                />
            ))}
        </SearchList>
    )
}


export default Search