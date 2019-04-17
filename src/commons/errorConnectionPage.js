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

export default class errorConnectionPage extends Component{

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
		    		height:'100%'
		    	}}>
		    		<View style={{
		    				height: '26%',
		    				width: '100%',
		    				top:'23%'
		    		}}>
		    			<Text style={{
		    					height:'50%',
		    					width: '25%',
		    					position: 'relative',
		    					left: '38%',
		    					paddingLeft:'5%'
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
		    					left: '25%',
		    					fontSize: 40,
		    					fontWeight:'bold',
		    					color:'#454647',
		    					paddingLeft:'5%'
		    			}}>
		    				Res-Sys
		    			</Text>
		    		</View>
	    			<Text 	style={{
	    						width:'70%',
	    						left: '15%',
	    						position: 'relative',
	    						height: '10%',
	    						fontSize: 16,
	    						color: '#454647',
	    						textAlign: 'center',
	    						top: '35%'
	    			}}>	
	    				ERROR CONNECTING TO SERVER
	    			</Text>

	    			<TouchableWithoutFeedback
	    				onPress={()=>this.props.doSetTemplateDisplay(Constants.PAGES.WELCOME_PAGE)}>
		    			<Text 	style={{
		    						width:'25%',
		    						left: '37.5%',
		    						position: 'relative',
		    						height: '7.7%',
		    						fontSize: 16,
		    						color: '#454647',
		    						textAlign: 'center',
		    						top: '35%',
		    						paddingTop:'3%',
		    						borderWidth:2,
		    						color:'#454647',
				    				fontWeight: 'bold'
		    			}}>	
		    				RETURN
		    			</Text>
		    		</TouchableWithoutFeedback>
		    	</View>
		    </React.Fragment>
	    );  
  	}
}
