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
import Constants           from '../commons/Constants.js';
import MorePage            from '../commons/MorePage.js';
import ChangePassword      from '../commons/changePassword.js';
import UserInformation     from '../commons/userInformation.js';
import PhoneNumber         from '../commons/phoneNumber.js';
import ResponderMainPage   from './responderMainPage.js';
import IncidentList        from './incidentList.js';
import IncidentDetailsPage from './incidentDetailsPage.js';
import ResolvePage         from './resolvePage.js';
import RespondingList      from './respondingList.js';

export default class ResponderPage extends Component{

	state = {
		userOperation : Constants.RESPONDER_PAGE.MAIN_PAGE,
		reportDetails : {}
	}

	setReportDetails = (report)=>{
		this.setState({reportDetails:report});
	}

	setHomePage = (operation)=>{
		this.setState({userOperation:operation});
	}

	responderPageContent = ()=>{
		switch(this.state.userOperation){
			case Constants.COMMON_PAGE.MORE_PAGE:
				return 	<MorePage
							doSetHomePage             = {this.setHomePage} 
							doLogoutAccount           = {this.props.doLogoutAccount} />;
			case Constants.RESPONDER_PAGE.MAIN_PAGE:
				return 	<ResponderMainPage
							doSetHomePage             = {this.setHomePage}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doSetReportDetails        = {this.setReportDetails}
							FirebaseObject            = {this.props.FirebaseObject}
							doSetLoggedAccount        = {this.props.doSetLoggedAccount}
							doGetMylocation           = {this.props.doGetMylocation}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage}
							doGetEmergencyIcon        = {this.props.doGetEmergencyIcon} />;
			case Constants.RESPONDER_PAGE.LIST_PAGE:
				return 	<IncidentList
							doGetMylocation           = {this.props.doGetMylocation}
							FirebaseObject            = {this.props.FirebaseObject}
							doSetHomePage             = {this.setHomePage} 
							doSetReportDetails        = {this.setReportDetails} />;
			case Constants.RESPONDER_PAGE.INCIDENT_DETAILS: 
				return  <IncidentDetailsPage 
							doGetReportDetails        = {this.state.reportDetails}
							doSetHomePage             = {this.setHomePage} />;
			case Constants.RESPONDER_PAGE.RESOLVE_PAGE:
				return  <ResolvePage
							FirebaseObject            = {this.props.FirebaseObject}
							doSubmitResolve           = {this.props.doSubmitResolve}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doGetReportDetails        = {this.state.reportDetails}
							doSetHomePage             = {this.setHomePage} />;
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
			case Constants.RESPONDER_PAGE.RESPONDING_LIST:
				return 	<RespondingList
							FirebaseObject            = {this.props.FirebaseObject}
							doGetReportDetails        = {this.state.reportDetails}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage}
							doSetLoggedAccount        = {this.props.doSetLoggedAccount}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doSetHomePage             = {this.setHomePage} />;
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
	    			{this.responderPageContent()}
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				backgroundColor: '#88ef92',
	    				flexDirection:'row'
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.setState({userOperation:Constants.RESPONDER_PAGE.MAIN_PAGE})}>
		    			<View style={{
		    					width:'33.33%',
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
	    				onPress={()=>this.setState({userOperation:Constants.RESPONDER_PAGE.LIST_PAGE})}>
		    			<View style={{
		    					width:'33.33%',
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
			    					name='md-paper'
			    					type='Ionicons'/>
			    			</Text>
		    			</View>
		    		</TouchableWithoutFeedback>
		    			
		    		<TouchableWithoutFeedback
	    				onPress={()=>this.setState({userOperation:Constants.COMMON_PAGE.MORE_PAGE})}>
		    			<View style={{
		    					width:'33.333%',
		    					height: '100%',
		    					position: 'relative'
		    			}}>
		    				<Text style={{
		    						height: '100%',
		    						width: '100%',
		    						paddingTop: '7%',
		    						fontWeight: 'bold',
		    						textAlign: 'center',
		    						textAlignVertical: 'center'
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