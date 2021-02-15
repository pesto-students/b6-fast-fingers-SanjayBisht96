import '../styles/globals.css'
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';
import { counterMiliSecSpeed, homeUrl } from '../components/consts';

export default class MyApp extends App {
  state = {
    user: null,
    diffLevel: "Easy",
    word:'',
    time: 0,
    score: 0,
    diffFactor: 1,
    userScoreList: []
  };

  setTime = (setThisTime) => {
    this.setState({
      time: parseInt(setThisTime),
    });
  }

  setScore = (setThisScore) => {
    this.setState({
      score: parseInt(setThisScore),
    });
    localStorage.setItem("currentScore",this.state.score);
  }

  updateScore = () => {
      this.setState({
        score: parseInt(this.state.score) + counterMiliSecSpeed,
      });
    localStorage.setItem("currentScore",this.state.score);
  }

  resetScore = () => {
    this.setState({
      score: 0
    });
  }

  updateDiffFactor = (factor,increment = 0) => {
    factor = factor + increment;
    localStorage.setItem('diffFactor',factor);
    this.setState({
      diffFactor: parseFloat(factor)
    });
  }

  updateDiffLevel = (level) => {
    localStorage.setItem('diffLevel',level);
    this.setState({
      diffLevel: level
    });  
  }

  resetGame = () => {
    localStorage.clear();
    this.setState({
      user: null,
      diffLevel: "Easy",
      word:'',
      time: 0,
      score: 0,
      diffFactor: 1,
      userScoreList: []
    });
    Router.push(homeUrl);
  }

  addScoreToList = (ScoreList) => {
    if(ScoreList){
      this.setState({
        userScoreList: [...ScoreList]
      });
    }
  }

  getFormattedTime = (timeInMilliSeconds) => {
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    const ms = timeInMilliSeconds % 1000;
    timeInMilliSeconds = (timeInMilliSeconds - ms) / 1000;
    const secs = timeInMilliSeconds % 60;
    timeInMilliSeconds = (timeInMilliSeconds - secs) / 60;
    const mins = timeInMilliSeconds % 60;
    const hrs = (timeInMilliSeconds - mins) / 60;
    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
  }

  componentDidMount = () => {
    const user = localStorage.getItem('userName');
    const diffLevel = localStorage.getItem('diffLevel');
    if (user && diffLevel) {
      this.setState({
        user, diffLevel
      });
    } else {
      Router.push(homeUrl);
    }
  };


  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider value={{
                ...this.state,
                setTime: this.setTime,
                resetGame: this.resetGame,
                updateScore: this.updateScore,
                setScore: this.setScore,
                resetScore: this.resetScore,
                getFormattedTime: this.getFormattedTime,
                addScoreToList: this.addScoreToList,
                updateDiffFactor: this.updateDiffFactor,
                updateDiffLevel: this.updateDiffLevel
              }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}

