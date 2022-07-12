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
import { Icon } from 'react-native-elements';

export default function MenuPaket({ navigation, route }) {

    // const [kirim, setKirim] = useState({});
    // useState(() => {
    //     setKirim({
    //         ...kirim,
    //         transmisi: route.params.transmisi
    //     })
    // }, []);

    const data = [

        {
            name: 'Paket Bisa Mahir 4x'
        },
        {
            name: 'Paket Bisa Mahir 4x + SIM'
        },
        {
            name: 'Paket Bisa Mahir 6x'
        },
        {
            name: 'Paket Bisa Mahir 6x + SIM'
        },
        {
            name: 'Paket Bisa Mahir 8x'
        },
        {
            name: 'Paket Bisa Mahir 8x + SIM'
        },

    ];


    const data2 = [


        {
            name: 'Paket Bisa Mahir 6x'
        },
        {
            name: 'Paket Bisa Mahir 6x + SIM'
        },
        {
            name: 'Paket Bisa Mahir 8x'
        },
        {
            name: 'Paket Bisa Mahir 8x + SIM'
        },

    ];

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                height: windowWidth / 5,
                justifyContent: 'center',
                padding: 10,
                backgroundColor: colors.primary
            }}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border
                }}>
                    <Text style={{
                        flex: 0.4,
                        color: colors.white,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25
                    }}>TRANSMISI</Text>
                    <Text style={{
                        color: colors.white,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25
                    }}>{route.params.transmisi}</Text>
                </View>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 0.4,
                        color: colors.white,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25
                    }}>KELAS</Text>
                    <Text style={{
                        color: colors.white,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25
                    }}>{route.params.kelas}</Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                backgroundColor: colors.secondary,
                justifyContent: 'space-around',
                flexDirection: 'column',
                padding: 10,
            }}>

                {
                    route.params.kelas == 'REGULAR' && data.map(item => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('MenuJadwal', {
                                transmisi: route.params.transmisi,
                                kelas: route.params.kelas,
                                paket: item.name,
                                hari: 'Senin & Kamis'
                            })} style={{
                                flex: 1,
                                marginVertical: 10,
                                elevation: 1,
                                backgroundColor: colors.white,
                                borderBottomWidth: 5,
                                borderBottomColor: colors.primary
                            }}>

                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{

                                            fontFamily: fonts.secondary[400],
                                            fontSize: windowWidth / 20,
                                            color: colors.primary,
                                        }}>{item.name}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                    }}>
                                        <Icon type='ionicon' name='chevron-forward-outline' color={colors.black} size={windowWidth / 15} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }

                {
                    route.params.kelas == 'VIP' && data2.map(item => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('MenuJadwal', {
                                transmisi: route.params.transmisi,
                                kelas: route.params.kelas,
                                paket: item.name
                            })} style={{
                                flex: 1,
                                marginVertical: 10,
                                elevation: 1,
                                backgroundColor: colors.white,
                                borderBottomWidth: 5,
                                borderBottomColor: colors.primary
                            }}>

                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{

                                            fontFamily: fonts.secondary[400],
                                            fontSize: windowWidth / 20,
                                            color: colors.primary,
                                        }}>{item.name}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                    }}>
                                        <Icon type='ionicon' name='chevron-forward-outline' color={colors.black} size={windowWidth / 15} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }




            </View>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})