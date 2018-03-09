import React, { Component } from 'react'
import {
  ScrollView, Text, Image, View, ImageBackground, Alert,
  TouchableOpacity
} from 'react-native'
import TrackPlayer from 'react-native-track-player';
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  state = {
    msg: '',
    state: TrackPlayer.STATE_PAUSED
  }

  componentDidMount() {
    TrackPlayer.registerEventHandler(async (data) => {
      switch(data.type) {
        case 'remote-play':
          TrackPlayer.play();
          break;
        case 'remote-pause':
          TrackPlayer.pause();
          break;
        case 'remote-stop':
          TrackPlayer.stop();
          break;
        case 'remote-next':
          TrackPlayer.skipToNext();
          break;
        case 'remote-previous':
          TrackPlayer.skipToPrevious();
          break;
        case 'remote-seek':
          TrackPlayer.seekTo(data.position);
          break;

        // You can make ducking smoother by adding a fade in/out
        case 'remote-duck':
          TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
          break;
        // Playback updates
        case 'playback-state':
          // store.dispatch(playbackState(data.state));
          this.setState({
            state: data.state
          })
          break;
        case 'playback-track-changed':
          // store.dispatch(playbackTrack(data.nextTrack));
          break;
        case 'playback-error':
          Alert.alert('An error ocurred', data.error);
          break;
      }
      const { msg } = this.state;
      this.setState({
        msg: msg + '\n' + JSON.stringify(data)
      })
    });
    this.play();
  }

  play = async () => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 5
    });
    await TrackPlayer.add({
      id: '00001',
      // url: require('../Images/1225.mp3'),
      url: 'http://10.187.72.108:8000/1225.mp3',
      title: '测试',
      artist: '无'
    });

    TrackPlayer.play();
  }

  playPrev = () => {}

  playNext = () => {}

  togglePlay = () => {
    const { state } = this.state;

    if (state === 'STATE_PLAYING') {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  render () {
    const { msg, state } = this.state;

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <ImageBackground
            style={styles.bg}
            source={Images.cover}
          >
            <View style={[styles.centered, styles.article]}>
              <Text style={styles.articleContent}>
                This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.player}>
            <View style={styles.controls}>
              <TouchableOpacity onPress={this.playPrev} style={styles.controlBtn}>
                <Image
                  source={Images.playerPrevBtn}
                  style={styles.controlBtnImg}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.togglePlay} style={styles.controlBtn}>
                <Image
                  source={state === 'STATE_PLAYING' ? Images.playerPauseBtn : Images.playerPlayBtn}
                  style={styles.controlBtnImg}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.playNext} style={styles.controlBtn}>
                <Image
                  source={Images.playerNextBtn}
                  style={styles.controlBtnImg}
                />
              </TouchableOpacity>
            </View>
            <Text>{state}</Text>
            <Text style={styles.sectionText}>{msg}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
