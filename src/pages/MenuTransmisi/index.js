import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';

export default function MenuTransmisi() {
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                flex: 0.8,
                padding: 10,
            }}>
                <Text>Lokasi dipilih</Text>
            </View>
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
    )
}

const styles = StyleSheet.create({})