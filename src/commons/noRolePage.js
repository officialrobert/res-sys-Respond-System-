import React, {Component} from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage, 
	Image,
	TextInput,
	TouchableWithoutFeedback} 
	from 'react-native';
import {Icon}    from 'native-base';
import Constants from './Constants.js';

export default class NoRolePage extends Component{

	render() {
	    return (
	    	<View style={{
	    			height: '100%',
	    			width: '100%'
	    	}}>
	    		<Text style={{
	    				width: '100%',
	    				height: '10%',
	    				fontSize: 16,
	    				fontWeight: 'bold',
	    				textAlign: 'center',
	    				top: '40%'
	    		}}>
	    			Application Error: No Account Detected
	    		</Text>
		 	</View>
	    );
	}
}