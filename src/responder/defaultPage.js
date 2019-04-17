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
import {Marker}    from 'react-native-maps'; 
import MapView     from 'react-native-maps';
import Constants   from '../commons/Constants.js';
import geolib      from 'geolib';

const  responderIcon  = require('../img/map-icon/userIcon.png');
const  centerIcon     = require('../img/map-icon/centerIcon.png');

export default class DefaultPage extends Component{

	state = {
		allReports              : [],
		centerCoords            : [],
		nearbyFlag              : false,
		tracksViewChangesUsers  : true,
		tracksViewChangesCenter : true,
		tracksViewChangesReport : true,
		pinMapContentShow       : false,
		pressedReportDetails    : {},
		firebaseReportObject    : '',
		firebaseAccountObject   : '',
		respondingDetails       : {}
	}

	cancelResponding = ()=>{
		this.props.doDisplayAlertMessage('Cancelling respond to the incident, a moment..');
		this.props.FirebaseObject
			.database()
			.ref("Reports/"
				+String(this.state.respondingDetails.reportKey)
				+"/responding/"
				+String(this.state.respondingDetails.key))
			.remove()
			.then(()=>{
				this.props.FirebaseObject
					.database()
					.ref("Accounts/"
						+String(this.props.doGetLoggedAccount.key)
						+"/responding")
					.remove()
					.then(()=>{
						this.props.doDisplayAlertMessage('Done');
						setTimeout(()=>{
							this.props.doDisplayAlertMessage('');
						},Constants.CONSOLE_TIME_DISPLAY);
					});
			})
			.catch((error)=>{
				this.props.doDisplayAlertMessage('Error connecting to the server');
				setTimeout(()=>{
					this.props.doDisplayAlertMessage('');
				},Constants.CONSOLE_TIME_DISPLAY);
			});
	}

	getCurrentAccount = ()=>{
		const accountKey = 	this.props.FirebaseObject
								.database()
								.ref("Accounts/"+String(this.props.doGetLoggedAccount.key))
								.on("value",snapshot=>{
									if(snapshot.exists()){
										const accountDetails      = JSON.parse(JSON.stringify(snapshot.val()));
										let initRespondingDetails = {};
										if(accountDetails.responding){
											initRespondingDetails = JSON.parse(JSON.stringify(accountDetails.responding));
										}
										else initRespondingDetails = {};
										this.props.doSetLoggedAccount(accountDetails);
										this.setState({respondingDetails:initRespondingDetails});
									}
								});
		this.setState({firebaseAccountObject:accountKey});
	}

	getAllReports = ()=>{
		const firebaseKey = 	this.props.FirebaseObject
									.database()
									.ref("Reports")
									.on("value",snapshot=>{
										if(snapshot.exists()){
											const allDatabaseReports = JSON.parse(JSON.stringify(snapshot.val()));
											const initAllReports     = [];
											Object
												.keys(allDatabaseReports)
												.forEach((reportKey)=>{
													initAllReports.push(allDatabaseReports[reportKey]);
													if(allDatabaseReports[reportKey].reportStatus
														== Constants.REPORT_STATUS.UNRESOLVED && this.state.nearbyFlag == false){
														this.setState({nearbyFlag:true});
													}
												});
											this.setState({allReports:initAllReports});
										}
									});
		this.setState({firebaseReportObject:firebaseKey});
	}

	getLocationCenterFocus = ()=>{
		this.props.FirebaseObject
			.database()
			.ref("Center")
			.once("value",snapshot=>{
				if(snapshot.exists()){
					const initCenterCoordinates = JSON.parse(JSON.stringify(snapshot.val()));
					this.setState({centerCoords:initCenterCoordinates});
				}
			});

	}

	componentDidMount(){
		this.getAllReports();
		this.getLocationCenterFocus();
		this.getCurrentAccount();
	}

	componentWillUnmount(){
		this.props.FirebaseObject
			.database()
			.ref("Reports")
			.off("value",this.state.firebaseReportObject);
		this.props.FirebaseObject
			.database()
			.ref("Accounts/"+String(this.props.doGetLoggedAccount.key))
			.off("value",this.state.firebaseAccountObject);
	}


