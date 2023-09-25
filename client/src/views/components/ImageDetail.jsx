import React, { useContext, useState } from 'react'
import { MessageContext } from '../../context/MessageContext'

export const ImageDetail = () => {
    const {
        imageOpen,
        setImageOpen
    } = useContext(MessageContext)
    return (
        <div className='app-image-detail'>
            <div className="image-blur" onClick={() => {
                setImageOpen("")
            }}>

            </div>

            {imageOpen ? <img src={imageOpen} alt="" /> : <h1>Lỗi truy tải hình ảnh</h1>}
        </div>
    )
}
