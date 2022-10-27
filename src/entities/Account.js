import BaseEntity from './BaseEntity'
class Account extends BaseEntity {
    static type = 'account'
    get full_name() {
        return this.first_name + ' ' + this.last_name
    }
}

BaseEntity.addSubClass(Account)

export default Account