	onLoadUsersLocationImage = ()=>{
		if(responderIcon){
			setTimeout(()=>{
				this.setState({tracksViewChangesUsers:false});
			},1500);
		}
	}

	onLoadCenterLocationImage = ()=>{
		if(centerIcon){
			setTimeout(()=>{
				this.setState({tracksViewChangesCenter:false});
			},1500);
		}
			
	}

	onLoadReportIcon = ()=>{
		if(this.props.doGetEmergencyIcon){
			setTimeout(()=>{
				this.setState({tracksViewChangesReport:false});
			},1500);
		}
	}


	displayCenterLocation = ()=>{
		if(this.state.centerCoords.length!=0){
		 	return 	<Marker
				      	coordinate={{latitude:this.state.centerCoords.latitude,
				      		longitude:this.state.centerCoords.longitude}}
			      		tracksViewChanges = {this.state.tracksViewChangesCenter}
				      	title={'Center Location'}
				      	description={String(Number(this.state.centerCoords.radius)/1000)+
				      		'kms. around this center is accepted'}>

				      	<Image
				      		onLoad={this.onLoadCenterLocationImage} 
				      		source={centerIcon}
				      		style={{height:40,width:40}}/>
				    </Marker>
		}
		else return;
	}


	displayMarker = ()=>{
		markers =	this.state.allReports.map(report => {
						if(report.reportStatus == Constants.REPORT_STATUS.UNRESOLVED){
							if(this.state.respondingDetails.reportKey){
								if(String(this.state.respondingDetails.reportKey) == 
									String(report.key)){
									return 	<Marker
												onPress={()=>this.navigateToIncidentDetails(report)}
												tracksViewChanges = {this.state.tracksViewChangesReport}
										      	coordinate={{latitude:report.userLatitude,
										      		longitude:report.userLongitude}}
										      	title={report.incidentType}
										      	key  ={report.key}
										      	description={report.reportInfo}/>;
								}
							}
							else{ 
								return 	<Marker
											onPress={()=>this.navigateToIncidentDetails(report)}
											tracksViewChanges = {this.state.tracksViewChangesReport}
									      	coordinate={{latitude:report.userLatitude,
									      		longitude:report.userLongitude}}
									      	title={report.incidentType}
									      	key  ={report.key}
									      	description={report.reportInfo}/>;
					      	}
						}	
			  		});
		return markers;
	}

	displayUsersLocation = ()=>{
		if(this.props.doGetMylocation.latitude){
			return	<Marker
				      	coordinate={{latitude:this.props.doGetMylocation.latitude,
				      		longitude:this.props.doGetMylocation.longitude}}
			      		tracksViewChanges = {this.state.tracksViewChangesUsers}
				      	title={'Hello responder!'}
				      	description={'Here is your location'}>

				      	<Image
				      		onLoad={this.onLoadUsersLocationImage} 
				      		source={responderIcon}
				      		style={{height:45,width:45}}/>
				    </Marker>
		}
		else return;
	}

	displayMap = ()=>{
		if(this.props.doGetMylocation.latitude){
			return	<MapView style = {{height:'100%',width: '100%'}}
						provider={MapView.PROVIDER_GOOGLE}
			            region = {{
			                latitude: this.props.doGetMylocation.latitude,
			                longitude: this.props.doGetMylocation.longitude,
			                latitudeDelta: 0.0922*0.8,
			                longitudeDelta: 0.0421*0.8,
		                }}>
		             	{this.displayUsersLocation()}
		             	{this.displayCenterLocation()}
		             	{this.displayMarker()}
        			</MapView>
		}
		else{
			return	<Text style={{
							height: '9%',
							width: '100%',
							top: '40%',
							fontSize: 17,
							fontWeight: 'bold',
							textAlign: 'center'
					}}>
						Getting your location.. A moment..
					</Text>
		}
	}

