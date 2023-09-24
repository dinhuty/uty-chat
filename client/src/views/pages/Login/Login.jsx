import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { login } from '../../../services/Api/auth'
import { AuthContext } from '../../../context/AuthContext'
import { AppLoading } from '../Loading/AppLoading'

const Login = () => {
  const { setUserCurrent } = useContext(AuthContext)
  const [errorLogin, setErrorLogin] = useState('')
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    const userLogin = await login(data);
    if (userLogin.status === 200) {
      localStorage.setItem('user', JSON.stringify(userLogin.data.user));
      localStorage.setItem('token', userLogin.data.token);
      setUserCurrent(userLogin.data.user)
      navigate('/')
      setLoading(false)
    } else {
      setErrorLogin('Tài khoản mật khẩu không chính xác')
    }
    setLoading(false)

  }
  return (
    <div className='app-login'>
      {
        loading &&
        <div className="login-loading">
          <AppLoading />
        </div>
      }
      <div className="login-main">
        <div className="login-title">
          Đăng nhập
        </div>
        {errorLogin && <div className='error-login'>
          {errorLogin}
        </div>}
        <div className="login__form">
          <form action="" onSubmit={handleLogin}>
            <div className="form__input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder='example@gmail.com'
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

            <input className='form__submit' type="submit" value="Đăng nhập" />
          </form>
        </div>
        <div className="login__sub">
          <Link className="login__password-fg" to={"/forgot-password"}>
            Quên mật khẩu
          </Link>
          <div className="login__line">
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <div className="login__register-btn" onClick={() => navigate('/register')}>
            Đăng ký ngay
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
