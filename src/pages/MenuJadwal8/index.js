
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
import { Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';

export default function MenuJadwal8({ navigation, route }) {

    const [pilihMobil, setPilihMobil] = useState({
        1: true,
        2: false,
    });


    const booked = route.params.booking;
    const modalizeRef = useRef();
    const onOpen = () => {
        if (kirim.jam_pertemuan[0] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-1')
        } else if (kirim.jam_pertemuan[1] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-2')
        } else if (kirim.jam_pertemuan[2] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-3')
        } else if (kirim.jam_pertemuan[3] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-4')
        } else if (kirim.jam_pertemuan[4] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-5')
        } else if (kirim.jam_pertemuan[5] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-6')
        } else if (kirim.jam_pertemuan[6] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-7')
        } else if (kirim.jam_pertemuan[7] == '') {
            Alert.alert('Ceysa Stir Handal', 'Maaf kamu belum pilih jam pada pertemuan ke-8')
        } else {
            modalizeRef.current?.open();
        }
    };


    const [pilihLokasi, setPilihLokasi] = useState({
        1: true,
        2: false,
    });
    const [pilihhari, setpilihhari] = useState({
        1: true,
        2: false,
        3: false,
    });
    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        console.log(kirim)
        setLoading(true);
        setTimeout(() => {

            axios.post(urlAPI + '/1add_transaksi.php', kirim)
                .then(res => {
                    console.log(res.data);
                    setLoading(false);
                    navigation.navigate('Success', {
                        messege: 'Booking Jadwal Kamu sedang di proses',
                        tipe: 'BOOKING'
                    })
                })
        }, 1200)



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
        const end = moment().month(month + 3).year(year).endOf('month');


        let dates = {}
        const disabled = { disabled: true }
        while (pivot.isBefore(end)) {
            days.forEach((day) => {
                dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
            })
            pivot.add(7, 'days')
        }

        axios.post('https://ceysa.zavalabs.com/api/1booked.php', {
            transmisi: kirim.transmisi,
        }).then(res => {
            console.warn(res.data);
            res.data.map(i => {
                dates[i.tanggal] = { dotColor: 'red', disabled: true, marked: true }
            });
            setLoading0(false)
        })

        return dates
    }

    const [markedDates, setMarkedDates] = useState(getDaysInMonth(moment().month(), moment().year(), kirim.tutup))
    const INITIAL_DATE = moment().format('YYYY-MM-DD');
    const jam = [
        {
            label: '',
            value: ''
        },
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

                {/* Mobil */}
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                    }}>Pilihan Mobil untuk kursus : </Text>
                    <View style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilihMobil({
                                1: true,
                                2: false,
                            });
                            setKirim({
                                ...kirim,
                                mobil: 'Mobil 1'
                            });


                        }
                        } style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: pilihMobil[1] ? colors.primary : colors.border,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 0,

                        }}>
                            <View style={{
                                width: '20%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pilihMobil[1] ? colors.primary : colors.border,
                            }}>
                                {pilihMobil[1] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

                            </View>

                            <Text style={{
                                margin: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                            }}>Mobil 1</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            setPilihMobil({
                                1: false,
                                2: true,
                            });
                            setKirim({
                                ...kirim,
                                mobil: 'Mobil 2',
                            })


                        }

                        } style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: pilihMobil[2] ? colors.primary : colors.border,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 0,

                        }}>
                            <View style={{
                                width: '20%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pilihMobil[2] ? colors.primary : colors.border,
                            }}>
                                {pilihMobil[2] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

                            </View>

                            <Text style={{
                                margin: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                            }}>Mobil 2</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* lokasi */}
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                    }}>Pilihan lokasi untuk kursus : </Text>
                    <View style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilihLokasi({
                                1: true,
                                2: false,
                            });
                            setKirim({
                                ...kirim,
                                lokasi: 'curug'
                            });


                        }
                        } style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: pilihLokasi[1] ? colors.primary : colors.border,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 0,

                        }}>
                            <View style={{
                                width: '20%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pilihLokasi[1] ? colors.primary : colors.border,
                            }}>
                                {pilihLokasi[1] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

                            </View>

                            <Text style={{
                                margin: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                            }}>Curug</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            setPilihLokasi({
                                1: false,
                                2: true,
                            });
                            setKirim({
                                ...kirim,
                                lokasi: 'Serpong',
                            })


                        }



                        } style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: pilihLokasi[2] ? colors.primary : colors.border,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 0,

                        }}>
                            <View style={{
                                width: '20%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pilihLokasi[2] ? colors.primary : colors.border,
                            }}>
                                {pilihLokasi[2] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

                            </View>

                            <Text style={{
                                margin: 10,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                            }}>Serpong</Text>
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
                {/* reset date */}
                <TouchableOpacity onPress={() => {
                    Alert.alert('Ceysa Stir Handal', 'Apalah kamu akan atur ulang tanggal ?', [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "OK", onPress: () => {
                                setMarkedDates(getDaysInMonth(moment().month(), moment().year(), kirim.tutup));
                            }
                        }
                    ])
                }} style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                    backgroundColor: colors.black,
                    width: 130,
                    height: 30,
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Icon size={windowWidth / 25} type='ionicon' name='refresh' color={colors.white} />
                    <Text style={{
                        left: 5,
                        color: colors.white,
                        fontSize: windowWidth / 30
                    }}>Reset Tanggal</Text>
                </TouchableOpacity>
                {/* reset date */}


                <ScrollView>

                    {/* pertemuan 1 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 1 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[0] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[0],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[0] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>

                    {/* pertemuan 2 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 2 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[1] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[1],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[1] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>

                    {/* pertemuan 3 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 3 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[2] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[2],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[2] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>

                    {/* pertemuan 4 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 4 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[3] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[3],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[3] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>


                    {/* pertemuan 5 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 5 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[4] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[4],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[4] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>

                    {/* pertemuan 6 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 6 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[5] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[5],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[5] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>

                    {/* pertemuan 7 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 7 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[6] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[6],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[6] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>

                    {/* pertemuan 8 */}
                    <View style={{
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            padding: 10,
                            fontFamily: fonts.secondary[600],
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}>Pertemuan Ke 8 </Text>
                        <Calendar
                            enableSwipeMonths
                            current={INITIAL_DATE}
                            style={{
                                margin: 10,
                            }}
                            onDayPress={


                                d => {
                                    if (markedDates[d.dateString] == null) {
                                        var __tanggal = kirim.tanggal_pertemuan;
                                        __tanggal[7] = d.dateString
                                        setKirim({
                                            ...kirim,
                                            tanggal_pertemuan: __tanggal
                                        })
                                        const zvl = { ...markedDates, [d.dateString]: { selected: true, selectedColor: colors.primary } }


                                        setMarkedDates(zvl)
                                    } else {

                                        Alert.alert('Ceysa Stir Handal', 'Maaf pilihan hari tidak sesuai !')

                                    }
                                }
                            }
                            markedDates={markedDates}
                        />
                        <MyPicker onValueChange={(x) => {
                            var __jam = kirim.jam_pertemuan;
                            var __tanggal = kirim.tanggal_pertemuan;
                            axios.post(urlAPI + '/1_cek_jadwal.php', {
                                jam_pertemuan: x,
                                tanggal_pertemuan: __tanggal[7],
                                transmisi: kirim.transmisi
                            }).then(res => {
                                console.log(res.data);
                                if (res.data == 404) {
                                    Alert.alert('Ceysa Stir Handal', 'Maaf Jam yang anda pilih tidak tersedia, silahkan ganti jam lain !');
                                } else {

                                    __jam[7] = x
                                    setKirim({
                                        ...kirim,
                                        jam_pertemuan: __jam
                                    })

                                }
                            })
                        }} label="Waktu belajar" data={jam} />
                    </View>

                </ScrollView>






            </View>

            <Modalize
                withHandle={false}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                snapPoint={windowHeight / 1.3}
                HeaderComponent={
                    <View style={{ padding: 10, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.primary.normal,
                                        fontSize: windowWidth / 20,
                                        color: colors.black,
                                    }}>
                                    Konfirmasi Booking Kursus
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30,
                                        color: colors.black,
                                    }}>
                                    Tolong periksa kembali pesananmu sebelum checkout
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                                <Icon type="ionicon" name="close-outline" size={35} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                ref={modalizeRef} >
                <View style={{ flex: 1, padding: 10, }}>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Transmisi</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.transmisi}</Text>
                    </View>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Kelas</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.kelas}</Text>
                    </View>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Paket</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.paket}</Text>
                    </View>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-1</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[0]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[0]}</Text></Text>
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-2</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[1]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[1]}</Text></Text>
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-3</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[2]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[2]}</Text></Text>
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-4</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[3]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[3]}</Text></Text>
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-5</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[4]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[4]}</Text></Text>
                    </View>


                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-6</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[5]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[5]}</Text></Text>
                    </View>


                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-7</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[6]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[6]}</Text></Text>
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            flex: 0.6,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28
                        }}>Pertemuan ke-8</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{kirim.tanggal_pertemuan[7]} / <Text style={{
                            color: colors.primary,
                            left: 5,
                            paddingHorizontal: 5,
                        }}>{kirim.jam_pertemuan[7]}</Text></Text>
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 10,
                        }}>
                            <MyButton onPress={() => modalizeRef.current.close()} Icons="close-outline" title="Batal" radius={0} warna={colors.danger} />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 10,
                        }}>
                            {loading && <ActivityIndicator size="large" color={colors.primary} />}
                            {!loading && <MyButton onPress={sendServer} Icons="calendar-outline" radius={0} title="Booking Sekarang" warna={colors.primary} />}
                        </View>
                    </View>

                </View>
            </Modalize >

            {!loading && <MyButton onPress={onOpen} Icons="calendar-outline" radius={0} title="Booking Jadwal Sekarang" warna={colors.primary} />}
            {loading && <ActivityIndicator size="large" color={colors.primary} />}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})