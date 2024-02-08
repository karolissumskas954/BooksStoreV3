import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const { expo } = require('../../app.json');

const { width, height } = Dimensions.get('window');

export default class Nav extends Component {
    
    render() {
        return (
            <View style={[styles.container, {display: this.props.display}]}>
                <Animatable.View useNativeDriver ref={ref =>(this.props.obj.fade = ref)} style={[styles.overlay, {display: this.props.display}]}>
                    <Animatable.View useNativeDriver ref={ref =>(this.props.obj.slide = ref)} style={styles.menuContainer}>
                        <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                            <View style={ styles.logo }>
                                <Text style={{ fontSize: 46 }}>e</Text>
                            </View>
                            <View style={styles.list}>
                                {
                                    this.props.list.map((item, k) => {
                                        return(
                                            <Animatable.View key={k} useNativeDriver ref={ref => (this.props.obj.itemAnimation[k] = ref)} style={styles.listItem}>
                                                <TouchableOpacity onPress={() => alert(item + " " +(k+1))} style={{ flexDirection: 'row', justifyContent:'center' }}>
                                                    <AntDesign name={'windows'} style={styles.icon} size={20}/>
                                                    <Text>{item} {k+ 1}</Text>
                                                </TouchableOpacity>
                                             </Animatable.View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                        <LinearGradient
                            colors={['transparent', '#ffffff90']}
                            style={styles.footer}>
                            <Text style={{ color:'gray' }}>{expo.version}</Text>
                        </LinearGradient>
    
                    </Animatable.View>
                    <TouchableWithoutFeedback onPress={() => this.props.closeMenu()}>
                        <View style={{ flex: 1}}></View>
                    </TouchableWithoutFeedback>
                </Animatable.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        position: 'absolute',
        width, height
    },
    overlay:{
        flex: 1,
        backgroundColor: '#00000090',
        flexDirection: 'row'
    },
    menuContainer: {
        width: width - 100,
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    logo: {
        height: height/4 + 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        alignItems: 'center'
    },
    listItem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 13
    },
    footer:{
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon:{
        color: 'gray',
        marginRight: 20
    }
})