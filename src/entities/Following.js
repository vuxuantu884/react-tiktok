
import Account from './Account'

class Following extends Account {
    static type = 'following'
}

Account.addSubClass(Following)

export default Following