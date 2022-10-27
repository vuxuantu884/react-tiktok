import { useEffect, useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useHistory, useLocation } from 'react-router-dom'

import HeaderComponent, { SearchResultItem } from '~/components/Header'
import Modal from '~/packages/ducdm-modal'
import Login from '~/containers/Login/Loadable'
import Register from '~/containers/Register/Loadable'
import { useDebounce } from '~/hooks/'

const LOGIN_MODAL = 'LOGIN_MODAL'
const REGISTER_MODAL = 'REGISTER_MODAL'


function Header() {
    const history = useHistory()
    const location = useLocation()
    const { q } = qs.parse(location.search.slice(1))

    const [searchValue, setSearchValue] = useState(q || '')
    const [searchResult, setSearchResult] = useState([])
    const [searching, setSearching] = useState(false)
    const [modal, setModal] = useState(null)

    const [showSearchPreview, setShowSearchPreview] = useState(false);

    useDebounce(() => {
        if (searchValue) {
            setSearching(true)
            setShowSearchPreview(true)

            axios.get(`/api/users/search?q=${searchValue}&type=less`)
                .then(res => {
                    setSearchResult(res.data)
                })
                .finally(() => {
                    setSearching(false)
                })
        } else {
            setShowSearchPreview(false)
            setSearchResult([])
        }
    }, 800, [searchValue])

    useEffect(() => {
        if (!searchValue) {
            setShowSearchPreview(false)
        }
    }, [searchValue])

    const handleClickUpload = () => {

    }

    const handleClickLogin = () => {
        setModal(LOGIN_MODAL)
    }

    const handleCloseModal = () => {
        setModal(null)
    }

    const handleSearchAll = () => {
        setShowSearchPreview(false)
        history.push(`/search?q=${searchValue}`)
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        if (searchResult) {

        }
    }

    const handleLoginSuccess = () => {
        setModal(null)
        window.location.reload()
    }

    const handleLogOut = () => {
        axios.post('/api/auth/logout')
            .then(res => {
                window.localStorage.removeItem('token')
                window.location.reload()
            })
            .finally(() => {

            })
    }

    const renderSearchResult = () => {
        return searchResult.map((account) => (
            <SearchResultItem
                key={account.id}
                nickname={account.nickname}
                name={`${account.first_name} ${account.last_name}`}
                tick={account.tick}
                linkTo={`/@${account.nickname}`}
                onClick={() => {
                    setShowSearchPreview(false)
                    setSearchValue('')
                }}
            />
        ))
    }

    return (
        <>
            <HeaderComponent
                searchValue={searchValue}
                isSearching={searching}
                showSearchPreview={showSearchPreview}
                handleShowSearchPreview={setShowSearchPreview}
                showSearchBox={searchResult.length > 0}
                renderSearchResult={renderSearchResult}
                onSearchChange={handleSearchChange}
                onClearSearch={() => {
                    setSearchValue('')
                    setShowSearchPreview(false)
                }}
                onClickSearchAll={handleSearchAll}
                onClickUpload={handleClickUpload}
                onClickLogin={handleClickLogin}
                onLogOut={handleLogOut}
            />

            <Modal
                width={472}
                height={700}
                isOpen={modal === LOGIN_MODAL}
                onRequestClose={handleCloseModal}
            >
                <Login
                    onSwitchRegister={() => setModal(REGISTER_MODAL)}
                    onSuccess={handleLoginSuccess}
                />
            </Modal>

            <Modal
                width={472}
                height={700}
                isOpen={modal === REGISTER_MODAL}
                onRequestClose={handleCloseModal}
            >
                <Register
                    onSwitchLogin={() => setModal(LOGIN_MODAL)}
                />
            </Modal>
        </>
    )
}

export default Header