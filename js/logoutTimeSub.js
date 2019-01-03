/*
 * ===========================================
 * logoutTimeSub 用于用户异常退出功能
 * ===========================================
 * @version:1.0.0
 * @author:lv-shuo@inspur.com
 * @time:2017-07-06
 * @param $ mui Object
 * @param win window Object
 * @param doc document Object
 * 
 * ********************************************
 * Ps~代码结构规划
 * 1part-变量定义区
 * 2part-plus方法初始化
 * 3part-自定义方法区
 * 4part-文档结构监听事件方法区
 * *********************************************
 */
     /***************************1.变量定义区***************************************/
	var currentWebView;//当前页面
	var viewQuarzObj;//程序处于前台时调用的定时任务
	var resuQuarzObj;//程序处于后台时调用的定时任务
	/***************************2.plus方法初始化区***************************************/
	if(win.plus) {
		plusReady();
	} else {
		doc.addEventListener('plusready', plusReady, false);
		doc.addEventListener("background", onAppPause, false);
		doc.addEventListener("foreground", onAppReume, false);
	}
	/***************************3.自定义方法区***************************************/
	/**
	 * plus初始化方法自定义
	 * 判断当前访问用户网络条件是否具备
	 * 暂无参数
	 * */
	function plusReady(){
		currentWebView = plus.webview.currentWebview();
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			mui.alert("请检查您是否连接网络","系统提示");
		} else {
			viewEvent();
		}
	}
	/**
	 * 程序从前台切换到后台事件监听方法
	 * 无参数
	 */
	function onAppPause(){
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			mui.alert("请检查您是否连接网络","系统提示");
		} else {
			resuEvent();
		}
	}
	/**
	 * 程序从后台切换到前台事件监听方法
	 * 无参数
	 */
	function onAppReume(){
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			mui.alert("请检查您是否连接网络","系统提示");
		} else {
			viewEvent();
		}
	}
	/**
	 * 前台任务触发的时钟调度任务方法
	 */
	function viewEvent(){
		win.clearInterval(resuQuarzObj);
		viewQuarzObj=win.setInterval(uploadTime,30000);//5分钟一调  轮训调用
	}
	/**
	 * 后台任务触发的时钟任务调度方法
	 */
	function resuEvent(){
		win.clearInterval(viewQuarzObj);
		resuQuarzObj=win.setInterval(uploadTime,30000);//5分钟一调  轮训调用
	}
	/**
	 * 任务上传当前用户信息
	 */
	function uploadTime(){
		var param = "{username:'" + plus.storage.getItem("userid") + "'}";
		var usercityUrl = plus.storage.getItem("url")+"/NMMP/controller/logoutTimeSubIOS";
		mui.ajax({
			url: usercityUrl,
			type: 'post',
			dataType: 'json',
			data: {
				submitData: param
			},
			success: function(response) {
			},
			error: function(xhr, type, errorThrown) {
//				mui.alert("您的网络不通畅","系统提示");
			}
		});
	}
}(mui, window, document));