import Account from './Account'

class AccountSearch extends Account {
    static type = 'account_search'
}

Account.addSubClass(AccountSearch)

export default AccountSearch
