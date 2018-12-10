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
    }
}

const dialog = ({ classes, translate, text, action }) => {
    return (
        <div style={{ transform: `translate(${translate})` }} className={classes.container} onClick={action}>
            <p>{text}</p>
            <button onClick={action}>try again</button>
        </div>
    )
}

export default injectSheet(styles)(dialog)