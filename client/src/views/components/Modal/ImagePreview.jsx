import React, { useContext } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { changeAvatar } from '../../../services/Api/auth'
import { AuthContext } from '../../../context/AuthContext'

export const ImagePreview = () => {
    const { imageChangeAvatar, setImageChangeAvatar } = useContext(CommonContext)
    const { accessToken } = useContext(AuthContext)
    const handleChangeAvatar = () => {
        console.log(imageChangeAvatar)
        const change = async () => {
            const result = await changeAvatar(imageChangeAvatar, accessToken)
            console.log(result)
        }
        change()
    }
    return (
        <div className='app-image-preview'>
            <div className="image-blur" onClick={() => {
                setImageChangeAvatar("")
            }}>

            </div>
            <main>
                <div className="avatar">
                    {imageChangeAvatar ? <img src={imageChangeAvatar} alt="" /> : <h1>Lỗi truy tải hình ảnh</h1>}
                </div>
                <div className="btn">
                    <button className="btn-cancel" onClick={() => setImageChangeAvatar('')}>
                        Hủy bỏ
                    </button>
                    <button className="btn-save" onClick={handleChangeAvatar}>
                        Đổi
                    </button>
                </div>
            </main>
        </div>
    )
}
