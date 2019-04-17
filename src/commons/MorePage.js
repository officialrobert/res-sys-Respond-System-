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

export default class MorePage extends Component{
	
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
	    			backgroundColor: '#88ef92'
	    		}}>

	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				height: '15%',
	    				width:'100%',
	    				top: '5%',
	    				flexDirection: 'row',
	    				justifyContent:'center',
	    				alignItems:'center'
	    		}}>
	    			<Text style={{
	    					width: '24%',
	    					height: '100%',
	    					position: 'relative',
	    					paddingTop: '4.5%',
	    					textAlign: 'center',
	    					textAlignVertical : 'center',
	    					backgroundColor : '#454647'
	    			}}>
	    				<Icon
	    					style={{
	    						fontSize:50,
	    						color: '#fff'
	    					}}
	    					name='user'
	    					type='FontAwesome'/>
	    			</Text>
	    			<Text style={{
	    					width: '70%',
	    					height: '100%',
	    					paddingLeft: '3%',
	    					fontSize: 16,
	    					fontWeight: 'bold',
	    					textAlignVertical: 'center',
	    					textAlign: 'center'
	    			}}>
	    				Res-Sys Message: Hello user, you may view and update your account information in this section
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '4%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%'
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '70%',
	    					left: '50%',
	    					fontSize: 14,
	    					textAlignVertical:'center'
	    			}}>
	    				ACCOUNT AND SUPPORT
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.props.doLogoutAccount()}>
		    			<Text style={{
		    					height: '100%',
		    					width: '70%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
		    					textAlignVertical: 'center'
		    			}}>
		    				Logout Account
		    			</Text>
		    		</TouchableWithoutFeedback>

	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '70%',
	    					left: '35%',
	    					fontSize: 20,
	    					fontWeight: 'bold',
	    					textAlignVertical: 'center'
	    			}}>
	    				Report a Problem
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '70%',
	    					left: '35%',
	    					fontSize: 20,
	    					fontWeight: 'bold',
	    					textAlignVertical: 'center'
	    			}}>
	    				Legal Policies
	    			</Text>

	    		</View>

	    		<View style={{
	    				height: '4%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%'
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '70%',
	    					left: '50%',
	    					fontSize: 14,
	    					textAlignVertical: 'center'
	    			}}>
	    				YOUR PROFILE
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback 
	    				onPress={()=>this.props.doSetHomePage(Constants.COMMON_PAGE.CHANGE_PASS_PAGE)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '70%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
	    						textAlignVertical: 'center'
		    			}}>
		    				Change Password
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback 
	    				onPress={()=>this.props.doSetHomePage(Constants.COMMON_PAGE.USER_INFO_PAGE)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '70%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
	    						textAlignVertical: 'center'
		    			}}>
		    				User Information
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback 
	    				onPress={()=>this.props.doSetHomePage(Constants.COMMON_PAGE.PHONE_NUMBER)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '70%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
	    						textAlignVertical: 'center'
		    			}}>
		    				Phone Number
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>
	    	</View>
    	);
	}
}