const Constants = {
	USER_ROLES                  : {
		CIVILIAN                : 'CIVILIAN',
		RESPONDER               : 'RESPONDER',
		DEFAULT                 : 'DEFAULT',
		NOT_CHOSEN_ROLE_COLOR   : '#929293',
		CHOSEN_ROLE_COLOR       : '#000',
		CIVILIAN_CONTENT        : `Bystanders gives report in general about nearby or occuring incidents.\nBecome part of the growing and helping community now!`,
		RESPONDER_CONTENT       : `Responders are given privileges to validate incidents and able to provide assitance to those who needs help.\nBecome part of the growing and helping community now!`
	},
	CIVILIAN_PAGE               : {
		MAIN_PAGE               : 'MAIN_PAGE',
	},
	ACCOUNT_STATUS              : {
		BLOCKED                 : 'BLOCKED',
		NOT_BLOCKED             : 'NOT_BLOCKED'
	},
	COMMON_PAGE                 : {
		USER_INFO_PAGE          : 'USER_INFO_PAGE',
		CHANGE_PASS_PAGE        : 'CHANGE_PASS_PAGE',
		MORE_PAGE               : 'MORE_PAGE',
		PHONE_NUMBER            : 'PHONE_NUMBER'
	},

	CIVILIAN_MAIN_PAGE          : {
		REPORT_PAGE             : 'REPORT_PAGE',
		DEFAULT_PAGE            : 'DEFAULT_PAGE',
	},

	RESPONDER_PAGE              : {
		MAIN_PAGE               : 'MAIN_PAGE',
		LIST_PAGE               : 'LIST_PAGE',
		INCIDENT_DETAILS        : 'INCIDENT_DETAILS',
		RESOLVE_PAGE            : 'RESOLVE_PAGE',
		RESPONDING_LIST         : 'RESPONDING_LIST'
	},

	RESPONDER_MAIN_PAGE         : {
		DEFAULT_PAGE            : 'DEFAULT_PAGE',
	},
	
	CALL_SIGN_STATUS            : {
		TAKEN                   : 'TAKEN',
		NOT_TAKEN               : 'NOT_TAKEN'
	},

	REPORT_STATUS               : {
		UNRESOLVED              : 'UNRESOLVED',
		RESOLVED                : 'RESOLVED',
		WAITING_FOR_AUTHORITY   : 'WAITING_FOR_AUTHORITY'
	},

	PAGES                       : {
		LOGIN_PAGE              : 'LOGIN_PAGE',
		SIGN_UP_PAGE            : 'SIGN_UP_PAGE',
		SIGN_UP_PAGE_2          : 'SIGN_UP_PAGE_2',
		WELCOME_PAGE            : 'WELCOME_PAGE',
		LOADING_PAGE            : 'LOADING_PAGE',
		HOME_PAGE               : 'HOME_PAGE',
		RESPONDER_PAGE          : 'RESPONDER_HOME_PAGE',
		CIVILIAN_PAGE           : 'CIVILIAN_HOME_PAGE'
	},  

	LOADING_MESSAGES            : {
		SPLASH_SCREEN           : 'HELLO USER! WELCOME TO THE Res-Sys APPLICATION',
		OFFLINE                 : 'Offline: Please check on your internet service provider',
		GETTING                 : 'Getting Connection. Please Wait...',
		LOGGING_IN              : 'Getting your account, a moment..',
		LOGGING_OUT             : 'Logging you out, a moment..',
		SUBMIT_REPORT           : 'Submitting your report. Please Wait...',
		RESOLVE_REPORT          : 'Resolving report, a moment..'
	},

	SIGNUP_FORMS                : {
		USERNAME_MAX_LENGTH     : 25,
		USERNAME_MIN_LENGTH     : 8,
		PASSWORD_MAX_LENGTH     : 25,
		PASSWORD_MIN_LENGTH     : 8,
		EMAIL_MAX_LENGTH        : 40,
		FULLNAME_MAX_LENGTH     : 45,
		HOME_ADDRESS_MAX_LENGTH : 50,
		PHONE_NUMBER_MAX_LENGTH : 11,
		GROUP_MAX_LENGTH        : 35,
		CALL_SIGN_MAX_LENGTH    : 30,
		ERROR_TIME_DISPLAY      : 4000,
		BIRTHDAY_MAX_LENGTH     : 10,
		MINIMUM_AGE_SIGN        : 15
	},

	CACHE_ACCOUNT               : 'RES_SYS_ACCOUNT_CACHE',
	CONSOLE_TIME_DISPLAY        : 4000,
	MSG_REPORT_MAX_LENGTH       : 45,
	INCIDENT_TYPE_MAX_LENGTH    : 45,
	REPORT_REMARKS_MAX_LENGTH   : 45,

	
	FIRE_BASE_CONFIG            : {
		apiKey                  : "AIzaSyAUFpo4C2jL_ABEAQUJXkHXNwOCc4IMFT8",
	    authDomain              : "resys-respondsystem.firebaseapp.com",
	    databaseURL             : "https://resys-respondsystem.firebaseio.com",
	    projectId               : "resys-respondsystem",
	    storageBucket           : "resys-respondsystem.appspot.com",
	    messagingSenderId       : "208216134504"
	},

	INITIAL_ROUTE               : {
		LATITUDE                : '14.565391',
		LONGITUDE               : '121.045801'
	},

	UPLOAD_PHOTO_OPTIONS        : {
  		title                   : 'Select Avatar',
  		storageOptions          : {
    		skipBackup          : true,
    		path                : 'images'
  		},
  		quality                 : 0.6,
  		maxWidth                : 500, 
  		maxHeight               : 450.
	},

	UPLOAD_IMAGE_LOG        : {
		NO_IMAGE : 'No image is selected',
		ERROR    : 'Invalid image type',
		EXCEED   : 'Image file size exceeds limit',
		SUCCESS  : 'One image selected'
	},
	IMAGE_FILE_SIZE_LIMIT : 10000000, // 10MB for firebase,
	DEFAULT_IMG_TYPE      : 'image/jpg'
}; 


export default Constants;

