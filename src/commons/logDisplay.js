import React, {Component} from 'react';
import {Platform, 
	StyleSheet,
	Text, 
	View, 
	AsyncStorage, 
	NetInfo, 
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Alert} 
	from 'react-native';
import { 
	Container,
	Icon} 
	from 'native-base';


/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';


export default class LogDisplay extends Component{


	render() {
    	return (
    		<React.Fragment>
    			<Text	style={{
    						position:'absolute',
    						top: 0,
    						height: '6%',
    						width: '100%',
    						backgroundColor: '#000',
    						color:'#fff',
    						fontWeight:'bold',
    						fontSize: 13,
    						textAlign: 'center',
                            textAlignVertical: 'center'
    			}}>
    				{this.props.doGetMessage}
    			</Text>
    		</React.Fragment>
		);  
  	}
}