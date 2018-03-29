import React, { Component } from 'react'
import {
  ScrollView, Text, Image, View, ImageBackground, Alert,
  TouchableOpacity, PanResponder, Animated
} from 'react-native'
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Images, Metrics, Colors } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  state = {
    msg: '',
    state: TrackPlayer.STATE_PAUSED,
    spread: false
  }

  componentWillMount() {
    this.playerY = new Animated.Value(0);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: Animated.event([
        null,
        { dy: this.playerY }
      ]),
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
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

  _handlePanResponderEnd = (e, gestureState) => {
    if (this.playerY._value < this.playerPanelHeight / 3) {
      Animated.timing(
        this.playerY,
        {
          toValue: 0,
        }
      ).start();
      this.setState({
        spread: false
      });
      return;
    }

    Animated.timing(
      this.playerY,
      {
        toValue: this.playerPanelHeight,
      }
    ).start();
    this.setState({
      spread: true
    });
  }

  play = async () => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 5
    });
    await TrackPlayer.add([
      {
        id: '00002',
        url: 'http://10.0.0.5:8000/gqcx.m4a',
        title: '古琴禅修',
        artist: '无'
      }, {
        id: '00003',
        url: 'http://10.0.0.5:8000/qxzc.m4a',
        title: '古琴禅修',
        artist: '无'
      }, {
        id: '00001',
        // url: require('../Images/1225.mp3'),
        url: 'http://10.0.0.5:8000/1225.mp3',
        title: '测试',
        artist: '无'
      }
    ]);

    TrackPlayer.play();
  }

  playPrev = () => {
    TrackPlayer.skipToPrevious();
  }

  playNext = () => {
    TrackPlayer.skipToNext();
  }

  togglePlay = () => {
    const { state } = this.state;

    if (state === 'STATE_PLAYING') {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  render () {
    const { msg, state, spread } = this.state;
    const content = `床前明月光 疑是地上霜`;

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ImageBackground
          style={styles.page}
          source={Images.cover}
        >
          <Animated.View style={[styles.article]}>
            <Text style={[styles.text, styles.title]}>静夜思</Text>
            <Text style={[styles.text, styles.author]}>李白</Text>
            <Text style={[styles.text, styles.content]}>{content}</Text>
            <Text style={[styles.text, styles.content]}>举头望明月 低头思故乡</Text>
          </Animated.View>
          <Animated.View
            style={[styles.player, {
              transform: [{
                translateY: this.playerY
              }, {
                perspective: 1000
              }]
            }]}
            onLayout={(e) => {
              this.playerPanelHeight = e.nativeEvent.layout.height;
            }}
            {...this._panResponder.panHandlers}
          > 
            <View style={styles.controls}>
              <TouchableOpacity onPress={this.playPrev} style={styles.controlBtn}>
                <Icon name="skip-previous-circle-outline" size={40} color={Colors.frost} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.togglePlay} style={styles.controlBtn}>
                <Icon
                  name={ state === 'STATE_PLAYING' ? 'pause-circle-outline' : 'play-circle-outline'}
                  size={50}
                  color={Colors.frost}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.playNext} style={styles.controlBtn}>
                <Icon name="skip-next-circle-outline" size={40} color={Colors.frost} />
              </TouchableOpacity>
            </View>
            {spread && (
              <View style={styles.playerPanelToggler}>
                <Icon name="arrow-expand-up" size={44} color={Colors.windowTint} />
              </View>
            )}
          </Animated.View>
        </ImageBackground>
      </View>
    )
  }
}
