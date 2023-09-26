import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { register } from '../../../services/Api/auth'
import { AppLoading } from '../Loading/AppLoading'
import validate from '../../../utils/validate'
import { getValueFirstItem } from '../../../utils/getValueFirstItem'


const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: ""
  });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setErrors(validate(data));
  }, [data]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      setError(getValueFirstItem(errors))
      return;
    }
    setLoading(true)
    const registerUser = await register(data);
    console.log(registerUser)
    if (registerUser.status === 200) {
      setError('Tài khoản đã tồn tại')
      setLoading(false)
      return
    }
    setLoading(false)
    navigate('/login')
  }
  return (
    <div className='app-register'>
      {
        loading &&
        <div className="register-loading">
          <AppLoading />
        </div>
      }
      <div className="register-main">
        <header className="register-title">
          Đăng ký
        </header>
        {error && <div className='error-register'>
          {error}
        </div>}
        <div className="register__form">
          <form action="" onSubmit={handleRegister}>

            <div className="form__input">
              <label htmlFor="email">Tài khoản</label>
              <input
                type="email"
                placeholder='example@gmail.com'
                value={data.email}
                onChange={handleChange}
                name='email'
                autoComplete="off"
              />
              <input
                type="password"
                placeholder='Enter your password'
                value={data.password}
                onChange={handleChange}
                name='password'
              />
            </div>

            <div className="form__input">
              <label htmlFor="address">Thông tin cá nhân</label>
              <div>
                <input
                  type="text"
                  placeholder='Firt Name'
                  value={data.firstName}
                  onChange={handleChange}
                  name='firstName'
                  autoComplete="off"
                />
                <input
                  type="text"
                  placeholder='Last Name'
                  value={data.lastName}
                  onChange={handleChange}
                  name='lastName'
                  autoComplete="off"
                />
              </div>
              <input
                type="address"
                placeholder='Address'
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
            <span>or</span>
            <span></span>
          </div>
          <div className="register__login-btn" onClick={() => navigate('/login')}>
            Đăng nhập ngay
          </div>
        </div>
      </div>


    </div>
  )
}

export default Register
