import React from 'react';

const number = (props) => {
    return (
        <div style={{transform:'rotate(0deg)', height:'100%'}} onClick={props.click}>{props.value}</div>
    )
}

export default number