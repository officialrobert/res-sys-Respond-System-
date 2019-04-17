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
	Alert,
	Picker,
	CheckBox} 
	from 'react-native';
import { 
	Container,
	Icon} 
	from 'native-base';


/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';


export default class SignUpPartTwoDashboard extends Component<Props> {

	state = {
		inputRole         : Constants.USER_ROLES.CIVILIAN,
		inputGender       : 'Male',
		inputCallSign     : '',
		inputOrganization : '',
		bystanderColor    : Constants.USER_ROLES.CHOSEN_ROLE_COLOR,
		responderColor    : Constants.USER_ROLES.NOT_CHOSEN_ROLE_COLOR,
		userRoleContent   : Constants.USER_ROLES.CIVILIAN_CONTENT,
		storeValid        : [],
		termsFlag         : false,
	}	

	componentDidMount(){
		this.setState({storeValid:this.props.doGetValidOrganizations});
		this.setState({inputOrganization:this.props.doGetValidOrganizations[0].Name});
	}

	genderChange = (ItemValue,ItemIndex)=>{
		this.setState({inputGender:ItemValue});
	}

	organizationChange = (ItemValue,ItemIndex)=>{
		this.setState({inputOrganization:ItemValue});
	}

	termsCheckbox = ()=>{
		this.setState({termsFlag:!this.state.termsFlag});
	}

	changeUserRole = (role)=>{
		if(role == Constants.USER_ROLES.CIVILIAN){
			this.setState({inputRole:role});
			this.setState({
				bystanderColor    : Constants.USER_ROLES.CHOSEN_ROLE_COLOR,
				responderColor    : Constants.USER_ROLES.NOT_CHOSEN_ROLE_COLOR,
				userRoleContent   : Constants.USER_ROLES.CIVILIAN_CONTENT,
				inputOrganization : '',
				inputCallSign     : ''
			});
		}
		else if(role == Constants.USER_ROLES.RESPONDER){
			this.setState({inputRole:role});
			this.setState({
				bystanderColor : Constants.USER_ROLES.NOT_CHOSEN_ROLE_COLOR,
				responderColor : Constants.USER_ROLES.CHOSEN_ROLE_COLOR,
				userRoleContent : Constants.USER_ROLES.RESPONDER_CONTENT
			});
		}
	}

