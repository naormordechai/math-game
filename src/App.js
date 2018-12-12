import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Dialog from './components/Dialog/Dialog'
import Game from './Pages/Game/Game'
import './App.css';

const styles = {
  container: {
    height: '100vh',
    background: '#000',
    color: '#fff'
  },
  containerBody: {
    padding: '0 25px',
    color: '#fff',
    fontSize: '25px',
    fontFamily: 'cursive',
    '& > *': {
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 10px',
    background: 'rgba(150,150,150, .5)',
    width: '50%',
    margin: '0 auto',
    '@media(max-width:500px)': {
      width: '80%',
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 12,
      translateStyle: '',
      audio: new Audio('http://s1download-universal-soundbank.com/wav/3218.wav'),
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
        this.state.audio.play()
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
        <div className={classes.header}>
          <div>Time: {this.state.data}</div>
          <div>{this.state.statsGames.success} / {this.state.statsGames.failed}</div>
        </div>
        <div className={classes.containerBody}>
          <Dialog translate={this.state.translate} text={this.state.text} action={() => window.location.reload()} />
          <Game audioLose={this.state.audio} data={data} stopInterval={this.clearIntervalx} statsGames={this.state.statsGames} />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
