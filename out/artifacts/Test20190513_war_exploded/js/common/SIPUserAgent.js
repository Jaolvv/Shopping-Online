/**
* SIPUserAgent类，封装了SIP软电话的常用API，目前支持：
*	1、online 注册到服务器
*	2、offline 从服务器中注销
*   3、dial 拨打电话
*	4、hangup 挂断电话
*	5、软电话参数设置
*
* 作者：张倜豪
* 日期：2009-10-15
* 版权：重庆商软冠联信息技术发展有限公司
**/
SIPUserAgent = function() {
	//软电话activex对象
	this.vaxSipObj;
	
	//SIP软电话是否已经online,online成功后online=true
	this.onlineFlag = false;

	//sip用户名
	this.userName;

	//密码
	this.password;

	//sip代理地址
	this.sipProxy;

	//sip转发代理
	this.outboundProxy;

	//显示名字
	this.displayName;

	//通道数，默认设置成1个通道
	this.totalLines = 1;
	
	//是否使用声音设备，默认是使用
	this.enableSoundDevice = true;

	//回音消除,默认需要进行回音消除
	this.echoCancel = true;

	//支持的音频编码格式
	this.GSM610 = true;
	this.iLBC = true;
	this.G711A = true;
	this.G711U = true;

	/**
	* 功能：对错误代码进行解析，并弹出解析后的错误描述
	**/
	this.errorMessage = function()
	{
		var vaxError = this.vaxSipObj.GetVaxObjectError();
		
		switch(vaxError)
		{
			case 10: alert("You are not online, please click the 'Online' button first to dial/receive the calls.");
				break;

			case 11: alert("Cann't open local communication port. Another softphone (x-Ten, x-lite, skype etc) is already running. Please close it first.");
				break;
			
			case 12: alert("License Key is not valid.");
				break;
		
			case 13: alert("Fail to initialize VaxVoIP task window.");
				break;

			case 14: alert("Cann't access Input/Mic device or device is already in use.");
				break;
			
			case 15: alert("Cann't access Output/Speaker device or device is already in use.");
				break;

			case 16: alert("Input/Mic device is not open."); 
				break;

			case 17: alert("Output/Speaker device is not open."); 
				break;

			case 18: alert("Your sound device does not support mic volume."); 
				break;

			case 19: alert("Your sound device does not support speaker volume."); 
				break;

			case 20: alert("Recording media initialization fail.");
				break;

			case 21: alert("Cann't open the wave file.");
				break;
			
			case 22: alert("Provided SIP URI is not valid.");
				break;

			case 23: alert("Codec is not supported.");
				break;
			
			case 24: alert("Error to create SDP (Session Description Protocol) request.");
				break;
			
			case 25: alert("Error to create CONNECTION request. Please check the provided SIP URI is valid.");
				break;

			case 26: alert("Error to create REGISTER request. Please check the provided SIP URI is valid.");
				break;

			case 27: alert("Error to create UN-REGISTER request. Please check the provided SIP URI is valid.");
				break;

			case 28: alert("Error to create DISCONNECT request.");
				break;

			case 29: alert("Line No is not valid.");
				break;
			
			case 30: alert("Line is already busy.");
				break;
				
			case 31: alert("Line is not open.");
				break;
				
			case 32: alert("Invalid Call-Id.");
				break;
				
			case 33: alert("Provided value is not valid.");
				break;
				
			case 34: alert("Selected line is not in voice session.");
				break;
				
			case 35: alert("Fail to read wave file.");
				break;
				
			case 36: alert("Fail to write wave file.");
				break;
				
			case 37: alert("Unsupported wave file format.");
				break;
		}
	}

	/**
	* 功能：SIP软电话注册，只有注册成功后，后续的功能才能使用
	*		在调用online之前，必须首先设置vaxsipObj、userName、password、sipProxy等参数
	* 参数：registerCallBack 注册的回调函数，
	*		该回调函数带一个参数flag，传入true代表注册成功,否则代表失败
	**/
	this.online = function(registerCallBack) {
		//设置domainKey，下面的字符串和“localhost”这个“域名”进行了绑定
		this.vaxSipObj.SetDomainKey("215D34D80D112D99D180D236D26D155D143D144D148D174D62D156D117D213D41D132D149D22D213D171D3D183D181D115D13D209D10D207D243D26D117D228D122D41D41D181D54D124D118D10D127D247D90D74D40D144D219D129D201D70D233D165D27D83D176D80D211D54D0D108D141D245D47D231D99D135D181D121D150D137D130D113D173D25D33D63D238D230D40D158D216D92D73D225D68D135D239D109D81D137D211D253D223D188D130D157D189D186D217D126D245D207D74D96D224D232D122D30D144D30D205D184D104D203D210D18D190D137D62D61D170D250D101D221D206D229D255D205D211D204D155D251D244D137D62D61D170D250D101D221D206D174D175D210D143D187D52D67D85D43D178D42D248D59D108D101D111D137D15D50D49D11D105D225D192D");

		//根据登录用户名、代理服务器地址构造sip的uri	
		var fromURI = this.userName + " <sip:" + this.userName + "@" + this.sipProxy + ">";
		
		//取得本机的IP地址
		var myIP = this.vaxSipObj.GetMyIP();
		
		//vaxSipObj的操作结果
		var result = false;
		
		//sip的默认监听端口是5060，但是如果同时开了其它的软电话，如：x-lite等，默认端口可能被占用了，所以要调整监听端口
		//UA的监听端口范围:5060-6999
		for(var listenPortSIP = 5060; listenPortSIP < 7000; listenPortSIP++)
		{
			//初始化UA(软电话)，逐一尝试sip的监听端口，看是否可以使用
			result = this.vaxSipObj.Initialize(0, myIP, listenPortSIP, fromURI,
						this.outboundProxy, this.sipProxy, this.userName, this.password, this.enableSoundDevice, this.totalLines);
			
//			result = this.vaxSipObj.InitializeEx(0, myIP, listenPortSIP, this.userName, this.userName, this.password, this.dispalyName,
//						this.outboundProxy, this.sipProxy, '', this.enableSoundDevice, this.totalLines);
			
			if(!result)
			{
				//初始化不成功，判断错误编号
				//错误代码11表示不能打开通信监听端口，此时端口可能被其它软电话占用了，此时继续尝试下一个端口
				if(this.vaxSipObj.GetVaxObjectError() != 11)
				{
					//是其它错误代码，终止继续尝试
					this.errorMessage();

					break;
				}
			}
			else
			{
				//成功进行了初始化，将进行后续操作
				break;
			}
		}
		
		//如果5060-69999的端口都尝试完了还是不能正确初始化，则提示，并终止后续操作
		if(listenPortSIP >= 7000)
		{
			alert("无法打开SIP的通信端口");

			return;
		}
		
		//初始化成功才进行后续操作
		if(result)
		{
			//RTP的端口从7000开始，每个通道(line)使用一个端口
			var listenPortRTP = 7000;
			var errorCount = 0;
			
			for(var lineNo = 0; lineNo < this.totalLines; lineNo++)
			{
				if(!this.vaxSipObj.OpenLine(lineNo, 0, myIP, listenPortRTP))
				{
					//打开通道失败，判断错误类型，11表示端口被占用，此时可能其它软电话已经打开，将继续尝试其他端口
					if(this.vaxSipObj.GetVaxObjectError() == 11)
					{
						errorCount++;
						lineNo--;
					}
					else
					{
						//如果不是端口被占用的错误，就退出尝试，并报错
						this.errorMessage();
						result = false;
						
						break;
					}
				}
			
				//RTP端口加2后继续尝试，注意：一定要加2
				listenPortRTP += 2;  
				
				//如果尝试了500个RTP端口还是无法打开端口，则提示错误
				if(errorCount >= (this.totalLines + 500))
				{	
					alert("无法打开RTP通信端口");

					return;
				}
			}
		}
		
		//只有SIP端口、RTP端口都监听成功才进行后续操作	
		if(result)
		{
			
			//注册到sip服务器
			if(!this.vaxSipObj.RegisterToProxy(1800))
			{
				//如果不成功，弹出错误信息
				this.errorMessage();
				return;
			}
			
			//是否要进行回音消除，默认要进行回音消除
			if(this.echoCancel)
				this.vaxSipObj.EnableEchoNoiseCancellation();
			else
				this.vaxSipObj.DisableEchoNoiseCancellation();
			
			//设置支持的音频编码格式,默认支持所有的编码格式
			//首先清除所有的编码格式
			this.vaxSipObj.DeselectAllVoiceCodec();
			
			if(this.GSM610)
				this.vaxSipObj.SelectVoiceCodec(0);
			
			if(this.iLBC)
				this.vaxSipObj.SelectVoiceCodec(1);

			if(this.G711A)
				this.vaxSipObj.SelectVoiceCodec(2);

			if(this.G711U)
				this.vaxSipObj.SelectVoiceCodec(3);

			this.vaxSipObj.EnableKeepAlive(10);
			
			//设置注册成功的标识
			this.onlineFlag = true;
		}

	};
	
	/**
	* 功能：从SIP服务器中注销软电话，注销后要进行通话，需要重新online
	**/
	this.offline = function() {
		if(this.onlineFlag) {
			this.vaxSipObj.UnInitialize();

			this.onlineFlag = false;
		}
	};
	
	/**
	* 功能：在指定的通道上拨打电话
	* 参数：phoneNo 电话号码
	**/
	this.dial = function(phoneNo) {
		//通道编号
		var lineNo = 0;
		var toURI = "sip:" + phoneNo + "@" + this.sipProxy;
		
		//拨打电话，使用默认的输入输出音频设备
		var inputDeviceId = -1;
		var outputDeviceId = -1;
		if(!this.vaxSipObj.Connect(lineNo, toURI, inputDeviceId, outputDeviceId))
		{
			this.errorMessage();
		}
	}

	/**
	* 功能：挂断某个通道上的电话
	**/
	this.hangup = function() {
		//通道编号
		var lineNo = 0;

		if(!this.vaxSipObj.Disconnect(lineNo))
			this.errorMessage();
	}
	
	/**
	* 功能：拒绝接听电话
	* 参数：callId 通话编号
	**/
	this.rejectCall = function(callId) {
		  if(!this.vaxSipObj.RejectCall(callId))
		  {
			this.errorMessage();
			return;
		  }

	}
	
	/**
	* 功能：在指定的通道上接听电话
	* 参数：callId 通话编号
	**/
	this.acceptCall = function(callId) {
		//通道编号
		var lineNo = 0;
		//使用默认的输入输出音频设备
		var inputDeviceId = -1;
		var outputDeviceId = -1;

		if(!this.vaxSipObj.AcceptCall(lineNo, callId, inputDeviceId, outputDeviceId))
		{
			this.errorMessage();

			return;
		}
	}
	
	/**
	* 功能：在指定的通道上拨打某个数字
	**/
	this.digitDTMF = function(dtmfNumber) {
		//通道编号
		var lineNo = 0;

		this.vaxSipObj.DigitDTMF(lineNo, dtmfNumber);
	}
}