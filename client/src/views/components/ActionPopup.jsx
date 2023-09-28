import React, { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../../context/CommonContext'
import CreateGroup from './Modal/CreateGroup'
import { AddUserToGroup } from './Modal/AddUserToGroup'
import { DeleteChat } from './Modal/DeleteChat'
import { LeaveChat } from './Modal/LeaveChat'
import { BlockUser } from './Modal/BlockUser'
import { ThemeMessage } from './Modal/ThemeMessage'
import { Participants } from './Modal/Participants'
import { EditNameGroup } from './Modal/EditNameGroup'

const ActionPopup = ({ action }) => {
    const { setIsPopup } = useContext(CommonContext)
    let componentToRender = null;

    switch (action) {
        case "CREATE_GROUP_CHAT":
            componentToRender = <CreateGroup />;
            break;
        case "VIEW_PARTICIPANTS":
            componentToRender = <Participants />;
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
        case "EDIT_NAME":
            componentToRender = <EditNameGroup />;
            break;
        case "BLOCK_USER":
            componentToRender = <BlockUser />;
            break;
        case "CUSTOM_THEME":
            componentToRender = <ThemeMessage />;
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
