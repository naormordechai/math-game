import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Dialog from './components/Dialog/Dialog'
import Game from './Pages/Game/Game'
import './App.css';

const styles = {
  container: {
    background: 'black',
    height: '100vh',
    padding: '0 25px',
    color: '#fff',
    fontSize: '25px'
  },
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 10,
      translate: '',
      text: ''
    }
  }

  x = null

  componentDidMount() {
    this.x = setInterval(() => {
      this.updateDate()
    }, 1000);
  }

  updateDate = () => {
    this.setState((prevState) => ({
      ...this.state,
      data: prevState.data - 1
    }), () => {
      if (this.state.data === 0) {
        clearInterval(this.x)
        this.setState({
          ...this.state,
          translate: '0',
          text: 'nope, the time is over, Try Again'
        })
      }
    })
  }

  clearIntervalx = () => clearInterval(this.x)


  render() {
    const { classes } = this.props
    const { data } = this.state
    return (
      <div className={classes.container}>
        <Dialog translate={this.state.translate} text={this.state.text} action={() => window.location.reload()} />
        <div>{this.state.data}</div>
        <Game data={data} stopInterval={this.clearIntervalx} />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
