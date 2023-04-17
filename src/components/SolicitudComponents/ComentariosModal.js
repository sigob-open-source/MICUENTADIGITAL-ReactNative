import {
  Modal, TouchableOpacity, StyleSheet, View, Text, TextInput, Alert,
} from 'react-native';
import React, { useState } from 'react';

import Header from '../Header';
import Footer from '../Footer';

const ComentarioModal = (props) => {
  const [textLength, setTextLength] = useState(0);
  const [comment, setComment] = useState('');
  const [maxLength, setMaxLength] = useState(250);

  const onChangeText = (text) => {
    setTextLength(text.length);
    setComment(text);
  };

  const _handleSendComment = () => {
    if (textLength > 0) {
      props.modalToParent(comment);
      setTimeout(() => {
        setTextLength(0);
      }, 300);
    }
  };

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;

    return (

      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>

    );
  };

  const renderTitle = () => (
    <View>
      <Text style={{
        color: '#8F8F8F',
        fontSize: 16,
        margin: 15,
      }}
      >
        {props.title}
      </Text>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.open}
      onRequestClose={props.close}
    >

      <View style={{ flex: 1 }}>

        <Header
          style={styles.header}
          item="Trámites"
          imgnotif={require('../../../assets/imagenes/notificationGet_icon.png')}
          img={require('../../../assets/imagenes/header_logo.png')}
        />

        {renderOutsideTouchable(props.onTouchOutside)}
        <View style={{
          backgroundColor: '#EDF2F5',
          width: '100%',
          height: '100%',
        }}
        >
          <View style={{ marginTop: '24%' }}>
            {renderTitle()}

            <TextInput
              color="black"
              onChangeText={(text) => onChangeText(text)}
              maxLength={250}
              style={{ paddingHorizontal: '5%' }}
              multiline
            />

            <View style={{
              width: '95%',
              height: 1,
              backgroundColor: 'black',
              alignSelf: 'center',
            }}
            />

            <Text style={{ textAlign: 'right', paddingHorizontal: '5%' }}>
              {textLength}
              /250
            </Text>

            <View style={styles.sendRequestGeneralContainer}>
              <TouchableOpacity onPressIn={() => _handleSendComment()} onPress={props.close}>
                <View style={styles.sendRequestStyle}>

                  <View style={styles.sendRequestContainer}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Subir Comentario</Text>
                  </View>

                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Footer
        back={props.close}
        showBack
        style={styles.footer}
      />

    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
    marginBottom: 14,
  },
  optionCard: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    backgroundColor: '#e6e6e6',
  },
  collapsibleContent: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapsibleText: {
    fontWeight: '500',
    marginLeft: '10%',
    fontSize: 20,
    color: 'black',
  },
  sendRequestContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRequestGeneralContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '136%',
  },
  sendRequestStyle: {
    width: 333,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#4EDE7F',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  footer: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 7 },
    shadowRadius: 32,
    shadowOpacity: 0.25,
    elevation: 20,
  },
});

export default ComentarioModal;
