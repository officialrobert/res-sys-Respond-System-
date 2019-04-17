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
import ImagePicker from 'react-native-image-picker';

export default class ResolvePage extends Component{

	state = {
		inputRemarks  : '',
		imagePath     : '',
    	imageHeight   : '',
    	imageWidth    : '',
    	imageType     : '',
    	imageFileSize : '',
    	imageLog      : Constants.UPLOAD_IMAGE_LOG.NO_IMAGE,
    	imageSuccess  : false
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
				    		imageLog     : response.fileName,
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



	submitResolve = ()=>{
		this.props.FirebaseObject
			.database()
			.ref("Reports/"+String(this.props.doGetReportDetails.key)+"/reportStatus")
			.once("value",snapshot=>{
				if(snapshot.exists()){
					if(String(snapshot.val()) == Constants.REPORT_STATUS.RESOLVED){
						this.props.doDisplayAlertMessage('Already resolved');
						setTimeout(()=>{
							this.props.doSetHomePage(Constants.RESPONDER_PAGE.LIST_PAGE);
							this.props.doDisplayAlertMessage('');
						},1500);
					}
					else if(this.state.inputRemarks.length == 0 ){
						this.props.doDisplayAlertMessage('Please provide an input for your remarks');
						setTimeout(()=>{
							this.props.doDisplayAlertMessage('');
						},Constants.CONSOLE_TIME_DISPLAY);
					}
					else if(this.state.imageSuccess == false){
						this.props.doDisplayAlertMessage('Please select an image for proof');
						setTimeout(()=>{
							this.props.doDisplayAlertMessage('');
						},Constants.CONSOLE_TIME_DISPLAY);
					}
					else if(!this.props.doGetLoggedAccount.responding){
						this.props.doDisplayAlertMessage('You must respond to this incident first');
						setTimeout(()=>{
							this.props.doDisplayAlertMessage('');
						},1500);
					}
					else if(String(this.props.doGetLoggedAccount.responding.reportKey)!=String(this.props.doGetReportDetails.key)){
						this.props.doDisplayAlertMessage('You must respond to this specific incident');
						setTimeout(()=>{
							this.props.doDisplayAlertMessage('');
						},Constants.CONSOLE_TIME_DISPLAY);
					}
					else{
						const data = {
							imagePath : this.state.imagePath,
							reportKey : this.props.doGetReportDetails.key,
							remarks   : this.state.inputRemarks,
							reporter  : this.props.doGetLoggedAccount.fullName
						}
						this.props.doSubmitResolve(data);
					}
				}
			})
			.catch((error)=>{
				this.props.doDisplayAlertMessage('Error connecting to the server');
				setTimeout(()=>{
					this.props.doDisplayAlertMessage('');
				},Constants.CONSOLE_TIME_DISPLAY);
			});
	}

	resolvePageDisplay = ()=>{
		return 	<View style={{
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
		    				onPress={()=>this.props.doSetHomePage(Constants.RESPONDER_PAGE.INCIDENT_DETAILS)}>
			    			<Text style={{
			    					height: '100%',
			    					width: '10%',
			    					fontSize: 15,
			    					fontWeight: 'bold',
			    					textAlign: 'center',
			    					position: 'relative',
			    					textAlignVertical: 'center',
			    					left: '10%',
			    					color:'#000'
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

		    		<Text style={{
		    				height: '8%',
		    				fontSize: 25,
		    				fontWeight: 'bold',
		    				textAlignVertical: 'center',
		    				textAlign: 'center',
		    				position: 'relative',
		    				color:'#000'
		    		}}>
		    			Resolve Incident
		    		</Text>
		    		<Text style={{
		    				height: '5%',
		    				width: '30%',
		    				position: 'relative',
		    				top: '5%',
		    				fontSize:15,
		    				fontWeight:'bold',
		    				textAlignVertical:'center',
		    				color:'#000'
		    		}}>	
		    			Input Remarks
		    		</Text>
		    		<TextInput 
		    			style={{
		    				height: '9%',
		    				textAlignVertical:'top',
		    				width: '65%',
		    				position:'relative',
		    				borderBottomWidth:2,
		    				paddingLeft: '3%',
		    				fontSize: 14,
		    				top:'6%'
		    			}}
		    			maxLength={Constants.REPORT_REMARKS_MAX_LENGTH}
		    			placeholder = 'INPUT INCIDENT REMARKS'
		    			onChangeText={(inputRemarks)=>this.setState({inputRemarks:inputRemarks})}/>
		    		<Text style={{
		    				height:'3.9%',
		    				width:'50%',
		    				top: '8%',
		    				position: 'relative',
		    				fontSize: 12,
		    				fontWeight: 'bold',
		    				textAlignVertical: 'center',
		    				color: '#000'
		    		}}>
		    			Upload Photo
		    		</Text>
		    		<View style={{
		    				height: '12%',
		    				width:'100%',
		    				position: 'relative',
		    				top: '13%',
		    				flexDirection: 'row',
		    				justifyContent : 'space-evenly'
		    		}}>
			    		<TouchableWithoutFeedback
			    			onPress={()=>this.selectPhoto()}>
				    		<Text style={{
				    				height:'53%',
				    				width:'20%',
				    				position: 'relative',
				    				fontSize: 20,
				    				fontWeight: 'bold',
				    				borderWidth: 2,
				    				textAlign: 'center',
				    				textAlignVertical: 'center',
				    				borderColor :'#454647',
				    				borderRadius: 5,
				    				top: '4%'
				    		}}>
				    			...
				    		</Text>
				    	</TouchableWithoutFeedback>

				    	<Text style={{
				    			fontSize: 14,
				    			fontWeight: 'bold',
				    			position: 'relative',
				    			width: '44%',
				    			paddingTop: '2%',
				    			textAlign: 'center',
				    			textAlignVertical: 'center',
				    			color: '#000',
				    			height:'100%'
				    	}}>
				    		{this.state.imageLog}
				    	</Text>
				    </View>
				    <TouchableWithoutFeedback
				    	onPress = {()=>this.submitResolve()}>
			    		<Text style ={{
			    				height: '10%',
			    				width:'40%',
			    				position: 'relative',
			    				top: '17%',
			    				fontWeight: 'bold',
			    				borderRadius: 100,
			    				fontSize : 15,
			    				textAlign: 'center',
			    				textAlignVertical: 'center',
			    				borderWidth: 2,
			    				color: '#000'
			    		}}>
			    			Submit
			    		</Text>
			    	</TouchableWithoutFeedback>
		    	</View>
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.resolvePageDisplay()}
	    	</React.Fragment>
	    );
	}
}