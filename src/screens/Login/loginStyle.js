import {StyleSheet} from 'react-native';
import {appStyle, H, W, w} from '~/utils';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: w,
  },
  toast: {
    flex: 1,
    width: w,
  },
  register: {
    flexDirection: 'row',
  },
  form: {flex: 10, alignItems: 'center', width: w},
  button: {
    width: W(80),
    height: H(7),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: appStyle.color,
    borderRadius: 25,
    //shadow-start
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    //shadow-end
  },
  buttonText: {
    fontSize: appStyle.buttonTextSize,
    color: appStyle.secondColor,
  },
  registerTextPrimary: {
    marginTop: W(5),
    fontSize: appStyle.fontSize,
    color: 'black',
  },
  registerText: {
    marginTop: W(5),
    fontSize: appStyle.fontSize,
    color: 'blue',
  },
  input: {
    margin: 5,
    width: W(80),
    height: H(7),
    borderRadius: 15,
    textAlign: 'center',
    //shadow-start
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    //shadow-end
  },
});
