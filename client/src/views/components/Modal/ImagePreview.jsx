import React, { useContext, useState } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { changeAvatar } from '../../../services/Api/auth'
import { AuthContext } from '../../../context/AuthContext'
import { AppLoading } from '../../pages/Loading/AppLoading'

export const ImagePreview = () => {
    const { imageChangeAvatar, setImageChangeAvatar } = useContext(CommonContext)
    const { accessToken, setUserCurrent } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const handleChangeAvatar = async () => {
        console.log("Acction Change: ", accessToken)
        setLoading(true)
        const result = await changeAvatar(imageChangeAvatar, accessToken)
        setUserCurrent(result.data.user)
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setImageChangeAvatar('')
        setLoading(false)
    }
    return (
        <div className='app-image-preview'>
            <div className="image-blur" onClick={() => {
                setImageChangeAvatar("")
            }}>
                {
                    loading && <div className="loading">
                        <AppLoading />
                    </div>
                }
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
