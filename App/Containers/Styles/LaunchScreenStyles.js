import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingTop: 0
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
    height: Metrics.screenHeight * 0.618,
  },
  article: {
    flex: 1,
    backgroundColor: Colors.windowTint,
    paddingVertical: Metrics.statusBarHeight,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  articleContent: {
    color: Colors.snow
  },
  player: {
    flex: 1
  },
  controls: {
    flexDirection: 'row',
  },
  controlBtn: {
    flex: 1,
  },
  controlBtnImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }

})
