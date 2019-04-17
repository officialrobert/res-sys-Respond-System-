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
import {Icon}    from 'native-base';
import geolib    from 'geolib';
import Constants from '../commons/Constants.js';


export default class IncidentList extends Component{

	state = {
		allReports: []
	}

	componentDidMount(){
		this.getAllReports();
	}

	reverseArray = (array)=>{
		if(array.length==0){
			this.setState({allReports:[]});
			return;
		}
		else{
			const reverseArrayReports = [];
			for(index=(array.length-1);index>=0;index--){
				reverseArrayReports.push(array[index]);
			}
			this.setState({allReports:reverseArrayReports});
		}
	}

	getAllReports = ()=>{
		this.props.FirebaseObject
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
					this.reverseArray(initAllReports);
				}	
			});
	}

	getGapDistance = (longitude,latitude)=>{
		if(this.props.doGetMylocation.latitude){
			return 	Number(geolib.getDistance(
				     	{latitude: Number(this.props.doGetMylocation.latitude), 
					    	longitude: Number(this.props.doGetMylocation.longitude) },
					    {latitude: Number(latitude), 
					    	longitude: Number(longitude) }))/1000 + 'kms from your location';
		}
		else return 'Getting location.. A moment..'
	}

	viewReportDetails = (report)=>{
		this.props.doSetReportDetails(report);
		this.props.doSetHomePage(Constants.RESPONDER_PAGE.INCIDENT_DETAILS);
	}

	displayAllReportInList = ()=>{
		if(this.state.allReports.length!=0){
			return 	<FlatList
		            	data= {this.state.allReports}
		            	renderItem={({item}) =>
							( item.reportStatus == Constants.REPORT_STATUS.RESOLVED ? 
									<React.Fragment></React.Fragment> :
									<View style={{
											height: 158,
											width: '90%',
											left: '5%',
											position: 'relative',
											borderWidth: 1.2,
										    borderRadius: 2,
										    borderColor: '#ddd',
										    borderBottomWidth: 0,
										    shadowColor: '#000',
										    shadowOffset: {
												width: 0,
												height: 5,
											},
											shadowOpacity: 0.34,
											shadowRadius: 6.27,
											elevation: 10,
										    backgroundColor: '#fff',
										    top: '0%',
										    marginBottom:15,
										    marginTop: 10,
										    paddingLeft:'1.5%'
									}}>
										<Text style={{
												height:'12%',
												width:'100%',
												flexDirection: 'row',
												position: 'relative',
												fontSize: 14,
												fontWeight: 'bold'
										}}>
											{item.timeReported}
										</Text>
										<Text style={{
												height:'12%',
												width:'100%',
												flexDirection: 'row',
												position: 'relative',
												fontSize: 14,
												fontWeight: 'bold'
										}}>
											Reporter: {item.reporter}
										</Text>
										<Text style={{
												height:'12%',
												width:'100%',
												flexDirection: 'row',
												position: 'relative',
												fontSize: 14,
												fontWeight: 'bold'
										}}>
											Incident: {item.incidentType}
										</Text>
										<Text style={{
												height:'12%',
												width:'100%',
												flexDirection: 'row',
												position: 'relative',
												fontSize: 14,
												fontWeight: 'bold'
										}}>
											Status: { item.reportStatus == Constants.REPORT_STATUS.UNRESOLVED ?
												'Unresolved': 'Waiting for authority'}
										</Text>
										<Text style={{
												height:'12%',
												width:'100%',
												flexDirection: 'row',
												position: 'relative',
												fontSize: 14,
												fontWeight: 'bold'
										}}>
											Distance: {this.getGapDistance(item.userLongitude,
												item.userLatitude)}
										</Text>
										<TouchableWithoutFeedback
											onPress={()=>this.viewReportDetails(item)}>
											<Text style={{
													top: '7.5%',
													borderWidth:2,
													borderRadius: 100,
													height: '23%',
													width: '30%',
													left: '68%', 
													position: 'relative',
													textAlignVertical: 'center',
													textAlign: 'center',
													borderColor: '#000'
											}}>
												View More
											</Text>
										</TouchableWithoutFeedback>
									</View>
							)
						}
						keyExtractor={item => item.key}/>
		}
		else{
			return 	<Text style={{
							height: '6%',
							width: '100%',
							top: '20%',
							position: 'relative',
							textAlign: 'center',
							textAlignVertical: 'center',
							fontSize: 16,
							fontWeight: 'bold'
					}}>
						Getting Incident Records..
					</Text>
		}
	}

	render() {
	    return (
	    	<View style={{
	    			height: '100%',
	    			width: '100%',
	    			alignItems: 'center',
	    			backgroundColor: '#f2f3f4'
	    	}}>
	    		<View style={{
	    			height: '9%',
	    			width: '100%',
	    			position: 'relative',
	    			backgroundColor: '#88ef92',
	    			top: '0%',
	    			flexDirection: 'row',
	    			marginBottom: 15
	    		}}>
	    			<Text style={{
	    					width:'80%',
	    					height: '100%',
	    					position:'relative',
	    					textAlign: 'center',
	    					textAlignVertical: 'center',
	    					left: '80%',
	    					fontWeight: 'bold',
	    					fontSize: 16
	    			}}>
	    				INCIDENT LIST
	    			</Text>
	    		</View>

	    		<View style={{
	    				height:'87.5%',
	    				width:' 100%',
	    				position: 'relative',
	    				backgroundColor: '#f2f3f4',
	    				justifyContent: 'center'
	    		}}>
	    			{this.displayAllReportInList()}
	    		</View>

	    	</View>
	    );
	}
}