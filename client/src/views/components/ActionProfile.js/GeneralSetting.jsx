import React, { useContext, useState } from 'react'
import { Input } from '../../common/Input'
import leftArrowIcon from '../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import { CommonContext } from '../../../context/CommonContext'

export const GeneralSetting = () => {
    const { setIsActionProfile } = useContext(CommonContext)
    return (
        <div className='wrapper-setting'>  <div className="header">
            <div className="back" onClick={() => setIsActionProfile(false)}>
                <img src={leftArrowIcon} alt="" />
            </div>
            <div className="title">
                <span>
                    Chung
                </span>
            </div>
        </div></div>
    )
}
