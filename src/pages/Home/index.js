import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [kategori, setKategori] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);

      // console.log(obj);

      // alert(obj.notification.title)



      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'ceysastirhandal', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });

    getDataKategori();

    if (isFocused) {
      __getDataUserInfo();
    }
    return unsubscribe;
  }, [isFocused]);


  const getDataKategori = () => {
    axios.post(urlAPI + '/1data_kategori.php').then(res => {
      console.log('kategori', res.data);

      setKategori(res.data);
    })
  }


  const __getDataUserInfo = () => {
    getData('user').then(users => {
      console.log(users);
      setUser(users);
      axios.post(urlAPI + '/1_cart.php', {
        fid_user: users.id
      }).then(res => {
        console.log('cart', res.data);

        setCart(parseFloat(res.data))
      })
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);
          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;


  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Barang', {
        key: item.id,
        id_user: user.id
      })} style={{
        padding: 10,
        paddingTop: 5,
        flex: 1,

      }}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary,
          borderRadius: 20,
          margin: 10,
        }}>
          <Image style={{
            width: '70%',
            height: 150,
            resizeMode: 'contain'

          }} source={{
            uri: item.image
          }} />
        </View>
        <Text style={{
          textAlign: 'center',
          color: colors.primary,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 30,
        }}>{item.nama_kategori}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,

      }}>


      <ScrollView>
        <View
          style={{
            height: windowHeight / 9,
            padding: 10,
            marginBottom: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            // borderBottomLeftRadius: 10,
            // borderBottomRightRadius: 10,
          }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{
                  fontSize: windowWidth / 30,
                  color: colors.white,
                  fontFamily: fonts.secondary[400],
                }}>
                Selamat datang,
              </Text>
              <Text
                style={{
                  fontSize: windowWidth / 30,
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                }}>
                {user.nama_lengkap}
              </Text>

            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 40, resizeMode: 'contain' }}
            />
          </View>
        </View>
        <MyCarouser />


        <View style={{
          flex: 1,
          padding: 10,
        }}>
          <Text
            style={{
              fontSize: windowWidth / 25,
              color: colors.primary,
              fontFamily: fonts.secondary[400],
            }}>
            Mau kursus mobil apa hari ini ?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('MenuKelas', {
            transmisi: 'MANUAL'
          })} style={{
            marginVertical: 10,
            elevation: 1,
            flexDirection: 'row',
            backgroundColor: colors.secondary
          }}>
            <View onPress={() => navigation.navigate('MenuKelas', {
              transmisi: 'MANUAL'
            })} style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/manual.png')} style={{
                height: windowHeight / 5,
                width: windowHeight / 5,
              }} />
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 12,
                color: colors.primary,
              }}>MANUAL</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MenuKelas', {
            transmisi: 'MATIC'
          })} style={{
            marginVertical: 10,
            elevation: 1,
            flexDirection: 'row',
            backgroundColor: colors.primary
          }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/matic.png')} style={{
                height: windowHeight / 5,
                width: windowHeight / 5,
              }} />
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 12,
                color: colors.secondary,
              }}>MATIC</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
