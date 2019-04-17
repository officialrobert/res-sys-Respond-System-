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

export default class ChangePassword extends Component{
	
	state = {
		currentPassword    : '',
		newPassword        : '',
		confirmNewPassword : ''
	}

	submitOperation = ()=>{
		this.props.doSubmitChangePassword(this.state.currentPassword,
			this.state.newPassword,
			this.state.confirmNewPassword);
		setTimeout(()=>{
			this.setState({
				currentPassword    : '',
				newPassword        : '',
				confirmNewPassword : ''
			});
		},500);
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
	    				CHANGE PASSWORD
	    			</Text>
	    		</View>

	    		<Text style={{
	    				height: '5%',
	    				fontSize:13,
	    				fontWeight:'bold',
	    				top: '5%',
	    				position: 'relative',
	    				width: '40%',
	    				textAlignVertical: 'center'
	    		}}>
	    			Current Password
	    		</Text>
	    		<TextInput
	    			style={{
	    				height: '8%',
	    				width: '40%',
	    				position: 'relative',
	    				fontSize: 12,
	    				borderColor : '#454647',
	    				borderBottomWidth:0.8,
	    				top: '5.1%'
	    			}}
	    			secureTextEntry={true}
	    			value          = {this.state.currentPassword}
	    			onChangeText   ={(currentPassword)=>this.setState({currentPassword:currentPassword})}/>
	    		<Text style={{
	    				height: '5%',
	    				fontSize:13,
	    				fontWeight:'bold',
	    				top: '5.5%',
	    				position: 'relative',
	    				width: '40%',
	    				textAlignVertical: 'center'
	    		}}>
	    			New Password
	    		</Text>

	    		<TextInput
	    			style={{
	    				height: '8%',
	    				width: '40%',
	    				position: 'relative',
	    				fontSize: 12,
	    				borderColor : '#454647',
	    				borderBottomWidth:0.8,
	    				top: '5.6%'
	    			}}
	    			secureTextEntry = {true}
	    			value           = {this.state.newPassword}
	    			onChangeText    = {(newPassword)=>this.setState({newPassword:newPassword})} />

	    		<Text style={{
	    				height: '5%',
	    				fontSize:13,
	    				fontWeight:'bold',
	    				top: '6%',
	    				position: 'relative',
	    				width: '40%',
	    				textAlignVertical: 'center'
	    		}}>
	    			Confirm New Password
	    		</Text>

	    		<TextInput
	    			style={{
	    				height: '8%',
	    				width: '40%',
	    				position: 'relative',
	    				fontSize: 12,
	    				borderBottomWidth:0.8,
	    				borderColor : '#454647',
	    				top: '6.1%'
	    			}}
	    			secureTextEntry = {true}
	    			value           = {this.state.confirmNewPassword}
	    			onChangeText    = {(confirmNewPassword)=>this.setState({confirmNewPassword:confirmNewPassword})} />

	    		<TouchableWithoutFeedback
	    			onPress={()=>this.submitOperation()}>
		    		<Text style={{
		    				height: '8%',
		    				textAlign: 'center',
		    				width: '30%',
		    				position: 'relative',
		    				top: '20%',
		    				textAlignVertical: 'center',
		    				borderWidth:2,
		    				borderColor : '#454647'
		    		}}>
		    			CONFIRM
		    		</Text>
		    	</TouchableWithoutFeedback>

	    	</View>
    	);
	}
}