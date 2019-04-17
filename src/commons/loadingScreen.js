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
import { Container, 
	Icon,
	Spinner} 
	from 'native-base';


/* -- Custom Components  -- */
import Constants from './Constants.js';

export default class LoadingScreen extends Component{

	render() {
	    return (
	    	<React.Fragment>
		    	<Image source={require('../img/background.png')}
		    		style={{height: '100%',
		    				width:'100%',
		    				resizeMode:'stretch',
		    				position:'absolute',
		    				}}/>
		    	<View style={{
		    		width:'100%',
		    		height:'100%',
		    		alignItems: 'center'
		    	}}>
		    		<View style={{
		    				height: '26%',
		    				width: '100%',
		    				top:'23%',
		    				alignItems: 'center'
		    		}}>
		    			<Text style={{
		    					height:'50%',
		    					width: '25%',
		    					position: 'relative',
		    					textAlignVertical: 'center',
		    					textAlign: 'center'
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize:60,
		    						color: '#454647'
		    					}}
		    					name='fire'
		    					type='FontAwesome'/>
		    			</Text>
		    			<Text style={{
		    					height:'45%',
		    					width: '50%',
		    					position: 'relative',
		    					fontSize: 40,
		    					fontWeight:'bold',
		    					color:'#454647',
		    					textAlign: 'center',
		    					textAlignVertical: 'center'
		    			}}>
		    				Res-Sys
		    			</Text>
		    		</View>


	    			<Spinner 	style={{
	    							fontSize: 15,
	    							position: 'relative',
	    							top:'30%',
	    							height: '8%'
    							}}
	    						color='#454647'/>

	    			<Text 	style={{
	    						width:'70%',
	    						position: 'relative',
	    						height: '10%',
	    						fontSize: 16,
	    						color: '#454647',
	    						textAlign: 'center',
	    						textAlignVertical: 'center',
	    						top: '35%'
	    			}}>	
	    				{this.props.loadingMessage}
	    			</Text>
		    	</View>
		    </React.Fragment>
	    );  
  	}
}
