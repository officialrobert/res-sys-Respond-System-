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
import {Icon}          from 'native-base';
import Constants         from '../commons/Constants.js';
import MorePage          from '../commons/MorePage.js';
import ChangePassword    from '../commons/changePassword.js';
import UserInformation   from '../commons/userInformation.js';
import PhoneNumber       from '../commons/phoneNumber.js';
import BystanderMainPage from './bystanderMainPage.js';

export default class BystanderPage extends Component{

	state = {
		userOperation: Constants.CIVILIAN_PAGE.MAIN_PAGE 
	}

	setHomePage = (operation)=>{
		this.setState({userOperation:operation});
	}

	bystanderPageContent = ()=>{
		switch(this.state.userOperation){
			case Constants.COMMON_PAGE.MORE_PAGE:
				return 	<MorePage
							doSetHomePage             = {this.setHomePage} 
							doLogoutAccount           = {this.props.doLogoutAccount} />;
			case Constants.CIVILIAN_PAGE.MAIN_PAGE:
				return	<BystanderMainPage
							doSetLoggedAccount        = {this.props.doSetLoggedAccount}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							FirebaseObject            = {this.props.FirebaseObject}
							doSubmitIncidentReport    = {this.props.doSubmitIncidentReport}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage}
							doGetMylocation           = {this.props.doGetMylocation}
							doGetEmergencyIcon        = {this.props.doGetEmergencyIcon} />;
			case Constants.COMMON_PAGE.CHANGE_PASS_PAGE:
				return 	<ChangePassword
							doSubmitChangePassword    = {this.props.doSubmitChangePassword}
							doSetHomePage             = {this.setHomePage} />;
			case Constants.COMMON_PAGE.USER_INFO_PAGE:
				return	<UserInformation
							doSubmitUpdatedInfo       = {this.props.doSubmitUpdatedInfo}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doSetHomePage             = {this.setHomePage} />;
			case Constants.COMMON_PAGE.PHONE_NUMBER:
				return 	<PhoneNumber
							doSetHomePage             = {this.setHomePage}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doSubmitPhoneNumberUpdate = {this.props.doSubmitPhoneNumberUpdate} />;
		}
	}


	render() {
	    return (
	    	<React.Fragment>
	    		<View style={{
	    				height: '92%',
	    				width: '100%',
	    				backgroundColor: '#fff',
	    				flexDirection:'row',
	    				top: '0%'
	    		}}>
	    			{this.bystanderPageContent()}
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				backgroundColor: '#88ef92',
	    				flexDirection:'row'
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.setState({userOperation:Constants.CIVILIAN_PAGE.MAIN_PAGE})}>
		    			<View style={{
		    					width:'50%',
		    					height: '100%',
		    					position: 'relative',
		    			}}>
		    				<Text style={{
		    						height: '100%',
		    						width: '100%',
		    						fontSize: 14,
		    						fontWeight: 'bold',
		    						textAlign: 'center',
		    						textAlignVertical: 'center'
		    				}}>
			    				<Icon
			    					style={{
			    						fontSize: 30,
			    						color: '#454647'
			    					}}
			    					name='ios-home'
			    					type='Ionicons'/>
			    			</Text>
		    			</View>
		    		</TouchableWithoutFeedback>
		    			
		    		<TouchableWithoutFeedback
	    				onPress={()=>this.setState({userOperation:Constants.COMMON_PAGE.MORE_PAGE})}>
		    			<View style={{
		    					width:'50%',
		    					height: '100%',
		    					position: 'relative'
		    			}}>
		    				<Text style={{
		    						height: '100%',
		    						width: '100%',
		    						fontSize: 14,
		    						textAlignVertical: 'center',
		    						fontWeight: 'bold',
		    						textAlign: 'center'
		    				}}>
		    					<Icon
			    					style={{
			    						fontSize: 30,
			    						color: '#454647'
			    					}}
			    					name='bars'
			    					type='FontAwesome'/>
		    				</Text>
		    			</View>
		    		</TouchableWithoutFeedback>
	    		</View>
	    	</React.Fragment>
		);
	}
}