	submitRegistration = ()=>{
		this.props.doDisplayAlertMessage('');
		if(this.state.termsFlag == false){
			this.props.doDisplayAlertMessage('Please read and agree on our terms of service');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.state.inputRole == Constants.USER_ROLES.RESPONDER && 
			(this.state.inputOrganization.length==0 || this.state.inputCallSign.length==0)){
			this.props.doDisplayAlertMessage('Please fill in the organization or call sign section');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else{
			const data = {
				inputOrganization : this.state.inputOrganization,
				inputCallSign     : this.state.inputCallSign,
				inputGender       : this.state.inputGender,
				inputRole         : this.state.inputRole
			}
			this.props.doSaveSecondCredential(data);
			this.props.doDisplayAlertMessage('Submitting Registration form, Please Wait..');
			setTimeout(()=>{
				this.props.doSubmitRegistration();
				this.props.doDisplayAlertMessage('');
			},1200);
		}
	}

	generateOrganizationOption = ()=>{
		if(this.state.storeValid.length!=0 && this.state.inputRole == Constants.USER_ROLES.RESPONDER){
			return	<Picker
			       		selectedValue = {this.state.inputOrganization}
			        	style={{height:'100%',width:'100%'}}
			        	onValueChange = {this.organizationChange}>
			        	{this.state.storeValid.map((currentOrganization)=>{
			        		return	<Picker.Item label={String(currentOrganization.Name)} 
			        					key={String(currentOrganization.Name)}
			        					value={String(currentOrganization.Name)}/>
			        	})}
			 		</Picker>
		}
		else if(this.state.inputRole == Constants.USER_ROLES.CIVILIAN){
			return <Text style={{
							width:'100%',
							height: '100%',
							fontSize: 12,
							fontWeight: 'bold',
							textAlign: 'center',
							textAlignVertical: 'center',
							color : Constants.USER_ROLES.NOT_CHOSEN_ROLE_COLOR
					}}>
						Disabled for bystanders
					</Text>
		}
		else{
			return	<Text style={{
							width:'100%',
							height: '100%',
							fontSize: 13,
							fontWeight: 'bold',
							color: '#000',
							textAlign: 'center',
							textAlignVertical: 'center',
							color : Constants.USER_ROLES.NOT_CHOSEN_ROLE_COLOR,
							borderColor : Constants.USER_ROLES.NOT_CHOSEN_ROLE_COLOR
					}}>
						No current organization
					</Text>
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
		    				onPress={()=>this.props.doSetTemplateDisplay(Constants.PAGES.SIGN_UP_PAGE)}>
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

			    		<Text style={{
		    					height: '100%',
		    					width: '47%',
		    					fontSize: 18,
		    					left: '180%',
		    					paddingTop: '2.5%',
		    					fontWeight: 'bold',
		    					position: 'relative'
		    			}}>
		    				Registration 2 of 2
		    			</Text>
		    		</View>

		    		<View style={{
		    			width:'100%',
		    			height:'10%',
		    			top: '3%',
		    			flexDirection: 'row',
		    			justifyContent: 'space-evenly'
		    		}}>
		    			<TouchableWithoutFeedback
		    				onPress={()=>this.changeUserRole(Constants.USER_ROLES.CIVILIAN)}>
			    			<Text style={{
			    					width:'45%',
			    					height: '100%',
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					fontWeight:'bold',
			    					color: this.state.bystanderColor,
			    					fontSize: 16,
			    					borderWidth:2,
			    					borderRadius:15
			    			}}>
			    				<Icon
			    					style={{
			    						fontSize:30,
			    						color: this.state.bystanderColor
			    					}}
			    					name='human-greeting'
			    					type='MaterialCommunityIcons'/>{' '}
			    					BYSTANDERS
			    			</Text>
			    		</TouchableWithoutFeedback>

		    			<TouchableWithoutFeedback
		    				onPress={()=>this.changeUserRole(Constants.USER_ROLES.RESPONDER) }>
			    			<Text style={{
			    					width:'45%',
			    					height: '100%',
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					fontWeight:'bold',
			    					fontSize: 16,
			    					borderWidth:2,
			    					borderRadius:15,
			    					borderColor : this.state.responderColor,
			    					color: this.state.responderColor
			    			}}>
			    				<Icon
			    					style={{
			    						fontSize:30,
			    						color: this.state.responderColor
			    					}}
			    					name='verified-user'
			    					type='MaterialIcons'/>{' '}
			    					RESPONDERS
			    			</Text>
			    		</TouchableWithoutFeedback>
		    		</View>

		    		<View style={{
		    				flexDirection: 'row',
		    				height: '20%',
		    				top: '4%',
		    				width: '100%',
		    				borderBottomWidth: 2,
		    				justifyContent: 'center'
		    		}}>

		    			<Text style={{
		    					width:'15%',
		    					height: '100%',
		    					fontWeight:'bold',
		    					position: 'relative',
		    					color: '#000',
		    					textAlign: 'center',
		    					textAlignVertical: 'center'
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize:55,
		    						color: '#000'
		    					}}
		    					name='human'
		    					type='MaterialCommunityIcons'/>
		    			</Text>

		    			<Text style={{
		    					width:'60%',
		    					height: '100%',
		    					left: '30%',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					fontWeight:'bold',
		    					position: 'relative',
		    					fontSize: 14,
		    					color: '#000'
		    			}}>
		    				{this.state.userRoleContent}
		    			</Text>
		    		</View>

		    		<Text style={{
		    				width: '100%',
	    					fontSize: 14,
	    					position: 'relative',
	    					height: '3.8%',
	    					textAlign:'center',
	    					textAlignVertical: 'center',
	    					top:'4.5%',
	    					color: '#000'
		    		}}>
		    			GENDER
		    		</Text>
		    		<View style={{
		    				width: '30%',
		    				height: '6%',
		    				top: '5%',
		    				borderWidth:2,
		    				borderRadius: 6,
		    				position: 'relative',
		    				alignItems: 'center',
		    				color: '#000'
		    		}}>
		    			<Picker
		               		selectedValue = {this.state.inputGender}
		                	style={{height:'100%',width:'100%'}}
		                	onValueChange = {this.genderChange}>
			                <Picker.Item label="Male" value="Male"/>
			                <Picker.Item label="Female" value="Female"/>
			                <Picker.Item label="Rather not say" value="Rather not say"/>
		             	</Picker>
		    		</View>

		    		<View style={{
		    				height: '28%',
		    				width: '100%',
		    				top: '6%',
		    				position: 'relative'
		    		}}>
		    			<Text style={{
		    				width: '100%',
	    					fontSize: 14,
	    					position: 'relative',
	    					height: '20%',
	    					textAlign:'center',
	    					textAlignVertical: 'center',
	    					color: '#000'
		    			}}>
		    				RESPONDER ORGANIZATION
		    			</Text>
		    			<View style={{
		    					height: '25%',
		    					width: '100%',
		    					flexDirection: 'row',
		    					alignItems:'center',
		    					justifyContent: 'center'
		    			}}>
		    				<View style={{
				    				width: '45%',
				    				height: '100%',
				    				borderWidth:2,
				    				borderRadius: 6,
				    				position: 'relative',
				    				color: '#000'
				    		}}>
				    			{this.generateOrganizationOption()}
			             	</View>

			    			<Text style={{
			    					height: '100%',
			    					width: '45%',
			    					position: 'relative',
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					fontSize: 15,
			    					fontWeight: 'bold',
			    					color: '#000'
			    			}}>
			    				{this.state.inputRole  == Constants.USER_ROLES.CIVILIAN ?
			    					'N/A for bystanders' : ''}
			    			</Text>

			    		</View>

		    			<Text style={{
		    				width: '100%',
	    					fontSize: 14,	
	    					position: 'relative',
	    					height: '20%',
	    					color: '#000',
	    					textAlign: 'center',
	    					textAlignVertical: 'center'
		    			}}>
		    				CALL SIGN
		    			</Text>

		    			<View style={{
		    					height: '25%',
		    					width: '100%',
		    					flexDirection: 'row',
		    					alignItems:'center',
		    					justifyContent: 'center'
		    			}}>
			    			<TextInput
			    				style={{
			    					borderBottomWidth:2,
			    					height: '100%',
			    					width: '45%',
			    					fontSize:11,
			    					textAlignVertical: 'center',
			    					position: 'relative',
			    					color: '#000',
			    					borderColor: this.state.responderColor
			    				}}
			    				placeholder='ORGANIZATION CALL SIGN' 
			    				editable   = {this.state.inputRole == Constants.USER_ROLES.CIVILIAN ?
			    					false:true}
			    				maxLength  ={Constants.SIGNUP_FORMS.CALL_SIGN_MAX_LENGTH}
			    				onChangeText={(inputCallSign)=>this.setState({inputCallSign:inputCallSign})}/>

			    			<Text style={{
			    					height: '100%',
			    					width: '45%',
			    					position: 'relative',
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					fontSize: 15,
			    					fontWeight: 'bold',
			    					color: '#000'
			    			}}>
			    				{this.state.inputRole  == Constants.USER_ROLES.CIVILIAN ?
			    					'N/A for bystanders' : ''}
			    			</Text>
			    		</View>	
		    		</View>
		    		<View style={{
		    			height: '8%',
		    			position: 'relative',
		    			top: '6.5%',
		    			justifyContent: 'center',
		    			alignItems:'center',
		    			flexDirection: 'row'
		    		}}>
		    			<CheckBox
		    				value={this.state.termsFlag}
		    				onChange={this.termsCheckbox}
		    				style={{
		    					width:'10%',
		    					height:'90%',
		    					position: 'relative'
		    				}}/>
		    			<Text style={{
		    					height: '100%',
		    					width: '30%',
		    					position: 'relative',
		    					fontSize: 14,
		    					color: '#000',
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					textAlignVertical : 'center'
		    			}}>
		    				Agree to terms of service
		    			</Text>

		    			<TouchableWithoutFeedback
		    				onPress={()=>console.log('view')}>
			    			<Text style={{
			    					height: '100%',
			    					width: '30%',
			    					position: 'relative',
			    					fontSize: 14,
			    					color: '#000',
			    					fontWeight: 'bold',
			    					textAlign: 'center',
			    					borderLeftWidth:2,
			    					textAlign: 'center',
			    					textAlignVertical : 'center'
			    			}}>
			    				View terms of service
			    			</Text>
			    		</TouchableWithoutFeedback>
		    		</View>

		    		<TouchableWithoutFeedback
		    			onPress={()=>this.submitRegistration()}>
			    		<Text style={{
			    				height: '7.5%',
			    				width: '30%',
			    				position: 'relative',
			    				top: '7%',
			    				color:'#454647',
			    				fontWeight: 'bold',
			    				borderWidth:2,
			    				textAlign: 'center',
		    					textAlignVertical: 'center'
			    		}}>
			    			SUBMIT
			    		</Text>
			    	</TouchableWithoutFeedback>
		    	</View>
    		</React.Fragment>
		);  
  	}
}