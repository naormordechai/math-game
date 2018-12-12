import React from 'react';

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



const number = (props) => {
    return (
        <div style={{ transform: 'rotate(0deg)', height: '100%', }} onClick={props.click}>{props.value}</div>
    )
}

export default number