import React, { useContext, useState } from 'react'
import { Input } from '../../common/Input'
import leftArrowIcon from '../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import { CommonContext } from '../../../context/CommonContext'

export const LanguageSetting = () => {
    const { setIsActionProfile } = useContext(CommonContext)
    return (
        <div className='wrapper-language'>  <div className="header">
            <div className="back" onClick={() => setIsActionProfile(false)}>
                <img src={leftArrowIcon} alt="" />
            </div>
            <div className="title">
                <span>
                    Ngôn ngữ
                </span>
            </div>
        </div></div>
    )
}
