// import React, { useContext, useEffect, useRef, useState } from 'react'
// import avatar from '../../../../assets/svg/avatar-boy.svg'
// import { ChatContext } from '../../../../context/ChatContext'
// import { AuthContext } from '../../../../context/AuthContext'
// import { MessageContext } from '../../../../context/MessageContext'
// import { sendMessage, maskAllMessageRead, getListMessageInChat } from '../../../../services/Api/message'
// import Message from '../../../components/Message'
// import { checkOnlineStatus } from '../../../../utils/checkOnlineStatus'
// import { IoCallOutline, IoVideocamOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
// import Avatar from '../../../components/Avatar'
// import { LuSendHorizonal } from "react-icons/lu";
// import { CommonContext } from '../../../../context/CommonContext'
// import NameChat from '../../../common/NameChat'
// import InfiniteScroll from "react-infinite-scroll-component"

// const ChatWindow = () => {
//     const {
//         idChatCurrent,
//         infoChatCurrent,
//         socket,
//         sentRef,
//         setSent,
//         onlineUsers
//     } = useContext(ChatContext)
//     const { userCurrent } = useContext(AuthContext)
//     const {
//         listMessageInChat,
//         setListMessageInChat,
//         newMessage,
//         setNewMessage,
//         totalPages,
//         page,
//         setPage
//     } = useContext(MessageContext)
//     const { setIsOpenMenu } = useContext(CommonContext)
//     const [contentMessage, setContentMessage] = useState('')
//     let lastSenderId = null
//     const loading = useRef(false)
//     const chatDisplayRef = useRef(null)
//     const chatDisplayRefCurrent = chatDisplayRef.current;
//     const handleSendMessgae = async (e) => {
//         e.preventDefault()
//         const data = {
//             content: contentMessage,
//             senderId: userCurrent._id,
//             chatId: idChatCurrent,
//         };
//         const now = new Date();
//         const formattedDate = now.toISOString();
//         setListMessageInChat((prev) => [{
//             chat: idChatCurrent,
//             content: contentMessage,
//             isRead: true,
//             sender: {
//                 firstName: userCurrent.firstName,
//                 lastName: userCurrent.lastName,
//                 _id: userCurrent._id,
//             },
//             createdAt: formattedDate
//         }, ...prev]);

//         setContentMessage('');
//         const messageData = await sendMessage(data);
//         setNewMessage(messageData.message);
//         sentRef.current = !sentRef.current;
//         setSent(sentRef.current);
//     }

//     useEffect(() => {
//         if (socket === null) return
//         const recipientIds = infoChatCurrent?.participants.filter((user) => user._id !== userCurrent._id)
//         socket.emit("sendMessage", { newMessage, recipientIds })
//     }, [newMessage])
//     console.log("PAGE", page)
//     // recipient Message
//     useEffect(() => {
//         if (socket === null) return
//         socket.on("getMessage", res => {
//             if (idChatCurrent === res.chat) {
//                 setListMessageInChat((prev => [res, ...prev]))
//                 const updateMessRead = async (idChat) => {
//                     const result = await maskAllMessageRead(idChat)
//                 }
//                 updateMessRead(res.chat)

//             }
//             sentRef.current = !sentRef.current
//             setSent(sentRef.current)
//         })
//         return () => {
//             socket.off("getMessage")
//         }
//     }, [socket, idChatCurrent])

//     const fetchData = async () => {
//         const data = await getListMessageInChat(idChatCurrent, page)
//         setListMessageInChat(prevMessages => [...prevMessages, ...data.messages]);
//         setPage(page + 1)
//     };

//     // const handleScroll = async () => {
//     //     const chatDisplay = chatDisplayRef.current;
//     //     const clientHeight = chatDisplay.clientHeight;
//     //     const scrollHeight = chatDisplay.scrollHeight;
//     //     const scrollTop = -chatDisplay.scrollTop;
//     //     const scrollThreshold = scrollHeight - clientHeight;
//     //     if (scrollTop >= scrollThreshold - 3) {

