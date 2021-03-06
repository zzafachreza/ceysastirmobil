
import React, { useState, Fragment, useCallback, useEffect, useMemo, useRef } from 'react';
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
import moment from 'moment';

export default function MenuJadwal({ navigation, route }) {

    var __jam = route.params.jam_pertemuan;

    const [pilihhari, setpilihhari] = useState({
        1: true,
        2: false,
        3: false,
    });

    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {

        setKirim({
            ...kirim,
            jam_pertemuan: __jam
        });

        setLoading(true);
        setTimeout(() => {
            console.log(kirim)
            // navigation.navigate('Success', {
            //     messege: 'Booking Jadwal Kamu sedang di proses',
            //     tipe: 'BOOKING'
            // })
            setLoading(false)
        }, 1200)


        // setLoading(true);
        // setTimeout(() => {
        //     navigation.navigate('Success', {
        //         messege: 'Booking Jadwal Kamu sedang di proses',
        //         tipe: 'BOOKING'
        //     })
        //     setLoading(false)
        // }, 1200)
    }



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

    const getDaysInMonth = (month, year, days) => {
        let pivot = moment().month(month).year(year).startOf('month')
        const end = moment().month(month).year(year).endOf('year');


        let dates = {}
        const disabled = { disabled: true }
        while (pivot.isBefore(end)) {
            days.forEach((day) => {
                dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
            })
            pivot.add(7, 'days')
        }

        return dates
    }


    // const DISABLED_DAYS = ['Saturday', 'Sunday', 'Tuesday ', 'Thursday', 'Friday']

    const [markedDates, setMarkedDates] = useState(getDaysInMonth(moment().month(), moment().year(), kirim.tutup))


    const INITIAL_DATE = moment().format('YYYY-MM-DD');


    const jam = [
        {
            label: '08:00 - 09.30',
            value: '08:00 - 09.30'
        },
        {
            label: '09:30 - 11.00',
            value: '09:30 - 11.00',
        },
        {
            label: '11:00 - 12.30',
            value: '11:00 - 12.30',
        },
        {
            label: '13:30 - 15.00',
            value: '13:30 - 15.00',
        },
        {
            label: '15:00 - 16.30',
            value: '15:00 - 16.30',
        },
        {
            label: '16:30 - 18.00',
            value: '16:30 - 18.00',
        },


    ]


    const __ubahjam = (x, i) => {
        // console.log('jam', x)
        __jam[i] = x
        console.warn('jam isi', __jam)

        // setJam(arr);


    }

    const MyJadwal = ({ nilai }) => {
        var myBintang = [];

        for (let i = 0; i < nilai; i++) {
            var ZVL_NOMOR = i;
            myBintang.push(
                <View key={i} style={{
                    marginBottom: 10,
                }}>
                    <Text style={{
                        padding: 10,
                        fontFamily: fonts.secondary[600],
                        backgroundColor: colors.secondary,
                        color: colors.primary
                    }}>Pertemuan Ke {i + 1}</Text>
                    {/* <Calendar
                        enableSwipeMonths
                        current={INITIAL_DATE}
                        style={{
                            margin: 10,
                        }}
                        onDayPress={


                            d => {
                                console.log(d.dateString);

                                // setKirim({
                                //     ...kirim,
                                //     pertemuan: [...kirim.pertemuan, d.dateString]
                                // })

                                const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }
                                // console.warn(zvl)
                                setMarkedDates(zvl)
                            }
                        }
                        markedDates={markedDates}
                    /> */}
                    <MyPicker onValueChange={(x) => {
                        // console.log(x);
                        var z = x;

                        __ubahjam(z, i)

                    }} label="Waktu belajar" data={[
                        {
                            label: 'silahkan pilih jam',
                            value: '08.00 - 09.30'
                        },
                        {
                            label: '08.00 - 09.30',
                            value: '08.00 - 09.30',
                        },
                        {
                            label: '09.30 - 11.00',
                            value: '09.30 - 11.00',
                        },
                        {
                            label: '11.00 - 12.30',
                            value: '11.00 - 12.30',
                        },
                        {
                            label: '13.30 - 15.00',
                            value: '13.30 - 15.00',
                        },
                        {
                            label: '15.00 - 16.30',
                            value: '15.00 - 16.30',
                        },
                        {
                            label: '16.30 - 18.00',
                            value: '16.30 - 18.00',
                        },


                    ]} />
                </View>,
            );
        }

        return <>{myBintang}</>;
    };

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
                                hari: 'Senin & Rabu',
                                tutup: ['Saturday', 'Sunday', 'Tuesday ', 'Thursday', 'Friday']
                            });

                            setMarkedDates(getDaysInMonth(moment().month(), moment().year(), ['Saturday', 'Sunday', 'Tuesday ', 'Thursday', 'Friday']))


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
                                hari: 'Selasa & Kamis',
                                tutup: ['Saturday', 'Sunday', 'Monday', 'Wednesday', 'Friday']
                            })

                            setMarkedDates(getDaysInMonth(moment().month(), moment().year(), ['Saturday', 'Sunday', 'Monday', 'Wednesday', 'Friday']))
                            console.warn(markedDates)
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
                                hari: 'Sabtu & Minggu',
                                tutup: ['Tuesday', 'Thursday', 'Monday', 'Wednesday', 'Friday']
                            })

                            setMarkedDates(getDaysInMonth(moment().month(), moment().year(), ['Tuesday', 'Thursday', 'Monday', 'Wednesday', 'Friday']))

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

                {/* jumlah pilihan */}



                <ScrollView>
                    {/* <MyJadwal nilai={kirim.jumlah} /> */}
                    <MyJadwal nilai={2} />
                </ScrollView>






            </View>



            {!loading && <MyButton onPress={sendServer} Icons="calendar-outline" radius={0} title="Booking Jadwal Sekarang" warna={colors.primary} />}
            {loading && <ActivityIndicator size="large" color={colors.primary} />}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})