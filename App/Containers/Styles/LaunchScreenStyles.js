import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  page: {
    // paddingTop: 0
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    flexDirection: 'column',
    position: 'relative'
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  player: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Metrics.screenWidth,
    backgroundColor: Colors.windowTint,
    borderTopWidth: 1,
    borderTopColor: Colors.windowTint,
  },
  playerPanelToggler: {
    position: 'absolute',
    top: -50,
    right: 5,
  },
  article: {
    // flex: 1,
    position: 'absolute',
    top: Metrics.screenHeight / 4,
    left: 10,
    flexDirection: 'row',
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingTop: 4 * Metrics.doubleBaseMargin,
    // backgroundColor: Colors.windowTint
  },
  title: {
    fontFamily: 'LiXuKe',
    fontSize: 22,
    color: Colors.black,
    fontWeight: 'bold',
    lineHeight: 18 * 1.5
  },
  author: {
    fontFamily: 'LiXuKe',
    fontSize: 16,
    color: Colors.black,
    fontStyle: 'italic',
    lineHeight: 12 * 1.5,
  },
  content: {
    fontFamily: 'LiXuKe',
    fontSize: 20,
    lineHeight: 16 * 1.5,
    color: Colors.black,
    textAlignVertical: 'top',
    fontWeight: '900'
    // backgroundColor: Colors.paper,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Metrics.screenWidth * 0.15,
    // paddingBottom: Metrics.baseMargin
  },
  text: {
    width: 20,
    height: 300
  }
})
