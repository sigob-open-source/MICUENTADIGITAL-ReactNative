// External dependencies
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// Internal dependencies
import HeaderV2 from '../HeaderV2';

// Types & Interfaces
interface IWebViewPageProps {
  /**
   * URL that the web view is going to render.
   */
  uri: string;

  /**
   * Header title.
   *
   * If no title is provided the header is not shown.
   */
  title?: string;

  /**
   * Domains allowed.
   */
  originWhiteList?: string[];
}

const WebViewPage = ({ uri, title, originWhiteList = ['*'] }: IWebViewPageProps) => (
  <View style={styles.container}>
    {Boolean(title) && <HeaderV2 title={title} />}

    <WebView
      source={{ uri }}
      style={styles.webViewContainer}
      originWhitelist={originWhiteList}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
});

export default WebViewPage;
