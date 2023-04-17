// External dependencies
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

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

  onMessage?: (event: WebViewMessageEvent) => void;

  injectedJavaScript?: string;
}

interface WebViewPageRefProps {
  reload: () => void;
}

const WebViewPage = forwardRef<WebViewPageRefProps, IWebViewPageProps>((
  {
    uri,
    title,
    originWhiteList = ['*'],
    onMessage,
    injectedJavaScript,
  },
  forwardedRef,
) => {
  const ref = useRef<React.ElementRef<typeof WebView> | null>(null);

  useImperativeHandle(
    forwardedRef,
    () => ({
      reload: () => {
        ref.current?.reload();
      },
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {Boolean(title) && <HeaderV2 title={title} />}

      <WebView
        ref={ref}
        source={{ uri }}
        style={styles.webViewContainer}
        originWhitelist={originWhiteList}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
});

export default WebViewPage;
