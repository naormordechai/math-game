import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Dialog from '../../components/Dialog/Dialog'
import Countdown from 'react-countdown-now';
import Number from '../../components/Number/Number'

const styles = {
    container: {
        maxWidth: '650px',
        margin: '0 auto',
        marginTop: '50px',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        '& > *': {
            textAlign: 'center',
            boxShadow: '1px 2px 1px',
            border: '1px solid grey',
            marginRight: '25px',
            height: '40px',

        },
        '& div:nth-child(even)': {
            marginTop: '50px',
            transform: 'rotate(10deg)'

        },
        '& div:nth-child(odd)': {
            transform: 'rotate(-10deg)'
        }
    },
    numberCard: {
    }
}

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nums: [],
            num: null,
            results: [],
            isFaild: false,
            translate: null,
            text: ''
        }
    };

    componentDidMount() {
        this.genreateNums()
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    genreateNums = () => {
        let nums = []
        let arr = [];
        let num = 0;
        for (let i = 0; i < 6; i++) {
            nums[i] = { num: Math.floor(Math.random() * 19) + 1, isClicked: false }
        }
        this.setState({
            ...this.state,
            nums,
        }, () => {
            for (let i = 0; i < 4; i++) {
                var randNum = Math.floor(Math.random() * 6)
                if (arr.indexOf(randNum) === -1) {
                    arr.push(randNum)
                    num += this.state.nums[randNum].num
                } else {
                    i--
                }
            }
            this.setState({
                ...this.state,
                num
            })
        })
    }

    genreateNum = (nums) => {
        let num = 0;
        var arr = [];
        for (let i = 0; i < 4; i++) {
            var randNum = Math.floor(Math.random() * 6)
            if (arr.indexOf(randNum) === -1) {
                arr.push(randNum)
                num += nums[randNum].num
            } else {
                i--
            }
        }
        this.setState({
            ...this.state,
            num
        })
    }

    handlerNumber = (num, stopInerval) => {
        let statsGames = JSON.parse(sessionStorage.getItem('bestGames'));
        console.log(statsGames);
        if (!num.isClicked) {
            num.isClicked = true
            this.setState({
                ...this.state,
                results: this.state.results.concat(num.num)
            }, () => {
                const sum = this.state.results.reduce((acc, val) => {
                    return acc + val
                }, 0);
                if (this.state.num === sum) {
                    this.setState({
                        ...this.state,
                        translate: '0',
                        text: 'Well Done, You did it!'
                    })
                    statsGames.success++
                    statsGames.failed++
                    sessionStorage.setItem('bestGames', JSON.stringify(statsGames))
                } else if (this.state.num < sum) {
                    this.setState({
                        ...this.state,
                        translate: '0',
                        text: 'nope, Try Again'
                    })
                    statsGames.failed++
                    sessionStorage.setItem('bestGames', JSON.stringify(statsGames))
                }
                stopInerval()
            })
        }
    }

    randomColor = (ref) => {
        if (ref && !ref.style.background) ref.style.background = this.getRandomColor()
    }

    render() {
        const { classes, statsGames } = this.props
        return (
            <div>
                <Dialog translate={this.state.translate} text={this.state.text} action={() => window.location.reload()} />
                <div>{this.state.num}</div>
                <div className={classes.container}>
                    {this.state.nums.map((num, i) => (
                        <div ref={e => this[`num${i}`] = e}
                            key={i}
                            style={{ background: this.randomColor(this[`num${i}`]), opacity: num.isClicked ? '.3' : null }}
                            className={classes.numberCard}>
                            <Number key={i} value={num.num} click={() => this.handlerNumber(num, this.props.stopInterval, statsGames)} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Game)