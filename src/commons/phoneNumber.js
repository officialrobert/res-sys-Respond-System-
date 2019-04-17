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


export default class PhoneNumber extends Component{
	
	state = {
		newPhoneNumber    : ''
	}

	submitNewPhoneNumber = ()=>{
		this.props.doSubmitPhoneNumberUpdate(this.state.newPhoneNumber);
		setTimeout(()=>{
			this.props.doSetHomePage(Constants.COMMON_PAGE.MORE_PAGE)
		},Constants.CONSOLE_TIME_DISPLAY);
	}

	render() {
	    return (
	    	<View style={{
	    			height: '100%',
	    			width: '100%',
	    			alignItems: 'center'
	    	}}>
	    		<View style={{
	    			height: '9%',
	    			width: '100%',
	    			position: 'relative',
	    			backgroundColor: '#88ef92',
	    			top: '0%',
	    			flexDirection: 'row'
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.props.doSetHomePage(Constants.COMMON_PAGE.MORE_PAGE)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '10%',
		    					fontSize: 15,
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					position: 'relative',
		    					textAlignVertical: 'center',
		    					left: '10%'
		    			}}>	
		    				<Icon
		    					style={{
		    						fontSize:35,
		    						color: '#454647'
		    					}}
		    					name='ios-arrow-back'
		    					type='Ionicons'/>
		    			</Text>
		    		</TouchableWithoutFeedback>
		    		<Text style={{
	    					width: '55%',
	    					height: '100%',
	    					fontSize: 16,
	    					textAlign: 'center',
	    					textAlignVertical: 'center',
	    					left: '100%'
	    			}}>
	    				PHONE NUMBER
	    			</Text>
	    		</View>


	    		<Text style={{
	    				position: 'relative',
	    				height: '4%',
	    				width: '45%',
	    				top: '5%',
	    				textAlign: 'center',
	    				textAlignVertical: 'center',
	    				fontSize: 13,
	    				fontWeight: 'bold'
	    		}}>
	    			Current Phone Number
	    		</Text>

	    		<Text style={{
	    				position: 'relative',
	    				height: '9%',
	    				width: '45%',
	    				top: '5.1%',
	    				textAlign: 'center',
	    				textAlignVertical: 'center',
	    				fontSize: 15,
	    				fontWeight: 'bold'
	    		}}>
	    			<Icon
	    				style={{fontSize:30
	    				}}
	    				name='cellphone-basic'
	    				type='MaterialCommunityIcons'/>{' '}
	    			{this.props.doGetLoggedAccount.phoneNumber}
	    		</Text>

	    		<Text style={{
	    				position: 'relative',
	    				height: '4%',
	    				width: '45%',
	    				top: '10%',
	    				textAlign: 'center',
	    				textAlignVertical: 'center',
	    				fontSize: 13,
	    				fontWeight: 'bold'
	    		}}>
	    			Change Phone Number
	    		</Text>

	    		<TextInput
	    			placeholder='INPUT NEW PHONE NUMBER'
	    			maxLength={Constants.SIGNUP_FORMS.PHONE_NUMBER_MAX_LENGTH}
	    			style={{
	    				height:'8%',
	    				width: '55%',
	    				borderBottomWidth:1,
	    				top:'10.5%',
	    				position: 'relative',
	    				fontSize:14
	    			}}
	    			onChangeText={(newPhoneNumber)=>this.setState({newPhoneNumber:newPhoneNumber})}/>

    			<TouchableWithoutFeedback
    				onPress={()=>this.submitNewPhoneNumber()}>
		    		<Text style={{
		    				height: '8%',
		    				textAlign: 'center',
		    				width: '30%',
		    				position: 'relative',
		    				top: '25%',
		    				textAlignVertical: 'center',
		    				borderWidth:2,
		    				borderColor : '#454647',
		    				color: '#000'
		    		}}>
		    			SUBMIT
		    		</Text>
		    	</TouchableWithoutFeedback>
	    		
	    	</View>
    	);
	}
}
