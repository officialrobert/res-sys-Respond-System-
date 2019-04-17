import React, {Component} from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage, 
	Image,
	TextInput,
	TouchableWithoutFeedback,
	FlatList} 
	from 'react-native';
import {Icon}        from 'native-base';

import Constants from '../commons/Constants.js';

export default class RespondingList extends Component{
	

	state = {
		allResponding        : [],
		firebaseReportObject : '',
		loadingResponding    : true,
		submittingRespond    : false,
		estimateTimeInput    : '',
		firebaseAccountObject : ''
	}

	respondToIncident = ()=>{
		if(this.props.doGetLoggedAccount.accountStatus == Constants.ACCOUNT_STATUS.BLOCKED){
			this.props.doDisplayAlertMessage('Sorry, your account was blocked, send a problem');
			setTimeout(()=>{
				this.props.doDisplayAlertMessage('');
			},Constants.CONSOLE_TIME_DISPLAY);
			return;
		}
		else if(this.state.submittingRespond == true){
			this.props.doDisplayAlertMessage('Currently submitting, you may try again later');
			setTimeout(()=>{
				this.props.doDisplayAlertMessage('');
			},Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(this.props.doGetLoggedAccount.responding){
			this.props.doDisplayAlertMessage('You are currently responding to an incident');
			setTimeout(()=>{
				this.props.doDisplayAlertMessage('');
			},Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(this.state.estimateTimeInput.length == 0){
			this.props.doDisplayAlertMessage('Please input estimated time of arrival');
			setTimeout(()=>{
				this.props.doDisplayAlertMessage('');
			},Constants.CONSOLE_TIME_DISPLAY);
		}
		else{
			this.props.doDisplayAlertMessage('Loading, a moment..');
			this.setState({submittingRespond:true});
			const respondingKey =	this.props.FirebaseObject
										.database()
										.ref("Reports/"+String(this.props.doGetReportDetails.key)+"/responding")
										.push();
			respondingKey
				.update({
					'key'          : String(respondingKey.key),
					'responder'    : this.props.doGetLoggedAccount.fullName,
					'organization' : this.props.doGetLoggedAccount.organization, 
					'ETA'          : String(this.state.estimateTimeInput),
					'responderKey' : String(this.props.doGetLoggedAccount.key)
 				})
 				.then(()=>{
 					this.props.FirebaseObject
 						.database()
 						.ref("Accounts/"+String(this.props.doGetLoggedAccount.key)+"/responding")
 						.update({
 							'key'           : String(respondingKey.key),
							'responder'     : this.props.doGetLoggedAccount.fullName,
							'organization'  : this.props.doGetLoggedAccount.organization, 
							'ETA'           : String(this.state.estimateTimeInput),
							'userLatitude'  : this.props.doGetReportDetails.userLatitude, 
							'userLongitude' : this.props.doGetReportDetails.userLongitude,
							'userAltitude'  : this.props.doGetReportDetails.userAltitude,
							'reporter'      : this.props.doGetReportDetails.reporter,
							'incidentType'  : this.props.doGetReportDetails.incidentType,
							'reportKey'     : String(this.props.doGetReportDetails.key)  
 						})
 						.then(()=>{
 							this.props.FirebaseObject
 								.database()
 								.ref("Accounts/"+String(this.props.doGetLoggedAccount.key))
 								.once("value",snapshot=>{
 									const accountDetails = JSON.parse(JSON.stringify(snapshot.val()));
 									this.props.doSetLoggedAccount(accountDetails);
 								})
 								.then(()=>{
 									this.props.doDisplayAlertMessage('Successfully Submitted');
									setTimeout(()=>{
										this.props.doDisplayAlertMessage('');
										this.setState({submittingRespond:false});
										this.props.doSetHomePage(Constants.RESPONDER_PAGE.MAIN_PAGE);
									},1500);
 								});
 						})
 						.catch((error)=>{
		 					this.props.doDisplayAlertMessage('Error in connecting to the server');
							setTimeout(()=>{
								this.props.doDisplayAlertMessage('');
							},Constants.CONSOLE_TIME_DISPLAY);
		 				});
 				})
 				.catch((error)=>{
 					this.props.doDisplayAlertMessage('Error in connecting to the server');
					setTimeout(()=>{
						this.props.doDisplayAlertMessage('');
					},Constants.CONSOLE_TIME_DISPLAY);
 				});
		}
	}

	componentDidMount(){
		const firebaseAccountObject =	this.props.FirebaseObject
											.database()
											.ref("Accounts/"+String(this.props.doGetLoggedAccount.key))
											.on("value",snapshot=>{
												if(snapshot.exists()){
													const updatedAccount = JSON.parse(JSON.stringify(snapshot.val()));
													this.props.doSetLoggedAccount(updatedAccount);
												}
											});
		this.listenToResponding();
		this.setState({firebaseAccountObject:firebaseAccountObject});
	}

	listenToResponding = ()=>{
		this.setState({loadingResponding:true});
		const firebaseKey = 	this.props.FirebaseObject
									.database()
									.ref("Reports/"+String(this.props.doGetReportDetails.key))
									.on("value",snapshot=>{
										if(snapshot.exists()){
											const reportDetails = JSON.parse(JSON.stringify(snapshot.val()));
											
											if(reportDetails.responding){
												const allRespondingWithKey = JSON.parse(JSON.stringify(reportDetails.responding));
												const initAllResponding    = [];
												Object
												.keys(allRespondingWithKey)
												.forEach((responderKey)=>{
													initAllResponding.push(allRespondingWithKey[responderKey]);
												});
												this.setState({allResponding:initAllResponding});
												setTimeout(()=>{
													this.setState({loadingResponding:true});
												},1500);
											}
										}
										else{
											this.setState({allResponding:[]});
										}
									});

		this.setState({firebaseReportObject:firebaseKey});
	}

	componentWillUnmount(){
		this.props.FirebaseObject
			.database()
			.ref("Accounts/"+String(this.props.doGetLoggedAccount.key))
			.off("value",this.state.firebaseAccountObject);
		this.props.FirebaseObject
			.database()
			.ref("Reports")
			.off("value",this.state.firebaseReportObject);
	}

	render() {
	    return (
	    	<View style={{
	    			height: '100%',
	    			width: '100%',
	    			alignItems:'center'
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
	    				onPress={()=>this.props.doSetHomePage(Constants.RESPONDER_PAGE.INCIDENT_DETAILS)}>
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
	    		</View>

	    		<Text style = {{ 
	    				height: '7%',
	    				width:'90%',
	    				position:'relative',
	    				fontSize: 17,
	    				fontWeight: 'bold',
	    				textAlign:'center',
	    				textAlignVertical: 'center',
	    				top: '2%',
	    				color: '#000'
	    		}}>
	    			<Icon
	    				style ={{fontSize:25}}
	    				name = 'fire-truck'
	    				type = 'MaterialCommunityIcons'/> 
	    			{' '}Incoming Responders
	    		</Text>

	    		<View style = {{
	    				height: '50%',
	    				position: 'relative',
	    				top: '3%',
	    				width: '100%'
	    		}}>
	    			{
	    				this.state.allResponding.length == 0 ?
	    				<Text style = {{
	    						height: '25%',
	    						top: '30%',
	    						position: 'relative',
	    						textAlignVertical: 'center',
	    						textAlign : 'center',
	    						fontSize: 15,
	    						color: '#000',
	    						width: '100%'
	    				}}>
	    					No one has responded yet
	    				</Text>:
	    				<FlatList
		    				data = {this.state.allResponding}
							renderItem = {({item}) =>
								<View style ={{
										marginBottom: 10,
										marginTop: 15,
										width: '90%',
										height: 66,
										borderBottomWidth:2,
										left: '5%',
										position: 'relative'
								}}>
									<Text style ={{
											height: '25%',
											width: '100%',
											textAlign: 'center',
											textAlignVertical :'center',
											fontSize: 14,
											color: '#000'
									}}>
										{'Responder: '+item.responder}
									</Text>
									<Text style ={{
											height: '25%',
											width: '100%',
											textAlign: 'center',
											textAlignVertical :'center',
											fontSize: 14,
											color: '#000'
									}}>
										{'Organization: '+item.organization}
									</Text>
									<Text style ={{
											height: '25.5%',
											width: '100%',
											textAlign: 'center',
											textAlignVertical :'center',
											fontSize: 14,
											color: '#000'
									}}>
										{'ETA: '+item.ETA}
									</Text>
								</View>
							}
							keyExtractor={item => item.key}/>
					}
	    		</View>

	    		<Text style ={{
	    				height: '4.5%',
	    				top: '5%',
	    				width: '50%',
	    				position:'relative',
	    				textAlignVertical:'center',
	    				textAlign:'center',
	    				fontSize: 13,
	    				color: '#000'
	    		}}>	
	    			Estimated Time of Arrival
	    		</Text>

	    		<TextInput
	    			placeholder = 'e.g. 10 minutes'
	    			style = {{
	    				height:'9%',
	    				borderBottomWidth: 2,
	    				position:'relative',
	    				top:'5%',
	    				paddingLeft: '2%',
	    				textAlignVertical:'center'
	    			}}
	    			onChangeText={(estimateTimeInput)=>this.setState({estimateTimeInput})} />

	    		<TouchableWithoutFeedback
	    			onPress={()=>this.respondToIncident()}>
		    		<Text style ={{
		    				height: '9%',
		    				width: '40%',
		    				borderRadius: 100,
		    				top: '7%',
		    				textAlignVertical:'center',
		    				textAlign: 'center',
		    				color: '#000',
		    				fontSize: 15,
		    				borderWidth: 2,
		    				fontWeight: 'bold'
		    		}}>
		    			{ this.state.submittingRespond == true ? 
		    				'Loading' : 'Respond'}
		    		</Text>
		    	</TouchableWithoutFeedback>

	    		<Text style ={{
	    				height: '5%',
	    				position: 'absolute',
	    				top: '93%',
	    				fontSize: 15,
	    				color: '#000',
	    				textAlign:'center',
	    				textAlignVertical: 'center',
	    				fontWeight: 'bold',
	    				left:'3%'
	    		}}>
	    			<Icon
	    				style ={{fontSize:25}}
	    				name = 'arrowdown'
	    				type = 'AntDesign'/>
	    		</Text>
	    	</View>
		);
	}
}