	displayAlertForEmergency = ()=>{
		if(this.state.nearbyFlag == true){
			return 	<Text style={{
	    					height:'9%',
	    					top: '6%',
	    					width:'60%',
	    					position: 'absolute',
	    					left: '20.3%',
	    					fontWeight: 'bold',
	    					fontSize: 14,
	    					color: '#000',
	    					textAlign: 'center',
	    					textAlignVertical: 'center',
	    					borderRadius: 20,
	    					backgroundColor: '#c6311d'
	    			}}>
	    				MESSAGE: EMERGENCY ALERT
	    			</Text>
		}
		else return;
	}

	navigateToIncidentDetails = (report)=>{
		this.props.doSetReportDetails(report);
		this.setState({
			pinMapContentShow:true,
			pressedReportDetails:report
		});
	}

	closePinMapContent = ()=>{
		this.setState({
			pinMapContentShow:false,
			pressedReportDetails:{}
		})
	}

	displayPinMapContent = ()=>{
		if(this.state.pinMapContentShow){
			return 	<View style = {{
		    				position: 'absolute',
		    				height: '40%',
		    				borderRadius: 15,
		    				width: '70%',
		    				top: '27%',
		    				backgroundColor: '#fff',
		    				alignItems: 'center',
		    				borderColor: '#ddd',
						    borderBottomWidth: 0,
						    shadowColor: '#000',
						    shadowOffset: {
								width: 0,
								height: 5,
							},
							shadowOpacity: 0.34,
							shadowRadius: 3.27,
							elevation: 10
		    		}}>
		    			<Text style = {{
		    					height: '10.5%',
		    					width:'95%',
		    					fontSize:14,
		    					fontWeight: 'bold',
		    					textAlignVertical:'center',
		    					textAlign: 'center',
		    					top: '5%',
		    					color: '#000'
		    			}}>
		    				Incident Details
		    			</Text>
		    			<Text style = {{
		    					height: '23%',
		    					width:'95%',
		    					fontSize:13,
		    					textAlignVertical:'center',
		    					textAlign: 'center',
		    					top: '5%',
		    					color: '#000'
		    			}}>
		    				{'Address: '+String(this.state.pressedReportDetails.addressName)}
		    			</Text>
		    			<Text style = {{
		    					height: '10%',
		    					width:'95%',
		    					fontSize:13,
		    					textAlignVertical:'center',
		    					textAlign: 'center',
		    					top: '5%',
		    					color: '#000',
		    					fontStyle: 'italic',
		    					fontWeight:'bold'
		    			}}>
		    				{'Incident: '+String(this.state.pressedReportDetails.incidentType)}
		    			</Text>

		    			<TouchableWithoutFeedback
		    				onPress={()=>this.props.doSetHomePage(Constants.RESPONDER_PAGE.INCIDENT_DETAILS)}>
			    			<Text style = {{
			    					height: '20%',
			    					width:'40%',
			    					fontSize:16,
			    					textAlignVertical:'center',
			    					textAlign: 'center',
			    					top: '5%',
			    					color: '#000',
			    					fontWeight: 'bold',
			    					top: '22%',
			    					borderWidth:2
			    			}}>
			    				View
			    			</Text>
			    		</TouchableWithoutFeedback>

		    			<TouchableWithoutFeedback
		    				onPress={()=>this.closePinMapContent()}>
			    			<Text style = {{
			    					height: '10%',
			    					width: '12%',
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					fontSize: 15,
			    					fontWeight:'bold',
			    					color: '#000',
			    					position: 'absolute',
			    					left: '3%',
			    					top: '1.5%'
			    			}}>
			    				<Icon 
			    					style ={{fontSize:20,color:'#88ef92'}}
			    					name = 'close'
			    					type = 'FontAwesome'/>
			    			</Text>
			    		</TouchableWithoutFeedback>
		    		</View>
    	}
    	else return;
	}

