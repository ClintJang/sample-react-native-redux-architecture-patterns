import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Main from '../Main';


export default class Root extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor:'grey'}}>
                <Text style={{ marginLeft:20, marginTop:100, fontSize:24 }}>React Native Redux Sample</Text>
                <Main />
            </View>
            
        );
    }
}