import moment from 'moment'

import BaseEntity from './BaseEntity'

class Post extends BaseEntity {
    static type = 'post'
    get video_width() {
        return this.meta.video.resolution_x
    }
    get video_height() {
        return this.meta.video.resolution_y
    }
    get is_video_horizontal() {
        return this.video_width > this.video_height
    }
    get video_ratio() {
        return this.video_width / this.video_height
    }
    get computed_video_width() {
        if (this.is_video_horizontal) {
            return `calc((400px + ((100vw - 768px) / 1152) * 100))`
        }
        return `calc(${this.video_ratio} * (400px + ((100vw - 768px) / 1152) * 100))`
    }
    get published_at_from_now() {
        return moment(this.published_at).fromNow()
    }
    get computed_top_offset() {
        // 1/3 viewport (- Header 60px)
        return (window.innerHeight - 60) / 4
    }
    get computed_bottom_offset() {
        return (window.innerHeight - 60) / 4
    }
    get video_mime_type() {
        return this.meta.mime_type
    }
}

BaseEntity.addSubClass(Post)

export default Post