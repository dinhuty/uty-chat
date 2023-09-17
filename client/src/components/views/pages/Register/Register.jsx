import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import Container from '../../../common/Container'
import Logo from '../../../../assets/login-logo.svg'
import Av from '../../../../assets/login-bg.svg'
import { register } from '../../../../services/Api/auth'
import validate from '../../../../utils/validate'
import { AuthContext } from '../../../Context/AuthContext'


const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null)

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
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(data.email.trim()) || data.password.length < 8 || !data.firstName || !data.lastName || !data.address) {
      setError('Kiểm tra lại thông tin')
      return;
    }
    const registerUser = await register(data);
    console.log(registerUser)
    if(registerUser.status === 200){
      setError('User Already Exist')
      return
    }
    navigate('/login')
  }
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
          {
            error && <div className="register-error">
              {error}
            </div>
          }
        </div>
        <div className="register__form">
          <form action="" onSubmit={handleRegister}>
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
