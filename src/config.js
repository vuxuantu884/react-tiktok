const config = {
    mainWidth: 1142,
    routes: {
        base: process.env.REACT_APP_PUBLIC_URL,
        home: '/',
        following: '/following',
        postDetail: '/:nickname/video/:videoId',
        search: '/search',
        profile: '/@:nickname',
        upload: '/upload',
        message: '/message',
    },
    socials: {
        shares: {
            whatsapp: url => `https://api.whatsapp.com/send/?text=${url}`,
            facebook: url => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: url => `https://twitter.com/intent/tweet?refer_source=${url}`,
        }
    }
}

export default config