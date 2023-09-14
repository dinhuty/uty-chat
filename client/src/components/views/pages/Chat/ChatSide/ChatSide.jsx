import React, { useRef, useState } from 'react'

const ChatSide = () => {
    const sliderRef = useRef(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const startDragging = (e) => {
        setMouseDown(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const stopDragging = () => {
        setMouseDown(false);
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (!mouseDown) return;
        const x = e.pageX - sliderRef.current.offsetLeft;
        const scroll = x - startX;
        sliderRef.current.scrollLeft = scrollLeft - scroll;
    };
    return (
        <div className='chat-side'>
            <div className="chat-side__top">
                <div className="title">
                    Chat
                </div>
                <div className="search-box">
                    <input type="text" placeholder='Tìm kiếm tin nhắn ' />
                </div>
                <div
                    className="chat-side__user-potantial"
                    ref={sliderRef}
                    onMouseDown={startDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onMouseMove={handleMouseMove}
                >
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className='user-potantial__item'>
                            <div className='user__avatar'>
                                <img className="w-10 h-10 rounded-full" src="https://i.pinimg.com/1200x/df/be/0c/dfbe0cc954454f9a68e095631e114ba8.jpg" alt="Rounded avatar" />
                            </div>
                            <div className='user__name'>
                                Dinh Tran
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-side__title">
                    Gần đây
                </div>
            </div>

            <div className="chat-side__list">

                {/* active */}
                <div className="chat-list__item active">
                    <div className="item__left">
                        <div className="avatar">
                            <img className="w-10 h-10 rounded-full" src="https://i.pinimg.com/1200x/df/be/0c/dfbe0cc954454f9a68e095631e114ba8.jpg" alt="Rounded avatar" />
                        </div>
                        <div className="desc">
                            <div className="desc__name">
                                Trần Văn Dinh
                            </div>
                            <div className="desc-message--recent">
                                Bảo: Hello Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus veritatis ad ex quae nihil. Repellat
                            </div>
                        </div>
                    </div>
                    <div className="item__right">
                        10:15 AM
                    </div>
                </div>
                {Array.from({ length: 16 }).map((_, index) => (
                    <div key={index} className="chat-list__item">
                        <div className="item__left">
                            <div className="avatar">
                                <img className="w-10 h-10 rounded-full" src="https://i.pinimg.com/1200x/df/be/0c/dfbe0cc954454f9a68e095631e114ba8.jpg" alt="Rounded avatar" />
                            </div>
                            <div className="desc">
                                <div className="desc__name">
                                    Trần Văn Dinh{index}
                                </div>
                                <div className="desc-message--recent">
                                    Bảo: Hello Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus veritatis ad ex quae nihil. Repellat
                                </div>
                            </div>
                        </div>
                        <div className="item__right">
                            10:15 AM
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ChatSide
