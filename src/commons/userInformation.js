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

export default class UserInformation extends Component{

	state = {
		fullName           : '', // can be updated
		birthday           : '', // can be updated
		email              : '', // can be updated
		address            : '', // can be updated
		role               : '',
		organization       : '',
		username           : '',
		callSign           : '',
		inputBirthdayError : ''   
	}

	componentDidMount(){
		this.setState({
			fullName     : this.props.doGetLoggedAccount.fullName,
			birthday     : this.props.doGetLoggedAccount.birthday,
			email        : this.props.doGetLoggedAccount.email,
			address      : this.props.doGetLoggedAccount.address,
			role         : this.props.doGetLoggedAccount.role,
			organization : this.props.doGetLoggedAccount.organization,
			username     : this.props.doGetLoggedAccount.username,
			callSign     : this.props.doGetLoggedAccount.callSign 
		});
	}

	submitUpdateData = ()=>{
		if(this.validateInputBirthday() == false){
			this.props.doDisplayAlertMessage(this.state.inputBirthdayError);
			setTimeout(()=>{
				this.props.doDisplayAlertMessage('');
				this.setState({inputBirthdayError:''});
			},Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
			return;
		}
		else{
			let updateData = {
				fullName  : this.state.fullName, 
				birthday  : this.state.birthday, 
				email     : this.state.email, 
				address   : this.state.address 
			}
			this.props.doSubmitUpdatedInfo(updateData);
			return;
		}
	}


	validateInputBirthday = ()=>{
		let today      = 	new Date();
		let currentBirthdayInput = this.state.birthday;

		let getMonth   = 	Number(currentBirthdayInput[0]+currentBirthdayInput[1]);
		let getDay     = 	Number(currentBirthdayInput[3]+currentBirthdayInput[4]);
		let getYear    = 	Number(currentBirthdayInput[6]+currentBirthdayInput[7]+
						currentBirthdayInput[8]+currentBirthdayInput[9]);
		let currentYear =	today.getFullYear();
		if(Number.isInteger(getMonth) == false || Number.isInteger(getDay) == false ||
			Number.isInteger(getYear) == false){
			this.setState({inputBirthdayError:'Invalid input for the birthdate, check format'});
			return false;
		}
		else if(getYear>(currentYear-Constants.SIGNUP_FORMS.MINIMUM_AGE_SIGN)){
			this.setState({inputBirthdayError:'Minimum age requirement is '+
				Constants.SIGNUP_FORMS.MINIMUM_AGE_SIGN+' years old'});
			return false;
		}
		else if(getMonth>12 || getMonth<=0){ // 12 because there are 12 months only
			this.setState({inputBirthdayError:'Please input a valid month for your birthdate'});
			return false;
		}
		else if(getDay>31 || getDay<=0){ // 31 is for 31 days in a month
			this.setState({inputBirthdayError:'Please input a valid day for your birthdate'});
			return false;
		}
		else{ // success formatting for input birthdate
			this.setState({inputBirthdayError:''});
			return true;
		}
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
		    					textAlignVertical: 'center',
		    					position: 'relative',
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
	    				USER INFORMATION
	    			</Text>
	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '3%',
	    				height: '8%',
	    				width: '100%',
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					position: 'relative',
	    					left: '30%',
	    					width: '40%',
	    					fontSize: 15,
	    					textAlign: 'center',
	    					textAlignVertical: 'center'
	    			}}>
	    				<Icon
	    					style={{
	    						fontSize: 30,
	    						color: '#454647'
	    					}}
	    					name='pencil'
	    					type='Entypo'/>{' '}
	    					 User Profile	
	    			</Text>
	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '5%',
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					height:'100%',
	    					width:'20%',
	    					left: '13%',
	    					textAlign:'center',
	    					fontSize: 15,
	    					textAlignVertical: 'center'
	    			}}>
	    				Full Name
	    			</Text>

	    			<TextInput
	    				style={{
	    					height:'100%',
	    					width: '60%',
	    					left: '30%',
	    					borderBottomWidth:1,
	    					position: 'relative',
	    					color: '#000'
	    				}}
	    				value={this.state.fullName}
	    				onChangeText={(fullName)=>this.setState({fullName:fullName})}/>
	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '5.5%',
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					height:'100%',
	    					width:'20%',
	    					left: '13%',
	    					textAlign:'center',
	    					fontSize: 15,
	    					textAlignVertical: 'center'
	    			}}>
	    				Address
	    			</Text>
	    			<TextInput
	    				style={{
	    					height:'100%',
	    					width: '60%',
	    					left: '30%',
	    					borderBottomWidth:1,
	    					position: 'relative',
	    					color: '#000'
	    				}}
	    				value={this.state.address}
	    				onChangeText={(address)=>this.setState({address:address})} />
	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '5.5%',
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					height:'100%',
	    					width:'20%',
	    					left: '13%',
	    					textAlign:'center',
	    					fontSize: 15,
	    					textAlignVertical: 'center'
	    			}}>
	    				Birthday
	    			</Text>
	    			<TextInput
	    				style={{
	    					height:'100%',
	    					width: '60%',
	    					left: '30%',
	    					borderBottomWidth:1,
	    					position: 'relative',
	    					color: '#000'
	    				}}
	    				value={this.state.birthday}
	    				onChangeText={(birthday)=>this.setState({birthday:birthday})} />
	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '5.5%',
	    				height: '9.5%',
	    				width: '100%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					height:'100%',
	    					width:'20%',
	    					left: '13%',
	    					textAlign:'center',
	    					fontSize: 15,
	    					textAlignVertical: 'center'
	    			}}>
	    				E-mail Address
	    			</Text>
	    			<TextInput
	    				style={{
	    					height:'100%',
	    					width: '60%',
	    					left: '30%',
	    					borderBottomWidth:1,
	    					position: 'relative',
	    					color: '#000'
	    				}}
	    				value={this.state.email}
	    				onChangeText={(email)=>this.setState({email:email})} />
	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '5.5%',
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					height:'100%',
	    					width:'20%',
	    					left: '13%',
	    					textAlign:'center',
	    					fontSize: 15,
	    					textAlignVertical: 'center'
	    			}}>
	    				Role
	    			</Text>

	    			<Text style={{
	    					height:'100%',
	    					width: '60%',
	    					left: '30%',
	    					position: 'relative',
	    					textAlign: 'center',	
	    					textAlignVertical: 'center',
	    					fontSize: 15,
	    					color: '#000'
	    			}}>
	    				{this.state.role}
	    			</Text>
	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '5.5%',
	    				height: '9.6%',
	    				width: '100%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					height:'100%',
	    					width:'20%',
	    					left: '13%',
	    					textAlign:'center',
	    					fontSize: 15,
	    					textAlignVertical: 'center'
	    			}}>
	    				Account Username
	    			</Text>
	    			<Text style={{
	    					height:'100%',
	    					width: '60%',
	    					left: '30%',
	    					position: 'relative',
	    					textAlign: 'center',	
	    					textAlignVertical: 'center',
	    					fontSize: 15,
	    					color: '#000'
	    			}}>
	    				{this.state.username}
	    			</Text>

	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				top: '5.5%',
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					height:'100%',
	    					width:'20%',
	    					left: '13%',
	    					textAlign:'center',
	    					fontSize: 11,
	    					textAlignVertical: 'center'
	    			}}>
	    				Organization{'\n'}and Call Sign
	    			</Text>
	    			<Text style={{
	    					height:'100%',
	    					width: '60%',
	    					left: '30%',
	    					position: 'relative',
	    					textAlign: 'center',	
	    					textAlignVertical: 'center',
	    					fontSize: 15,
	    					color: '#000'
	    			}}>
	    				{this.state.role == Constants.USER_ROLES.CIVILIAN ?
	    					'Not Applicable': String(this.state.organization)+ 
    						' - ' 
    						+ String(this.state.callSign)}
	    			</Text>
	    		</View>

	    		<TouchableWithoutFeedback
	    			onPress={()=>this.submitUpdateData()}>
		    		<Text style={{
		    				height: '8%',
		    				textAlign: 'center',
		    				textAlignVertical: 'center',
		    				width: '30%',
		    				position: 'relative',
		    				top: '10%',
		    				borderWidth:2,
		    				borderColor : '#454647',
		    				color: '#000'
		    		}}>
		    			UPDATE
		    		</Text>
		    	</TouchableWithoutFeedback>
	    	</View>
    	);
	}
}