import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useIsFocused } from '@react-navigation/native';

export default function MenuKelas({ navigation, route }) {

    // const [kirim, setKirim] = useState({});
    // useState(() => {
    //     setKirim({
    //         ...kirim,
    //         transmisi: route.params.transmisi
    //     })
    // }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                height: windowWidth / 7,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primary
            }}>
                <Text style={{
                    color: colors.white,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 12
                }}>{route.params.transmisi}</Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'column',
                padding: 10,
            }}>

                {route.params.transmisi == "MANUAL" && <TouchableOpacity onPress={() => navigation.navigate('MenuPaket', {
                    transmisi: route.params.transmisi,
                    kelas: 'REGULAR'
                })} style={{
                    flex: 1,
                    marginVertical: 10,
                    elevation: 1,
                    backgroundColor: colors.primary
                }}>

                    <Image source={require('../../assets/regular.png')} style={{
                        height: windowHeight / 4,
                        width: '100%',
                    }} />

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 12,
                            color: colors.secondary,
                        }}>Kelas Regular </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 20,
                            color: colors.white,
                        }}>(durasi 1½jam)</Text>
                    </View>
                </TouchableOpacity>}


                <TouchableOpacity onPress={() => navigation.navigate('MenuPaket', {
                    transmisi: route.params.transmisi,
                    kelas: 'VIP'
                })} style={{
                    flex: route.params.transmisi == "MANUAL" ? 1 : 0.5,
                    marginVertical: 10,
                    elevation: 1,
                    backgroundColor: colors.primary
                }}>

                    <Image source={require('../../assets/vip.png')} style={{
                        height: windowHeight / 4,
                        width: '100%',
                    }} />

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 12,
                            color: colors.secondary,
                        }}>Kelas VIP </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 20,
                            color: colors.white,
                        }}>(durasi 1½jam)</Text>
                    </View>
                </TouchableOpacity>


            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})