import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Logo from '../../../../assets/login-logo.svg'
import Av from '../../../../assets/login-bg.svg'
import { login } from '../../../../services/Api/auth'
import { AuthContext } from '../../../Context/AuthContext'

const Login = () => {
  const { setUserCurrent } = useContext(AuthContext)
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  // Login Page
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    const userLogin = await login(data);
    console.log(userLogin.user)
    localStorage.setItem('user', JSON.stringify(userLogin.user));
    localStorage.setItem('token', userLogin.token);
    setUserCurrent(userLogin.user)
    navigate('/')
  }
  return (
    <div className='app-login'>
      <div className="login__left">
        <div className="logo__container">
          <div className="logo__img">
            <img src={Logo} alt="" />
            <span>UTY</span>
          </div>
          <div className="subtitle">
            Login into your account
          </div>
        </div>
        <div className="login__form">
          <form action="" onSubmit={handleLogin}>
            <div className="form__input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder='Enter your email'
                value={data.email}
                onChange={handleChange}
                name='email'
              />
            </div>
            <div className="form__input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder='Enter your password'
                value={data.password}
                onChange={handleChange}
                name='password'
              />
            </div>

            <input className='form__submit' type="submit" value="Login" />
          </form>
        </div>
        <div className="login__sub">
          <div className="login__password-fg">
            Quên mật khẩu
          </div>
          <div className="login__line">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <div className="login__register-btn" onClick={() => navigate('/register')}>
            Đăng ký ngay
          </div>

        </div>
      </div>
      <div className="login__right">
        <div className="login__right__img">
          <img src={Av} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login
