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
    Picker,
    ActivityIndicator
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { MyButton, MyPicker } from '../../components';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker'


export default function MenuJadwal({ navigation, route }) {
    const [pilihhari, setpilihhari] = useState({
        1: true,
        2: false,
        3: false,
    });

    const [kirim, setKirim] = useState(route.params);
    useState(() => {
        setKirim({
            ...kirim,
            hari: 'Senin & Rabu'
        })
    }, []);

    LocaleConfig.locales['id'] = {
        monthNames: [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ],
        monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul.', 'Agu', 'Sept.', 'Oct.', 'Nov.', 'Des.'],
        dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        today: "Jumat"
    };
    LocaleConfig.defaultLocale = 'id';


    const jam = [
        {
            label: '08:00',
            value: '08:00'
        },
        {
            label: '09:00',
            value: '09:00'
        },
        {
            label: '10:00',
            value: '10:00'
        },
        {
            label: '11:00',
            value: '11:00'
        },
        {
            label: '12:00',
            value: '12:00'
        },
        {
            label: '13:00',
            value: '13:00'
        },
        {
            label: '14:00',
            value: '14:00'
        },
        {
            label: '15:00',
            value: '15:00'
        },
        {
            label: '16:00',
            value: '16:00'
        },
        {
            label: '17:00',
            value: '17:00'
        },

    ]
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        setLoading(true);
        setTimeout(() => {
            navigation.navigate('Success', {
                messege: 'Booking Jadwal Kamu sedang di proses',
                tipe: 'BOOKING'
            })
            setLoading(false)
        }, 1200)
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
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
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border
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

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 0.5,
                        color: colors.white,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25
                    }}>PAKET</Text>
                    <Text style={{
                        color: colors.white,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25
                    }}>{route.params.paket}</Text>
                </View>
            </View>

            <View style={{
                padding: 10,
                flex: 1,
            }}>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                    }}>Pilihan hari untuk kursus : </Text>
                    <View style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setpilihhari({
                                1: true,
                                2: false,
                                3: false
                            });
                            setKirim({
                                ...kirim,
                                hari: 'Senin & Rabu'
                            })
                        }
                        } style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: pilihhari[1] ? colors.primary : colors.border,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 0,

                        }}>
                            <View style={{
                                width: '20%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pilihhari[1] ? colors.primary : colors.border,
                            }}>
                                {pilihhari[1] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

                            </View>

                            <Text style={{
                                margin: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                            }}>Senin & Rabu</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            setpilihhari({
                                1: false,
                                2: true,
                                3: false
                            });
                            setKirim({
                                ...kirim,
                                hari: 'Selasa & Kamis'
                            })
                        }



                        } style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: pilihhari[2] ? colors.primary : colors.border,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 0,

                        }}>
                            <View style={{
                                width: '20%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pilihhari[2] ? colors.primary : colors.border,
                            }}>
                                {pilihhari[2] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

                            </View>

                            <Text style={{
                                margin: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                            }}>Selasa & Kamis</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setpilihhari({
                                1: false,
                                2: false,
                                3: true
                            });
                            setKirim({
                                ...kirim,
                                hari: 'Sabtu & Minggu'
                            })

                        }} style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: pilihhari[3] ? colors.primary : colors.border,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 0,

                        }}>
                            <View style={{
                                width: '20%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pilihhari[3] ? colors.primary : colors.border,
                            }}>
                                {pilihhari[3] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

                            </View>

                            <Text style={{
                                margin: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                            }}>Sabtu & Minggu</Text>
                        </TouchableOpacity>

                    </View>
                </View>


                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                        marginBottom: 5,
                    }}>Pilihan Tanggal mulai untuk hari {kirim.hari.split(" & ")[0]} : </Text>

                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <DatePicker
                                style={{ width: '100%', }}
                                date={kirim.awal1}
                                mode="date"
                                placeholder="Tanggal Mulai"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        color: colors.black,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        width: '100%',
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { setKirim({ ...kirim, awal1: date }) }}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <View style={{
                                borderWidth: 1,
                                fontFamily: fonts.secondary[400],
                                borderColor: colors.border,
                                padding: 0,
                                height: 40,
                                justifyContent: 'center',
                            }}>
                                <Picker selectedValue={kirim.awaljam1} onValueChange={x => setKirim({
                                    ...kirim,
                                    awaljam1: x
                                })}>
                                    {jam.map(item => {
                                        return <Picker.Item value={item.value} label={item.label} />;
                                    })}
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                        marginBottom: 5,
                    }}>Pilihan Tanggal mulai untuk hari {kirim.hari.split(" & ")[1]} : </Text>

                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <DatePicker
                                style={{ width: '100%', }}
                                date={kirim.awal2}
                                mode="date"
                                placeholder="Tanggal Mulai"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        color: colors.black,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        width: '100%',
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { setKirim({ ...kirim, awal2: date }) }}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <View style={{
                                borderWidth: 1,
                                fontFamily: fonts.secondary[400],
                                borderColor: colors.border,
                                padding: 0,
                                height: 40,
                                justifyContent: 'center',
                            }}>
                                <Picker selectedValue={kirim.awaljam2} onValueChange={x => setKirim({
                                    ...kirim,
                                    awaljam2: x
                                })}>
                                    {jam.map(item => {
                                        return <Picker.Item value={item.value} label={item.label} />;
                                    })}
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>


            </View>

            {!loading && <MyButton onPress={sendServer} Icons="calendar-outline" radius={0} title="Booking Jadwal Sekarang" warna={colors.primary} />}
            {loading && <ActivityIndicator size="large" color={colors.primary} />}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})