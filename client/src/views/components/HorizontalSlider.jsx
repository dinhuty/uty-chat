import React, { useRef, useState } from 'react'
import avatar from '../../assets/svg/avatar-boy.svg'

const HorizontalSlider = () => {
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
        <div
            className="horizontal-slider"
            ref={sliderRef}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={handleMouseMove}
        >
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className='user-potantial__item'>
                    <div className='user__avatar'>
                        <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
                        <div className="user__avatar-status">

                        </div>
                    </div>
                    <div className='user__name'>
                        Dinh Tran
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HorizontalSlider
