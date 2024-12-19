import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f9f9f9',
    renderingMode: 'seperated',
    backgroundColorContent: '#f9f9f9',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#333',
    selectedColor: '#27ba9b',
    backgroundColor: '#FFF',
    borderStyle: 'white',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabs/home_default.png',
        selectedIconPath: 'static/tabs/home_selected.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      // {
      //   iconPath: 'static/tabbar/example.png',
      //   selectedIconPath: 'static/tabbar/exampleHL.png',
      //   pagePath: 'pages/about/about',
      //   text: '关于',
      // },
      {
        text: '我的',
        pagePath: 'pages/my/my',
        iconPath: 'static/tabs/user_default.png',
        selectedIconPath: 'static/tabs/user_selected.png',
      },
    ],
  },
})
