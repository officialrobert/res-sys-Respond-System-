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
import {Icon}        from 'native-base';
import Constants     from './Constants.js';
import ResponderPage from '../responder/responderPage.js';
import BystanderPage from '../bystander/bystanderPage.js';
import NoRolePage    from './noRolePage.js';
export default class HomeTemplate extends Component{

	state = {
		accountDetails: {
			role: Constants.USER_ROLES.DEFAULT
		}
	}

	componentDidMount(){
		this.setState({accountDetails:this.props.doGetLoggedAccount});
	}

	homeTemplateMainDisplay = ()=>{
		switch(this.state.accountDetails.role){
			case Constants.USER_ROLES.RESPONDER:
				return 	<ResponderPage
							FirebaseObject            = {this.props.FirebaseObject}
							doSubmitResolve           = {this.props.doSubmitResolve}
							doSubmitChangePassword    = {this.props.doSubmitChangePassword}
							doSetLoggedAccount        = {this.props.doSetLoggedAccount}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doLogoutAccount           = {this.props.doLogoutAccount}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage }
							doSubmitUpdatedInfo       = {this.props.doSubmitUpdatedInfo}
							doSubmitPhoneNumberUpdate = {this.props.doSubmitPhoneNumberUpdate}
							doGetMylocation           = {this.props.doGetMylocation}
							doGetEmergencyIcon        = {this.props.doGetEmergencyIcon} />;
			case Constants.USER_ROLES.CIVILIAN:
				return 	<BystanderPage
							FirebaseObject            = {this.props.FirebaseObject}
							doSubmitIncidentReport    = {this.props.doSubmitIncidentReport}
							doSubmitChangePassword    = {this.props.doSubmitChangePassword}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doLogoutAccount           = {this.props.doLogoutAccount}
							doSetLoggedAccount        = {this.props.doSetLoggedAccount}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage }
							doSubmitUpdatedInfo       = {this.props.doSubmitUpdatedInfo}
							doSubmitPhoneNumberUpdate = {this.props.doSubmitPhoneNumberUpdate}
							doGetMylocation           = {this.props.doGetMylocation}
							doGetEmergencyIcon        = {this.props.doGetEmergencyIcon} />;
			case Constants.USER_ROLES.DEFAULT:
				return 	<NoRolePage />;
		}
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.homeTemplateMainDisplay()}
	    	</React.Fragment>
	    );
	}
}