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
    fontSize: '25px',
    fontFamily: 'cursive',
    '& > *': {
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 15,
      translate: '',
      text: '',
      statsGames: {
        success: 0,
        failed: 0
      }
    }
  }

  x = null

  componentDidMount() {
    if (!sessionStorage.getItem('bestGames')) {
      sessionStorage.setItem('bestGames', JSON.stringify(this.state.statsGames))
    } else {
      const statsGames = JSON.parse(sessionStorage.getItem('bestGames'));
      this.setState({
        ...this.state,
        statsGames
      })
    }
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
          text: 'nope, the time is over, Try Again',
          statsGames: {
            ...this.state.statsGames,
            failed: this.state.statsGames.failed + 1
          }
        }, () => {
          sessionStorage.setItem('bestGames', JSON.stringify(this.state.statsGames))
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
        <div className={classes.header}>
          <div>Time: {this.state.data}</div>
          <div>{this.state.statsGames.success} / {this.state.statsGames.failed}</div>
        </div>
        <Game data={data} stopInterval={this.clearIntervalx} statsGames={this.state.statsGames}/>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
