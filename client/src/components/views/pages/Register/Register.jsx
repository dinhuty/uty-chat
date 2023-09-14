import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Container from '../../../common/Container'
import Logo from '../../../../assets/login-logo.svg'
import Av from '../../../../assets/login-bg.svg'

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: ""
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className='app-register'>
      <div className="register__left">
        <div className="logo__container">
          <div className="logo__img">
            <img src={Logo} alt="" />
            <span>UTY</span>
          </div>
          <div className="subtitle">
            Register an account
          </div>
        </div>
        <div className="register__form">
          <form action="">
            <div className="form__input">
              <input
                type="text"
                placeholder='Firt Name'
                value={data.firstName}
                onChange={handleChange}
                name='firstName'
              />
              <input
                type="text"
                placeholder='Last Name'
                value={data.lastName}
                onChange={handleChange}
                name='lastName'
              />
            </div>
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

            <div className="form__input">
              <label htmlFor="address">Address</label>
              <input
                type="address"
                placeholder='Enter your password'
                value={data.address}
                onChange={handleChange}
                name='address'
              />
            </div>
            <input className='form__submit' type="submit" value="Đăng ký" />
          </form>
        </div>
        <div className="register__sub">
          <div className="register__line">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <div className="register__login-btn" onClick={() => navigate('/login')}>
            Đăng nhập ngay
          </div>

        </div>
      </div>
      <div className="register__right">
        <div className="register__right__img">
          <img src={Av} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Register
