import React, { useContext, useState } from 'react'
import { Input } from '../../common/Input'
import leftArrowIcon from '../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import { CommonContext } from '../../../context/CommonContext'
import { AuthContext } from '../../../context/AuthContext'
import { changePassword } from '../../../services/Api/auth'


export const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { setIsActionProfile } = useContext(CommonContext)
    const [status, setStatus] = useState(null)
    const [success, setSuccess] = useState(false)
    const { accessToken } = useContext(AuthContext)
    const rules = [
        "Gồm cả chữ hoa và thường",
        "Gồm ít nhất một số hoặc một ký tự",
        "Ít nhất 8 chữ số"
    ]

    const handleChangePassword = () => {
        if (oldPassword.trim() === ''
            || newPassword.trim() === ''
            || confirmPassword.trim() === '') {
            setStatus("Điền đủ thông tin")
            return
        }
        if (newPassword !== confirmPassword) {
            setSuccess(false)
            setStatus("Mật khẩu không khớp")
            return
        }
        if (oldPassword === newPassword) {
            setSuccess(false)
            setStatus("Mật khẩu mới phải khác mật khẩu cũ")
            return
        }
        console.log("Action Change Password:", accessToken)
        const updatePassword = async () => {
            const res = await changePassword(
                { oldPassword, newPassword, confirmPassword }
                , accessToken)
            if (res.status === 200) {
                setSuccess(true)
                setStatus("Đổi mật khẩu thành công")
                setOldPassword('')
                setNewPassword('')
                setConfirmPassword('')
            } else if (res.status === 400) {
                setSuccess(false)
                setStatus("Mật khẩu không chính xác")
            } else {
                setSuccess(false)
                setStatus("Bạn không thể thay đổi lúc này")
            }
        }
        updatePassword()
    }
    return (
        <section className="wrapper-password">
            <div className="header">
                <div className="back" onClick={() => setIsActionProfile(false)}>
                    <img src={leftArrowIcon} alt="" />
                </div>
                <div className="title">
                    <span>
                        Thay đổi mật khẩu
                    </span>
                </div>
            </div>
            <main>
                {status && <div className={!success ? "error-pw" : "error-pw success"}>
                    {status}
                </div>}
                <div className="new-pw">
                    <label>
                        Mật khẩu hiện tại
                    </label>
                    <Input
                        value={oldPassword}
                        setValue={setOldPassword}
                        placeholder={"Nhập mật hiện tại"}
                        type={"password"}
                    />
                </div>

                <div className="old-pw">
                    <label>
                        Mật khẩu mới
                    </label>
                    <Input
                        value={newPassword}
                        setValue={setNewPassword}
                        placeholder={"Nhập mật khẩu mới"}
                        type={"password"}
                    />
                    <Input
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        placeholder={"Xác nhận mật khẩu"}
                        type={"password"}
                    />
                </div>
            </main>
            <div className="bottom">
                <button className="btn-save" onClick={handleChangePassword}>
                    Lưu
                </button>
                <button className="btn-cancel" onClick={() => setIsActionProfile(false)}>
                    Hủy
                </button >
            </div>
            <div className="attention">
                <ul>
                    <li>Mật khẩu</li>
                    {rules.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

        </section>
    )
}