//     //         if (!loading.current && page <= totalPages) {
//     //             console.log("page", page)
//     //             var k = page + 1
//     //             console.log("KK", k)
//     //             setPage(page => page + 1)
//     //             await fetchData()
//     //         }
//     //     }
//     // };
//     // useEffect(() => {
//     //     if (chatDisplayRef.current) {
//     //         chatDisplayRef.current.addEventListener('scroll', handleScroll);
//     //     }
//     //     return () => {
//     //         if (chatDisplayRef.current) {
//     //             chatDisplayRef.current.addEventListener('scroll', handleScroll);
//     //         }
//     //     };
//     // }, [chatDisplayRef.current]);
//     return (
//         <div className='chat-window'>
//             {idChatCurrent ?
//                 <div className='chat-window__main'>
//                     <div className="header" >
//                         <div className="header__left">
//                             <div className="user-avatar">
//                                 <Avatar avatar={avatar} />
//                                 {checkOnlineStatus(onlineUsers, infoChatCurrent, userCurrent) && <div className='user-avatar__status'></div>}
//                             </div>
//                             {infoChatCurrent &&
//                                 <NameChat chat={infoChatCurrent}
//                                     userCurrent={userCurrent}
//                                     viewStatus={true}
//                                     onlineUsers={onlineUsers}
//                                 />
//                             }
//                         </div>
//                         <div className="header__right">
//                             <div onClick={() => setPage(page + 1)} className={checkOnlineStatus(onlineUsers, infoChatCurrent, userCurrent) ? "icon__call active" : "icon__call"}>
//                                 <IoCallOutline />
//                                 <div className="ripple"></div>
//                             </div>
//                             <div className="icon__video">
//                                 <IoVideocamOutline />
//                             </div>
//                             <div className="icon__list" onClick={() => setIsOpenMenu(true)}>
//                                 <IoEllipsisVerticalOutline />
//                             </div>
//                         </div>
//                     </div>
//                     {listMessageInChat?.length > 0 ?
//                         <div id="infinite-scroll-component__outerdiv">
//                             <InfiniteScroll
//                                 dataLength={totalPages}
//                                 next={fetchData}
//                                 hasMore={true}
//                                 inverse={true}
//                                 className='chat__display'
//                                 scrollableTarget="infinite-scroll-component__outerdiv"
//                             >
//                                 {
//                                     listMessageInChat?.slice().map((message, index) => {
//                                         const isLastMessageFromSender = lastSenderId !== message?.sender?._id;
//                                         const shouldDisplayAvatar = isLastMessageFromSender;
//                                         lastSenderId = message?.sender?._id;

//                                         return (
//                                             <Message
//                                                 key={index}
//                                                 message={message}
//                                                 shouldDisplayAvatar={shouldDisplayAvatar}
//                                                 userCurrent={userCurrent}
//                                             />
//                                         )
//                                     }
//                                     )
//                                 }
//                                 {loading && <div>Loading</div>}
//                             </InfiniteScroll>
//                         </div>
//                         :
//                         <div className="chat__display blank">
//                             Bắt đầu với tin nhắn mới
//                         </div>

//                     }
//                     <div className="chat__bottom">
//                         <form className="bottom-box" onSubmit={handleSendMessgae}>
//                             <input
//                                 type="text"
//                                 placeholder='Nhập tin nhắn'
//                                 value={contentMessage}
//                                 onChange={(e) => setContentMessage(e.target.value)}
//                             />
//                             <button type="submit" >
//                                 <div className="btn-icon-send">
//                                     <LuSendHorizonal />
//                                 </div>
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//                 :
//                 <div className='chat-window__blank'>
//                     Chọn 1 cuộc trò chuyện
//                 </div>
//             }
//         </div >
//     )
// }

// export default ChatWindow