	respondingToContent = ()=>{
		if(this.props.doGetLoggedAccount.responding){
			return 	<React.Fragment>
						<View style = {{
		    					height:105,
		    					width:'65%',
		    					left: '20%',
		    					top: '73%',
		    					position:'absolute',
		    					backgroundColor: '#fff',
		    					backgroundColor: '#fff',
			    				borderColor: '#ddd',
							    borderBottomWidth: 0,
							    shadowColor: '#000',
							    shadowOffset: {
									width: 0,
									height: 5,
								},
								shadowOpacity: 0.34,
								shadowRadius: 3.27,
								elevation: 9,
								borderRadius: 15,
								alignItems:'center'
		    			}}>
		    				{
		    					!this.state.respondingDetails.reportKey ? 
		    					<Text style = {{
			    						height: '20%',
			    						width: '90%',
			    						fontSize: 13,
			    						color: '#000',
			    						top: '30%',
			    						textAlign: 'center',
			    						textAlignVertical :'center'
			    				}}>
			    					Loading data, a moment..
			    				</Text>:
		    					<React.Fragment>
		    						<Text style ={{
		    								height: '15.4%',
		    								width:'90%',
		    								textAlignVertical:'center',
		    								textAlign: 'center',
		    								fontSize: 13,
		    								color: '#000',
		    								top: '2%',
		    								position: 'relative'
		    						}}>
		    							{'Reporter: '+this.state.respondingDetails.reporter}
		    						</Text>
		    						<Text style ={{
		    								height: '15.4%',
		    								width:'90%',
		    								textAlignVertical:'center',
		    								textAlign: 'center',
		    								fontSize: 13,
		    								color: '#000',
		    								top: '2%',
		    								position: 'relative',
		    								fontStyle: 'italic'
		    						}}>
		    							{'Incident: '+this.state.respondingDetails.incidentType}
		    						</Text>
		    						<TouchableWithoutFeedback
		    							onPress = {()=>this.cancelResponding()}>
			    						<Text style = {{
			    								height: '33%',
			    								width: '43%',
			    								position: 'relative',
			    								textAlign:'center',
			    								textAlignVertical:'center',
			    								fontSize: 15.3,
			    								fontWeight:'bold',
			    								borderRadius: 100,
			    								borderWidth: 2,
			    								top: '20%',
			    								color: '#000'
			    						}}>
			    							Cancel
			    						</Text>
			    					</TouchableWithoutFeedback>
		    					</React.Fragment>
			    			}
		    			</View>
		    			<Text style = {{
		    					height: 65,
		    					width: 65,
		    					position:'absolute',
		    					left: '77%',
		    					top: '83%',
		    					fontSize: 10.4,
		    					textAlignVertical:'center',
		    					textAlign: 'center',
		    					fontWeight:'bold',
		    					color: '#000',
		    					borderRadius: 100,
		    					backgroundColor: '#fff',
			    				borderColor: '#ddd',
							    borderBottomWidth: 0,
							    shadowColor: '#000',
							    shadowOffset: {
									width: 0,
									height: 5,
								},
								shadowOpacity: 0.34,
								shadowRadius: 5.27,
								elevation: 10
		    			}}>
		    				Responding
		    			</Text>
					</React.Fragment>
		}
		else return;
	}

	render() {
	    return (
	    	<View style={{
	    			height: '100%',
	    			width: '100%',
	    			alignItems: 'center'
	    	}}>	
	    		<View style={{
	    			height: '100%',
	    			width: '100%',
	    			position: 'relative'
	    		}}>
	    			{this.displayMap()}
	    		</View>

	    		{this.displayAlertForEmergency()}
    			<Text style={{
    					width: '16.7%',
    					height: '11%',
    					top:'5%',
    					position: 'absolute',
    					textAlign: 'center',
    					textAlignVertical: 'center',
    					fontSize: 11,
    					left: '80%',
    					backgroundColor: (this.state.nearbyFlag == false ?
    						'#88ef92' : '#c6311d' ),
    					fontWeight: 'bold',
    			}}>
    				<Icon
    					style={{
    						fontSize:25,
    						width:'100%'
    					}}
    					name='alarm-light'
    					type='MaterialCommunityIcons'/>{'\n'}
    					Alarm
    			</Text>

    			{this.displayPinMapContent()}
    			{this.respondingToContent()}
	    	</View>
	    );
	}
}