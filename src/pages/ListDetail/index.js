import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { urlAPI } from '../../utils/localStorage';
import { MyButton, MyGap } from '../../components';

export default function ListDetail({ navigation, route }) {
  const [item, setItem] = useState(route.params);
  navigation.setOptions({ title: 'Detail Pesanan' });
  const [data, setData] = useState(route.params);
  const [buka, setBuka] = useState(true);
  const [dataDetail, setDataDetail] = useState([]);

  useEffect(() => {
    DataDetail();

  }, []);
  let nama_icon = '';

  if (data.status == "DONE") {
    nama_icon = 'checkmark-circle-outline';
  } else {
    nama_icon = 'close-circle-outline';
  }


  const DataDetail = () => {
    axios
      .post(urlAPI + '/transaksi_detail.php', {
        kode: item.kode,
      })
      .then(res => {
        console.warn('detail transaksi', res.data);
        setDataDetail(res.data);
        setBuka(true);
      });
  }



  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.border
      }}>

      {!buka && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>}
      {buka &&
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10, flex: 1 }}>
          <View style={{
            backgroundColor: colors.white,
            marginVertical: 5,
          }}>

            <View style={{
              flexDirection: 'row'
            }}>
              <Text
                style={{
                  flex: 1,
                  backgroundColor: item.status == "DRAF" ? colors.danger : colors.success,
                  fontFamily: fonts.secondary[600],
                  padding: 10,
                  fontSize: windowWidth / 30,
                  color: colors.white,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border
                }}>
                {item.status}
              </Text>

              {/* {item.status == 'MENUNGGU PEMBAYARAN' && (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Bayar', {
                    kode: item.kode,
                    total_bayar: item.total_bayar
                  })
                }} style={{
                  padding: 10,
                  backgroundColor: colors.secondary,
                  flexDirection: 'row'
                }}>
                  <Icon type='ionicon' name='checkmark-circle' size={windowWidth / 30} color={colors.primary} />
                  <Text style={{
                    left: 5,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.primary,
                  }}>Bayar Sekarang</Text>
                </TouchableOpacity>

              )} */}
            </View>

            <Text
              style={{
                fontFamily: fonts.secondary[400],
                padding: 10,
                fontSize: windowWidth / 30,
                color: colors.black,

              }}>
              {item.kode}
            </Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: fonts.secondary[400],
                  padding: 10,
                  fontSize: windowWidth / 30,
                  color: colors.black,

                }}>
                Tanggal Pembelian
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  padding: 10,
                  fontSize: windowWidth / 30,
                  color: colors.black,

                }}>
                {item.tanggal}, {item.jam} WIB
              </Text>
            </View>
          </View>

          <View style={{
            backgroundColor: colors.white,
            marginVertical: 5,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.primary,
              margin: 10,

            }}>Informasi Kursus</Text>


            <View style={{
              flexDirection: 'row',
              padding: 10,
            }}>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 30,
                  color: colors.black,

                }}>Transmisi</Text>
              </View>
              <View style={{
                flex: 1.5,
                justifyContent: 'flex-start',
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 30,
                  color: colors.black,

                }}>
                  {item.transmisi}
                </Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              padding: 10,
            }}>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 30,
                  color: colors.black,

                }}>kelas</Text>
              </View>
              <View style={{
                flex: 1.5,
                justifyContent: 'flex-start',
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 30,
                  color: colors.black,
                  textAlign: 'left'
                }}>
                  {item.kelas}
                </Text>
              </View>
            </View>


            <View style={{
              flexDirection: 'row',
              padding: 10,
            }}>
              <View style={{
                flex: 0.5,
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 30,
                  color: colors.black,

                }}>Paket</Text>
              </View>
              <View style={{
                flex: 1.5,
                justifyContent: 'flex-start',
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 30,
                  color: colors.black,
                  textAlign: 'left'
                }}>
                  {item.paket}
                </Text>

              </View>
            </View>




          </View>

          <View style={{
            backgroundColor: colors.white,
            marginVertical: 5,
          }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                padding: 10,
                fontSize: windowWidth / 30,
                color: colors.primary,
              }}>
              Jadwal Pertemuan
            </Text>

            {dataDetail.map(i => {
              return (
                <View style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}>


                  <View style={{
                    flex: 1,
                    justifyContent: 'center'
                  }}>
                    <Text style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 35,
                      color: colors.black,
                    }}>Pertemuan ke-{i.no}</Text>

                  </View>
                  <View style={{
                    flex: 1,
                    justifyContent: 'center'
                  }}>
                    <Text style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 35,
                      color: colors.black,
                    }}>{i.tanggal}</Text>

                  </View>

                  <View style={{
                    // flex: 1,
                    justifyContent: 'center'
                  }}>
                    <Text style={{
                      padding: 2,
                      width: 80,
                      textAlign: 'center',
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.white,
                      backgroundColor: colors.primary

                    }}> {i.jam}</Text>
                  </View>
                </View>
              )
            })}
          </View>




          <MyGap jarak={10} />

          {item.status == 'SUDAH DIKIRIM' && (<MyButton onPress={() => {
            axios.post(urlAPI + '/1transaksi_selesai.php', {
              kode: item.kode
            }).then(res => {
              console.log(res);
              setItem({
                ...item,
                status: 'SELESAI'
              })

            })
          }} title='Pesanan Selesai' warna={colors.secondary} colorText={colors.primary} Icons="checkmark-circle" iconColor={colors.primary} />)}

        </ScrollView>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
