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
	Icon} 
	from 'native-base';


/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';



export default class LoginDashboard extends Component{

	state = {
		hidePassword  : true,
		loginUsername : '',
		loginPassword : ''
	}

	showPasswordText = ()=>{
		this.setState({hidePassword:!this.state.hidePassword});
	}

	submitLogin =()=>{
		if(this.state.loginPassword.length == 0 ||
			this.state.loginUsername.length == 0 ){
			this.props.doDisplayAlertMessage('Please input your username or password');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.props.doCheckOnline == false){
			this.props.doDisplayAlertMessage(Constants.LOADING_MESSAGES.OFFLINE);
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else{
			this.props.doSubmitLogin(this.state.loginUsername,
				this.state.loginPassword);
		}
	}

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
		    		alignItems:'center'
		    	}}>
		    		<View style={{
		    				height: '7%',
		    				width: '100%',
		    				flexDirection: 'row',
		    				position:'relative',
		    				top: '2%'
		    		}}>
		    			<TouchableWithoutFeedback
		    				onPress={()=>this.props.doSetTemplateDisplay(Constants.PAGES.WELCOME_PAGE)}>
			    			<Text style={{
			    					height:'100%',
			    					position: 'relative',
			    					width: '10%',
			    					left: '23%'
			    			}}>
			    				<Icon
			    					style={{
			    						fontSize:40,
			    						color: '#454647'
			    					}}
			    					name='ios-arrow-back'
			    					type='Ionicons'/>
			    			</Text>
			    		</TouchableWithoutFeedback>
		    		</View>

		    		<View style={{
		    				height: '26%',
		    				width: '100%',
		    				top:'11%',
		    				alignItems: 'center'
		    		}}>
		    			<Text style={{
		    					height:'50%',
		    					width: '25%',
		    					position: 'relative',
		    					textAlign: 'center',
		    					textAlignVertical: 'center'
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
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					fontSize: 40,
		    					fontWeight:'bold',
		    					color:'#454647'
		    			}}>
		    				Res-Sys
		    			</Text>
		    		</View>

		    		<View style={{
		    				height: '54%',
		    				width: '100%',
		    				top: '12%',
		    				position: 'relative'
		    		}}>
		    			<Text style={{
		    					fontSize: 16,
		    					height: '9%',
		    					width: '28%',
		    					left: '10%',
		    					color:'#454647',
		    					position: 'relative',
		    					top: '10%',
		    					textAlignVertical:'center'
		    			}}>
		    				USERNAME
		    			</Text>
		    			<TextInput
		    				style={{
		    					borderBottomWidth:2,
		    					height: '20%',
		    					width: '70%',
		    					top:'10%',
		    					left:'10%',
		    					fontSize:13,
		    					textAlignVertical: 'center'
		    				}}	
		    				maxLength={Constants.SIGNUP_FORMS.USERNAME_MAX_LENGTH}
		    				placeholder='INPUT USERNAME HERE'
		    				onChangeText={(loginUsername)=>this.setState({loginUsername:loginUsername})}/>

		    			<Text style={{
		    					fontSize: 16,
		    					height: '9%',
		    					width: '28%',
		    					left: '10%',
		    					color:'#454647',
		    					position: 'relative',
		    					top: '14%',
		    					textAlignVertical:'center'
		    			}}>
		    				PASSWORD
		    			</Text>

		    			<View style={{
		    					height: '20%',
		    					width: '100%',
		    					top: '10%',
		    					flexDirection: 'row',
		    					left: '10%',
		    					position: 'relative'
		    			}}>
			    			<TextInput
			    				style={{
			    					borderBottomWidth:2,
			    					height: '100%',
			    					width: '70%',
			    					fontSize:13,
			    					left: '10%',
			    					textAlignVertical: 'center',
			    					position: 'relative'
			    				}}	
			    				secureTextEntry={this.state.hidePassword}
			    				maxLength={Constants.SIGNUP_FORMS.PASSWORD_MAX_LENGTH}
			    				placeholder='INPUT PASSWORD HERE'
			    				onChangeText={(loginPassword)=>this.setState({loginPassword:loginPassword})}/>

			    			<TouchableWithoutFeedback
			    				onPress={()=>this.showPasswordText()}>
				    			<Text style={{
				    					position: 'relative',
				    					left: '15%',
				    					height: '55%',
				    					width: '13%',
				    					top: '5%',
				    					textAlignVertical: 'center',
				    					textAlign: 'center'
				    			}}>
				    				<Icon
				    					style={{
				    						fontSize:30
				    					}}
				    					name='eye'
				    					type='Entypo'/>
				    			</Text>
				    		</TouchableWithoutFeedback>
			    		</View>


			    		<TouchableWithoutFeedback
			    			onPress={()=>this.submitLogin()}>
				    		<Text style={{
				    				height: '15%',
				    				width: '30%',
				    				position: 'relative',
				    				top: '25%',
				    				color:'#454647',
				    				fontWeight: 'bold',
				    				borderWidth:2,
				    				left: '35%',
				    				textAlign: 'center',
				    				textAlignVertical: 'center'
				    		}}>
				    			SUBMIT
				    		</Text>
				    	</TouchableWithoutFeedback>
		    		</View>

		    	</View>
		    </React.Fragment>
	    );  
  	}
}
