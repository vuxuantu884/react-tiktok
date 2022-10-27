class BaseEntity {
    static subClasses = {}

    constructor(data = {}) {
        Object.entries(data).forEach(([key, value]) => {
            this[key] = value
        })
    }

    static addSubClass(SubClass) {
        Object.defineProperty(BaseEntity.subClasses, SubClass.type, {
            value: SubClass,
        })
    }

    static create(item) {
        return new BaseEntity.subClasses[this.type](item)
    }

    static createFromList(list) {
        return list.map(item => new BaseEntity.subClasses[this.type](item))
    }
}

export default BaseEntity
