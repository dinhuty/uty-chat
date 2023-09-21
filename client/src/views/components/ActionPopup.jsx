import React, { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../../context/CommonContext'
import CreateGroup from './Popups/CreateGroup'
import { AddUserToGroup } from './Popups/AddUserToGroup'
import { DeleteChat } from './Popups/DeleteChat'
import { LeaveChat } from './Popups/LeaveChat'

const ActionPopup = ({ action }) => {
    const { setIsPopup } = useContext(CommonContext)
    let componentToRender = null;

    switch (action) {
        case "CREATE_GROUP_CHAT":
            componentToRender = <CreateGroup />;
            break;
        case "ADD_USER_GROUP":
            componentToRender = <AddUserToGroup />;
            break;
        case "DELETE_CHAT":
            componentToRender = <DeleteChat />;
            break;
        case "OUT_GROUP":
            componentToRender = <LeaveChat />;
            break;
        default:
            componentToRender = <CreateGroup />;
            break;
    }
    return (
        <div className='wrapper-add'>
            <div className="wrapper-add__blur" onClick={() => {
                setIsPopup(false)
            }}>
            </div>
            {componentToRender}
        </div>
    )
}

export default ActionPopup