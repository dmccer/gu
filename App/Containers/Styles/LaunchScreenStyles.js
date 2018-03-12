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
  },
  article: {
    flex: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingTop: Metrics.doubleBaseMargin,
    // backgroundColor: Colors.bloodOrange
  },
  title: {
    fontSize: 22,
    color: Colors.snow,
    fontWeight: 'bold',
    lineHeight: 18 * 1.5
  },
  author: {
    fontSize: 14,
    color: Colors.ricePaper,
    fontStyle: 'italic',
    lineHeight: 14 * 1.5
  },
  content: {
    fontSize: 18,
    color: Colors.snow,
    lineHeight: 16 * 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Metrics.screenWidth * 0.15,
    paddingBottom: Metrics.baseMargin
  }
})
