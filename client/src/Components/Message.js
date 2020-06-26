import React from 'react'


const getStyle = (props) => {
    let baseClass = "alert "
    if(props.message.msgError) {
        baseClass += "alert-danger"
    } else {
        baseClass += "alert-primary"
    }
    return baseClass + " text-center"
}

export const Message = (props) => {
    return (
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
} 