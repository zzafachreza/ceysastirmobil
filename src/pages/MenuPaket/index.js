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
import moment from 'moment';
import LottieView from 'lottie-react-native';

export default function MenuPaket({ navigation, route }) {
    const [booking, setBooking] = useState([]);


    // const [kirim, setKirim] = useState({});
    const [loading, setLoading] = useState(false)
    // useState(() => {
    //     setKirim({
    //         ...kirim,
    //         transmisi: route.params.transmisi
    //     })
    // }, []);
    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(user => {
            setUser(user);
        });

        axios.post('https://ceysa.zavalabs.com/api/1_jadwal.php').then(res => {
            setBooking(res.data);
            console.log(res.data);
        });

    }, [])

    const data = [

        {
            name: 'Paket Bisa Mahir 4x',
            jumlah: 4,
        },
        {
            name: 'Paket Bisa Mahir 4x + SIM',
            jumlah: 4,
        },
        {
            name: 'Paket Bisa Mahir 6x',
            jumlah: 6,
        },
        {
            name: 'Paket Bisa Mahir 6x + SIM',
            jumlah: 6,
        },
        {
            name: 'Paket Bisa Mahir 8x',
            jumlah: 8,
        },
        {
            name: 'Paket Bisa Mahir 8x + SIM',
            jumlah: 8,
        },

    ];


    const data2 = [


        {
            name: 'Paket Bisa Mahir 6x',
            jumlah: 6,
        },
        {
            name: 'Paket Bisa Mahir 6x + SIM',
            jumlah: 6,
        },
        {
            name: 'Paket Bisa Mahir 8x',
            jumlah: 8,
        },
        {
            name: 'Paket Bisa Mahir 8x + SIM',
            jumlah: 8,
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
                            <TouchableOpacity onPress={() => {


                                setLoading(true);

                                var __jam = [];
                                var __tanggal = [];

                                for (let z = 0; z < item.jumlah; z++) {
                                    __jam.push('00.00 - 00.00');
                                    __tanggal.push(moment().format('YYYY-MM-DD'));
                                }

                                var arr = {
                                    fid_user: user.id,
                                    lokasi: 'Curug',
                                    booking: booking,
                                    transmisi: route.params.transmisi,
                                    kelas: route.params.kelas,
                                    paket: item.name,
                                    jumlah: item.jumlah,
                                    tanggal_pertemuan: __tanggal,
                                    jam_pertemuan: __jam,
                                    hari: 'Senin & Rabu',
                                    tutup: ['Saturday', 'Sunday', 'Tuesday ', 'Thursday', 'Friday']
                                };



                                console.warn(arr);


                                setTimeout(() => {


                                    if (item.jumlah == 4) {
                                        navigation.navigate('MenuJadwal4', arr)
                                        setLoading(false);
                                    } else if (item.jumlah == 6) {
                                        navigation.navigate('MenuJadwal6', arr)
                                        setLoading(false);
                                    } else if (item.jumlah == 8) {
                                        navigation.navigate('MenuJadwal8', arr)
                                        setLoading(false);
                                    }
                                }, 1200)


                            }}

                                style={{
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
                            <TouchableOpacity onPress={() => {


                                var __jam = [];
                                var __tanggal = [];

                                for (let z = 0; z < item.jumlah; z++) {
                                    __jam.push('00.00 - 00.00');
                                    __tanggal.push(moment().format('YYYY-MM-DD'));
                                }

                                var arr = {
                                    fid_user: user.id,
                                    lokasi: 'Curug',
                                    booking: booking,
                                    transmisi: route.params.transmisi,
                                    kelas: route.params.kelas,
                                    paket: item.name,
                                    jumlah: item.jumlah,
                                    tanggal_pertemuan: __tanggal,
                                    jam_pertemuan: __jam,
                                    hari: 'Senin & Rabu',
                                    tutup: ['Saturday', 'Sunday', 'Tuesday ', 'Thursday', 'Friday']
                                };



                                console.warn(arr);

                                if (item.jumlah == 4) {
                                    navigation.navigate('MenuJadwal4', arr)
                                } else if (item.jumlah == 6) {
                                    navigation.navigate('MenuJadwal6', arr)
                                } else if (item.jumlah == 8) {
                                    navigation.navigate('MenuJadwal8', arr)
                                }

                            }} style={{
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

            {loading && (
                <LottieView
                    source={require('../../assets/animation.json')}
                    autoPlay
                    loop
                    style={{ backgroundColor: colors.primary }}
                />
            )}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})