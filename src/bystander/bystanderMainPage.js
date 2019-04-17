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
import {Icon}      from 'native-base';
import Constants   from '../commons/Constants.js';
import DefaultPage from './defaultPage.js';
import ReportPage  from './reportPage.js';

export default class BystanderMainPage extends Component{

	state = {
		mainPageOperation: Constants.CIVILIAN_MAIN_PAGE.DEFAULT_PAGE
	}

	setBystanderMainOperation = (operation)=>{
		this.setState({mainPageOperation:operation});
	}

	bystanderMainPageDisplay = ()=>{

		switch(this.state.mainPageOperation){
			case Constants.CIVILIAN_MAIN_PAGE.DEFAULT_PAGE:
				return 	<DefaultPage
							FirebaseObject            = {this.props.FirebaseObject}
							setBystanderMainOperation = {this.setBystanderMainOperation}
							doGetMylocation           = {this.props.doGetMylocation}
							doGetEmergencyIcon        = {this.props.doGetEmergencyIcon} />;
			case Constants.CIVILIAN_MAIN_PAGE.REPORT_PAGE:
				return 	<ReportPage
							doSetLoggedAccount        = {this.props.doSetLoggedAccount}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							FirebaseObject            = {this.props.FirebaseObject}
							doSubmitIncidentReport    = {this.props.doSubmitIncidentReport}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage}
							setBystanderMainOperation = {this.setBystanderMainOperation} />;
		}
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.bystanderMainPageDisplay()}
	    	</React.Fragment>
	    );
	}
}