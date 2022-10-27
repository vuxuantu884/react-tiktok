import styles from './SearchPreview.module.scss'

function SearchPreview({
    searchValue = '',
    renderSearchResult = () => { },
    onClickSearchAll = () => { },
}) {
    return (
        <div className={styles.searchResultBox}>
            {renderSearchResult()}
            <p onClick={onClickSearchAll} className={styles.searchResultAll}>View all result for "{searchValue}"</p>
        </div>
    )
}

export default SearchPreview

