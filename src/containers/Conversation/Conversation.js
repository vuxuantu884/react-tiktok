// import { useState, useEffect } from 'react'
// import socketClusterClient from 'socketcluster-client'
// import { Grid, Row, Column } from "@mycv/mycv-grid";

// import {
//     Wrapper,
//     ConversationList,
//     ConversationItem,
//     ConversationBox,
// } from '~/components/Conversation'
// import config from '~/config'

// const socket = socketClusterClient.create({
//     hostname: '18.140.54.149',
//     secure: false,
//     port: 8000,
//     // Only necessary during debug if using a self-signed certificate
//   })
// function Conversation() {
//     useEffect(() => {
//         (async () => {
//             let channel = socket.subscribe('f8k2');
//             for await (let data of channel) {
//               // ... Handle channel data.
//             }
//           })();
//     }, [])

//     return (
//         <Wrapper>
//             <Grid maxWidth={config.mainWidth} >
//                 <Row>
//                     <Column size={4}>
//                         <ConversationList>
//                             <ConversationItem />
//                         </ConversationList>
//                     </Column>

//                     <Column size={8}>
//                         <ConversationBox />
//                     </Column>
//                 </Row>
//             </Grid>
//         </Wrapper>
//     )
// }

// export default Conversation
import { useEffect, useState } from 'react'
import socketClusterClient from 'socketcluster-client'
const socket = socketClusterClient.create({
    hostname: '18.140.54.149',
    secure: false,
    port: 8000,
})
function Message() {
    const [chatText, setChatText] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        let channel = socket.subscribe('f8k2');
        (async () => {
            for await (let data of channel) {
                switch (data.type) {
                    case 'create':
                        setMessages(prev => [...prev, data.payload])
                        break
                        
                    default:
                }
            }
        })();

        return () => {
            channel.unsubscribe()
        }
    }, [])
    const handleSubmitChat = () => {
        const message = {
            type: 'create',
            payload: {
                message:'Duc:' + chatText
            }
        }
        socket.transmitPublish('f8k2', message);
        setChatText('')
    }
    return (
        <div>
            <h1>Messages:</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.message}</li>
                ))}
            </ul>
            <input
                value={chatText}
                style={{ border: '1px solid #ccc' }}
                onChange={e => setChatText(e.target.value)}
                onKeyUp={e => e.keyCode === 13 && handleSubmitChat()}
            />
            <button onClick={handleSubmitChat}>Chat</button>
        </div>
    )
}
export default Message