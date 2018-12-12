import React from 'react'
import injectSheet from 'react-jss'

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        background: 'rgba(150,150,150,.5)',
        position: 'fixed',
        top: '0',
        left: '0',
        transform: 'translate(-100%, 0)',
        transition: '.3s',
        zIndex: '2'
    },
    box: {
        width: '400px',
        background: 'rgba(0,0,0)',
        margin: 'auto',
        textAlign: 'center',
        '& button': {
            background: 'inherit',
            color: '#fff',
            border: '4px solid grey',
            borderRadius: '10000px',
            outline: 'none',
            padding: '5px 25px',
            fontSize: '20px',
            marginBottom: '10px'
        },
        '@media(max-width:500px)': {
            width: '100%'
        }
    }
}

const dialog = ({ classes, translate, text, action }) => {
    return (
        <div style={{ transform: `translate(${translate})` }} className={classes.container} onClick={action}>
            <div className={classes.box}>
                <p>{text}</p>
                <button onClick={action}>Try Again</button>
            </div>
        </div>
    )
}

export default injectSheet(styles)(dialog)