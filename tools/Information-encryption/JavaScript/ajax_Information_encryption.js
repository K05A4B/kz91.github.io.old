
$('head').append('<link rel="stylesheet" href="/tools/Information-encryption/Css/info_en_de.css"></link>')
$('head').append('<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js"></script>')

$(document).keydown(function(event){

});

// 请求加密数据
function ajax_info_en(password, content){
	$.ajax({
		url : "https://api.vvhan.com/api/jm?key=" + password + "&string=" + content + "&type=en",
		type : "get",
		dataType : 'text',
		async : true,
		success : function(data){
			let en = data;
			let success = data;
			let error_info = data;
            var status = JSON.parse(success)
			status  = status.success
			if (status == false){
				error_info = JSON.parse(error_info).message
			    alert('错误:' + error_info)
			}
			else if (status == true){
				en = JSON.parse(en).enmissString
				console.log('加密完成：' + en)
				alert('加密完成！\n加密ID：' + en)
				$('#copy_bar').val(en)
			}
			else{
				alert('加密失败！')
			}
		},
		error:function(){
			alert("错误：数据加密请求被服务器拒绝！\n解决方法：暂停使用此工具5分钟即可恢复");
		}
	})
}



// 请求解密数据
function ajax_info_de(password, content){
	$.ajax({
		url : 'https://api.vvhan.com/api/jm?key=' + password +'&string=' + content +'&type=de',
		type : "get",
		dataType : 'text',
		async : true,
		success : function(data){
			let de = data;
			let success = data;
			let error_info = data;
			let True_or_False = data;
			success = JSON.parse(success).success
			if (success == false){
				var error_info_value = JSON.parse(error_info).message
			    alert('错误：' + error_info_value)
			}
			else{
				var True_or_False_value = JSON.parse(True_or_False).demissString
				if (True_or_False_value == 0){
					alert('密码错误！！')
				}
				else{
				    de = JSON.parse(de).demissString
                    console.log('解密完成：' + de)
					alert('解密成功：' + de)
					$('#copy_bar').val(de)
				}
			}
		},
		error:function(){
			alert('错误：数据解密请求被服务器拒绝！\n解决方法：暂停使用此工具5分钟即可恢复')
		}
	});
}