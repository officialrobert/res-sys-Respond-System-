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
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker';
import Constants   from '../commons/Constants.js';
import Geocoder    from 'react-native-geocoding';
import geolib      from 'geolib';


export default class ReportPage extends Component{

	state = {
		timeReported   : '',
		imagePath      : '',
    	imageHeight    : '',
    	imageWidth     : '',
    	imageType      : '',
    	imageFileSize  : '',
    	imageLog       : Constants.UPLOAD_IMAGE_LOG.NO_IMAGE,
    	imageSuccess   : false,
    	locationFlag   : false,
    	reportInfo     : '',
    	incidentType   : '',
    	addressName    : '',
    	centerCoords   : {},
    	userLocation   : {},
    	firebaseAccountObject : ''
	}	

	componentDidMount(){
		this.getLocationCenterFocus();
		Geolocation.getCurrentPosition( (position)=>{
			
			fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+
				position.coords.latitude +
				'&lon=' +
				position.coords.longitude)
	        .then(json => {
	        	this.setState({
					userLocation : position.coords,
					locationFlag : true,
					addressName  : String(JSON.parse(json._bodyInit).display_name)
				});
	        })
	        .catch(error => console.log(error));

		}, (error) => {
			//console.log(JSON.stringify(error));
			this.setState({locationFlag:false});
		},
		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });

		let today = new Date();
		this.setState({timeReported:today.toString()});

		this.listeToUserAccount();
	}

	componentWillUnmount(){
		this.props.FirebaseObject
			.database()
			.ref("Accounts/"+String(this.props.doGetLoggedAccount.key))
			.off("value",this.state.firebaseAccountObject);
	}

	listeToUserAccount = ()=>{
		const firebaseAccountObject = 	this.props.FirebaseObject
											.database()
											.ref("Accounts/"+String(this.props.doGetLoggedAccount.key))
											.on("value",snapshot=>{
												if(snapshot.exists()){
													const updatedAccount = JSON.parse(JSON.stringify(snapshot.val()));
													this.props.doSetLoggedAccount(updatedAccount);
												}
											});
		this.setState({firebaseAccountObject:firebaseAccountObject});
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

	selectPhoto = ()=>{
		ImagePicker.showImagePicker(Constants.UPLOAD_PHOTO_OPTIONS, (response) => {
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  } else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  } else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  } else {
	    	this.setState({
		     	imagePath     : response.uri,
            	imageHeight   : response.height,
            	imageWidth    : response.width,
            	imageFileSize : response.fileSize
		    });
		    console.log(response.fileSize);
		    if(response.fileSize>Constants.IMAGE_FILE_SIZE_LIMIT){
		    	this.setState({imageLog:Constants.UPLOAD_IMAGE_LOG.EXCEED});
		    	this.setState({imageSuccess:false});
		    }
		    else{
			    if(response.type){
			    	if(response.type == 'image/jpeg' || response.type == 'jpeg' ||  
			    		response.type == 'image/jpg'){
			    		this.setState({
				    		imageType    : response.type,
				    		imageLog     : Constants.UPLOAD_IMAGE_LOG.SUCCESS,
				    		imageSuccess : true
				    	});
			    	}
			    	else{
				    	this.setState({
				    		imageType    : 'invalid',
				    		imageSuccess : false,
				    		imageLog     : Constants.UPLOAD_IMAGE_LOG.ERROR
				    	});
				    }
			    }
			    else{
			    	this.setState({
			    		imageType    : 'invalid',
			    		imageSuccess : false,
			    		imageLog     : Constants.UPLOAD_IMAGE_LOG.ERROR
			    	});
			    }
			}
		  
		  }
		});
	}


	isInsideMaximumRange = ()=>{
		const result = 	geolib.isPointInCircle(
						    {latitude: Number(this.state.userLocation.latitude), 
						    	longitude: Number(this.state.userLocation.longitude) },
						    {latitude: Number(this.state.centerCoords.latitude), 
						    	longitude: Number(this.state.centerCoords.longitude) },
						    this.state.centerCoords.radius
						);
		return result;
	}

	submitReport = ()=>{
		if(this.props.doGetLoggedAccount.accountStatus == Constants.ACCOUNT_STATUS.BLOCKED){
			this.props.doDisplayAlertMessage('Sorry, your account was blocked, send a problem');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(this.state.locationFlag == false){
			this.props.doDisplayAlertMessage('Error: We couldn\'t get your location');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(this.state.imageSuccess == false){
			this.props.doDisplayAlertMessage('Error: Select a valid photo, max upto 10MB file');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(this.state.reportInfo.length==0){
			this.props.doDisplayAlertMessage('Please fill in incident information');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(this.state.incidentType.length==0){
			this.props.doDisplayAlertMessage('Please fill in type of incident');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(this.isInsideMaximumRange() == false){
			this.props.doDisplayAlertMessage('The location is not supported by the application');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else {
			const data = {
				imagePath    : this.state.imagePath,
				userLocation : this.state.userLocation,
				incidentType : this.state.incidentType,
				reportInfo   : this.state.reportInfo,
				timeReported : this.state.timeReported,
				addressName  : this.state.addressName
			}
			this.props.doSubmitIncidentReport(data);
		}
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
	    				onPress={()=>this.props.setBystanderMainOperation(Constants.CIVILIAN_MAIN_PAGE.DEFAULT_PAGE)}>
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

	    		<View style={{
	    				height: '8%',
	    				width:'100%',
	    				position: 'relative',
	    				top: '3%'
	    		}}>	
	    			<Text style={{
	    					height: '100%',
	    					width: '100%',
	    					fontSize:20,
	    					fontWeight: 'bold',
	    					textAlign: 'center',
	    					textAlignVertical: 'center'
	    			}}>
	    				<Icon
	    					style={{
	    						color: '#454647',
	    						fontSize: 25
	    					}}
	    					name='alarm-light'
	    					type='MaterialCommunityIcons'/>
	    					{' '}INCIDENT REPORT
	    			</Text>
	    		</View>


	    		<Text style={{
	    				height:'6%',
	    				width:'70%',
	    				top: '4%',
	    				position: 'relative',
	    				fontSize: 12,
	    				fontWeight: 'bold',
	    		}}>
	    			Time and Date: {this.state.timeReported}
	    		</Text>

	    		<Text style={{
	    				height:'3.9%',
	    				width:'50%',
	    				top: '4.7%',
	    				position: 'relative',
	    				fontSize: 12,
	    				fontWeight: 'bold',
	    		}}>
	    			Message Report
	    		</Text>

	    		<TextInput
	    			style={{
	    				height: '8%',
	    				width: '60%',
	    				position: 'relative',
	    				fontSize: 12,
	    				borderBottomWidth:1,
	    				top: '5.2%',
	    				textAlignVertical: 'center',
	    				borderColor :'#454647'
	    			}}	
	    			onChangeText={(reportInfo)=>this.setState({reportInfo:reportInfo})}
	    			maxLength={Constants.MSG_REPORT_MAX_LENGTH}
	    			placeholder='INPUT ADDITIONAL INFORMATION' />

	    		<Text style={{
	    				height:'3.9%',
	    				width:'50%',
	    				top: '8%',
	    				position: 'relative',
	    				fontSize: 12,
	    				fontWeight: 'bold',
	    				textAlignVertical: 'center'
	    		}}>
	    			Upload Photo
	    		</Text>

	    		<View style={{
	    				height: '6.3%',
	    				width:'100%',
	    				position: 'relative',
	    				top: '13%',
	    				flexDirection: 'row',
	    				justifyContent : 'space-evenly'
	    		}}>
		    		<TouchableWithoutFeedback
		    			onPress={()=>this.selectPhoto()}>
			    		<Text style={{
			    				height:'100%',
			    				width:'20%',
			    				position: 'relative',
			    				fontSize: 20,
			    				fontWeight: 'bold',
			    				borderWidth: 2,
			    				textAlign: 'center',
			    				textAlignVertical: 'center',
			    				borderColor :'#454647',
			    				borderRadius: 5
			    		}}>
			    			...
			    		</Text>
			    	</TouchableWithoutFeedback>

			    	<Text style={{
			    			fontSize: 15,
			    			fontWeight: 'bold',
			    			position: 'relative',
			    			width: '40%',
			    			paddingTop: '2%',
			    			textAlign: 'center',
			    			textAlignVertical: 'center'
			    	}}>
			    		{this.state.imageLog}
			    	</Text>
			    </View>

			    <Text style={{
	    				height:'3.9%',
	    				width:'50%',
	    				top: '9.5%',
	    				position: 'relative',
	    				fontSize: 12,
	    				fontWeight: 'bold',
	    				textAlignVertical: 'center'
	    		}}>
	    			Type of Incident
	    		</Text>

	    		<TextInput
	    			style={{
	    				height: '8%',
	    				width: '60%',
	    				position: 'relative',
	    				fontSize: 12,
	    				borderBottomWidth:2,
	    				top: '10%',
	    				textAlignVertical: 'center',
	    				borderColor :'#454647'
	    			}}	
	    			onChangeText = {(incidentType)=>this.setState({incidentType:incidentType})}
	    			maxLength    = {Constants.INCIDENT_TYPE_MAX_LENGTH }
	    			placeholder  = 'INPUT TYPE OF INCIDENT' />
	    		<TouchableWithoutFeedback
	    			onPress={()=>this.submitReport()}>
		    		<Text style={{
		    				height: '9%',
		    				width: '40%',
		    				position: 'relative',
		    				top: '25%',
		    				color:'#454647',
		    				fontWeight: 'bold',
		    				borderWidth:2,
		    				textAlign: 'center',
		    				textAlignVertical: 'center'
		    		}}>
		    			SUBMIT REPORT
		    		</Text>
		    	</TouchableWithoutFeedback>
	    	</View>
	    );
	}
}