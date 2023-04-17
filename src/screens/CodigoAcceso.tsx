// External dependencies
import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
  Text,
  Keyboard,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import Card from '../components/Card';
import HeaderV2 from '../components/HeaderV2';
import { RootStackParamList } from '../types/navigation';
import { obtenerAcceso } from '../services/cuentaunicasir/auth';
import { setAuthInformation } from '../store-v2/reducers/auth';
import { useNotification } from '../components/DropDownAlertProvider';

// Types & Interfaces
type ICodigoAccesoScreenProps = NativeStackScreenProps<RootStackParamList, 'codigoScreen'>;

// Constants
const INPUTS = Array.from({ length: 6 }).map((_, k) => k);

const CodigoAccesoScreen = ({ navigation }: ICodigoAccesoScreenProps) => {
  // Refs
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Component's state
  const [code, setCode] = useState<string[]>(INPUTS.map(() => ''));
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Misc
  const dispatch = useDispatch();
  const notify = useNotification();

  // Handlers
  const validate = () => {
    setErrorText('');

    const isNotCompleted = code.some((x) => !x);
    if (isNotCompleted) {
      setErrorText(`Ingrese los ${INPUTS.length} digitos`);
      return false;
    }

    return true;
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    if (value === '') {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const setRef = (component: React.ElementRef<typeof TextInput> | null, index: number) => {
    inputRefs.current[index] = component;
  };

  const submit = async () => {
    const isValid = validate();

    if (isValid) {
      setLoading(true);
      // this joins all the code digits into a single string
      const codeStr = code.join('');

      const { success, errors, result } = await obtenerAcceso({
        catalogo_canal_de_pago: 4,
        codigo: codeStr,
        entidad: 1,
      });

      setLoading(false);
      if (success) {
        dispatch(setAuthInformation({
          access: result.access_token,
          ciudadano: result.ciudadano,
        }));

        navigation.reset({
          index: 0,
          routes: [{
            name: 'menuInicio',
          }],
        });

        return;
      }

      if (errors.fields?.codigo) {
        setErrorText('Código no válido');
      } else {
        notify({
          message: 'Ha ocurrido un error, intente más tarde.',
          title: 'Error',
          type: 'error',
        });
      }

      // Clear invalid code
      setCode(INPUTS.map(() => ''));
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    const digitsEntered = code.filter((x) => x.length >= 1).length;

    if (!loading && digitsEntered === INPUTS.length) {
      void submit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, code]);

  return (
    <>
      <HeaderV2
        title="Verificar Número de Teléfono"
      />

      <View style={styles.container}>

        <Card style={{ padding: 20 }}>
          <Text style={styles.legend}>
            Para iniciar sesión, es necesario verificar su
            número de teléfono mediante el código de
            {' '}
            {INPUTS.length}
            {' '}
            dígitos que recibirá
            por correo electrónico o SMS.
          </Text>

          <View style={styles.codeContainer}>
            {INPUTS.map((key, index) => (
              <TextInput
                key={key}
                ref={(ref) => setRef(ref, index)}
                style={[styles.codeInput, {
                  marginLeft: index === 0 ? 0 : 5,
                  marginRight: index === INPUTS.length - 1 ? 0 : 5,
                }]}
                value={code[index]}
                onChangeText={(value) => handleCodeChange(index, value)}
                keyboardType="default"
                maxLength={1}
                textAlign="center"
                onKeyPress={(e) => handleCodeKeyDown(index, e)}
                placeholder="_"
                autoCapitalize="none"
              />
            ))}
          </View>

          {
            Boolean(errorText) && (
              <Text style={styles.errorText}>
                { errorText }
              </Text>
            )
          }

        </Card>

        <Button
          loading={loading}
          size="large"
          style={styles.cta}
          text="Continuar"
          onPress={submit}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  legend: {
    textAlign: 'center',
  },
  codeInput: {
    height: 60,
    width: 45,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  cta: {
    marginTop: 20,
  },
});

export default CodigoAccesoScreen;
