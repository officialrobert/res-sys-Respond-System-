import React, {Component} from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage, 
	Image,
	TextInput,
	TouchableWithoutFeedback,
	FlatList,
	ScrollView} 
	from 'react-native';
import {Icon}      from 'native-base';
import {Marker}    from  'react-native-maps';
import MapView     from  'react-native-maps';
import Constants   from '../commons/Constants.js';
const  bystanderIcon  = require('../img/map-icon/userIcon.png');
const  centerIcon     = require('../img/map-icon/centerIcon.png');

export default class DefaultPage extends Component{

	state = {
		allReports              : [],
		centerCoords            : [],
		tracksViewChangesUsers  : true,
		tracksViewChangesCenter : true,
		tracksViewChangesReport : true,
		pinMapContentShow       : false,
		loadingContentData      : true,
		respondingList          : [],
		pressedIncidentDetails  : {},
		firebaseReportObject    : ''
	}

	componentDidMount(){
		this.getAllReports();
		this.getLocationCenterFocus();
	}


	componentWillUnmount(){
		this.props.FirebaseObject
			.database()
			.ref("Reports")
			.off("value",this.state.firebaseReportObject);
	}

	onLoadUsersLocationImage = ()=>{
		if(bystanderIcon){
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
												});
											this.setState({allReports:initAllReports});
										}
									});
		this.setState({firebaseReportObject:firebaseKey});
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
							return 	<Marker
										onPress = {()=>this.getContentInCloud(report)}
										tracksViewChanges = {this.state.tracksViewChangesReport}
								      	coordinate={{latitude:report.userLatitude,
								      		longitude:report.userLongitude}}
								      	title={report.incidentType}
								      	key  ={report.key}
								      	description={report.reportInfo}/>
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
				      	title={'Hello bystander!'}
				      	description={'Here is your location'}>

				      	<Image
				      		onLoad={this.onLoadUsersLocationImage} 
				      		source={bystanderIcon}
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

	getContentInCloud = (report)=>{
		this.setState({
			pinMapContentShow      : true,
			respondingList         : [],
			pressedIncidentDetails : report,
			loadingContentData     : true
		});

		this.props.FirebaseObject
			.database()
			.ref("Reports/"+String(report.key))
			.once("value",snapshot=>{
				if(snapshot.exists()){
					const currentData = JSON.parse(JSON.stringify(snapshot.val()));
				 	if(currentData.responding){
				 		const allCurrentResponding = JSON.parse(JSON.stringify(currentData.responding));
				 		const initRespondingList = [];
				 		Object
				 			.keys(allCurrentResponding)
				 			.forEach((resKey)=>{
				 				initRespondingList.push(allCurrentResponding[resKey]);
				 			});
				 		this.setState({respondingList:initRespondingList});
				 	}
					this.setState({loadingContentData:false});
				}
			});	

	}

	closePinMapContent = ()=>{
		this.setState({
			pinMapContentShow      : false,
			respondingList         : [],
			pressedIncidentDetails : {},
			loadingContentData     : true
		});
	}

	displayPinMapContent = ()=>{
		if(this.state.pinMapContentShow){
			return 	<View style = {{
		    				position: 'absolute',
		    				height: '55%',
		    				borderRadius: 15,
		    				width: '78%',
		    				top: '20%',
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
			    		{	this.state.loadingContentData == true ?
			    			<Text style ={{
				    				height: '20%',
				    				fontSize: 15,
				    				width: '90%',
				    				textAlignVertical:'center',
				    				textAlign:'center',
				    				color: '#000',
				    				top: '40%'
				    		}}>
				    			Loading data, a moment..
				    		</Text> : 
				    		<React.Fragment>
				    			<ScrollView
				    				style ={{width:'100%'}}
				    				contentContainerStyle={{
				    					alignItems:'center',
				    					paddingBottom:40,
				    					marginTop:20}}>
					    			<Text style ={{
					    					height: 23,
					    					width: '100%',
					    					textAlign: 'center',
					    					textAlignVertical:'center',
					    					fontSize:14,
					    					color: '#000',
					    					fontWeight: 'bold'
					    			}}>	
					    				Incident Details
					    			</Text>
					    			<Text style ={{
					    					height: 46.7,
					    					width: '100%',
					    					textAlign: 'center',
					    					textAlignVertical:'center',
					    					fontSize:12,
					    					color: '#000'
					    			}}>	
					    				{'Address: '+String(this.state.pressedIncidentDetails.addressName)}
					    			</Text>
					    			<Text style = {{
					    					height:35,
					    					width: '100%',
					    					textAlignVertical: 'center',
					    					textAlign:'center',
					    					fontSize:12,
					    					color: '#000'
					    			}}>
					    				{'Time reported: '+String(this.state.pressedIncidentDetails.timeReported)}
					    			</Text>
					    			<Text style = {{
					    					height:19,
					    					width: '100%',
					    					textAlignVertical: 'center',
					    					textAlign:'center',
					    					fontSize:12,
					    					fontWeight: 'bold',
					    					color: '#000'
					    			}}>
					    				{'Incident: '+String(this.state.pressedIncidentDetails.incidentType)}
					    			</Text>
					    			<Text style = {{
					    					height:20,
					    					width: '100%',
					    					textAlignVertical: 'center',
					    					textAlign:'center',
					    					fontSize:12,
					    					fontStyle: 'italic',
					    					color: '#000'
					    			}}>
					    				Incoming Responders:
					    			</Text>
					    			<View style ={{
											height: '50%',
											width:'100%',
											position:'relative',
											alignItems:'center'
									}}>	
					    				{this.displayResponding()}
				    				</View>
					    		</ScrollView>
				    		</React.Fragment>
				    	}
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
		    		</View>;
		}
		else return;
	}


	displayResponding = ()=>{
		if(this.state.respondingList.length!=0){
			return	<FlatList
						data = {this.state.respondingList}
						renderItem = {({item}) =>
							<View style = {{
									height:65,
									borderBottomWidth:2,
									width:253,
									position:'relative',
									marginBottom: 15,
									marginTop: 10
							}}>
								<Text style = {{
										height: '24.4%',
										position:'relative',
										width: '90%',
										textAlignVertical:'center',
										textAlign:'center',
										fontSize: 13,
										color: '#000'
								}}>
									{'Responder: '+item.responder}
								</Text>
								<Text style = {{
										height: '24.4%',
										position:'relative',
										width: '90%',
										textAlignVertical:'center',
										textAlign:'center',
										fontSize: 13,
										color: '#000'
								}}>
									{'Organization: '+item.organization}
								</Text>
								<Text style = {{
										height: '24.4%',
										position:'relative',
										width: '90%',
										textAlignVertical:'center',
										textAlign:'center',
										fontSize: 13,
										color: '#000'
								}}>
									{'ETA: '+item.ETA}
								</Text>
							</View>
						}
						keyExtractor={item => item.key}/>;
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

	    		<View style={{
	    				position: 'absolute',
	    				width: 70,
	    				height: 70,
	    				top: '85%',
	    				left: '75%',
	    				borderRadius: 100,
	    				backgroundColor: '#88ef92',
	    				borderColor: '#000'
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.props.setBystanderMainOperation(Constants.CIVILIAN_MAIN_PAGE.REPORT_PAGE)}>
		    			<Text style={{
		    					width: '100%',
		    					height: '100%',
		    					position: 'relative',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					fontSize: 11,
		    					fontWeight: 'bold',
		    					color: '#000'
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize:25,
		    						width:'100%'
		    					}}
		    					name='add-box'
		    					type='MaterialIcons'/>{'\n'}
		    					Report
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>
	    		{this.displayPinMapContent()}
	    	</View>	
	    );
	}
}