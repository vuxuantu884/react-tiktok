import moment from 'moment'

import Post from './Post'

class Comment extends Post {
    static type = 'comment'
    get published_at_from_now() {
        return moment(this.created_at).fromNow()
    }
}

Post.addSubClass(Comment)

export default Comment