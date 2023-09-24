import React, { useState } from 'react'
import { Input } from '../../common/Input'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../../services/Api/auth'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(false)
    const [error, setError] = useState('')
    console.log(email)
    const handleForgotPassword = (e) => {
        e.preventDefault()
        if (!email) {
            console.log("NHap mail di")
            return
        }
        const postData = async () => {
            const result = await forgotPassword(email)
            console.log("email gui di", email)
            if (result.status === 500) {
                setError("Email chưa được đăng ký")
            } else {
                setStatus(true)
                setError('')
            }

        }
        postData()

    }
    return (
        <div className='app-forgot-password'>
            <main>
                <header>
                    <Link to={"/login"} className="btn">
                        Quay lại
                    </Link>
                    <span className='title'>
                        Quên mật khẩu
                    </span>
                </header>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {status ? <div>
                    Kiểm tra email của bạn
                </div> :
                    <div>
                        <div className="sub">
                            <p>
                                Nhập email của bạn. Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn qua email đó.
                            </p>
                        </div>
                        <form onSubmit={handleForgotPassword}>
                            <Input
                                type={"text"}
                                value={email}
                                setValue={setEmail}
                                placeholder={"example@gmail.com"}
                            />
                            <input className='btn-submit' type="submit" value="Gửi" />
                        </form>
                    </div>
                }
            </main>
        </div>
    )
}
