"use strict";
$(function() {

	setPlaceholder('input[name="title"]', "输入标题...", "Please enter title", "Sila masukkan tajuk");
	setPlaceholder('textarea', "输入正文内容", "Please enter content", "Sila masukkan kandungan");

	//  提交表单事件
	$('#entity_submit_btn').on('click', function() {
		var data = $('#entity_form').serializeArray();
		$.each(data, function(i, obj) {
			if (obj.name == 'content') {
				//换行
				obj.value = obj.value.replace(/\r\n/g, "<br>")
				obj.value = obj.value.replace(/\n/g, "<br>");
			}
		});
		var imgArray = [];
		$('#img_url_list input').each(function() {
			var img = $(this).val();
			imgArray.push(img)
		});
		data.push({
			'name': 'imgUrl',
			'value': imgArray
		});
		//  发送请求
		$.ajax({
			'url': rootPath + '/goods/evaluation/push',
			'data': data,
			'type': 'POST',
			'success': function(result) {
				if (result.code === '200') {
					layer.msg('<lang class="lang-SuSuccessShowjy"></lang>', {
						time: 1000
					}, function() {
						window.location.href = rootPath + '/user/home';
					});
				} else {
					layer.confirm(ur_.getKey(result.msg), {
						title: ['<lang class="lang-info"></lang> '],
						btn: ['<lang class="lang-SureBtn"></lang>', '<lang class="lang-CanCelBtnJ"></lang>']
					});
				}
			}
		});
	});

	//  图片上传
	(function() {

		function dealImage(path, obj, callback) {

			var img = new Image();
			img.src = path;
			img.onload = function() {

				var that = this;
				// 默认按比例压缩
				var w = that.width,
					h = that.height,
					scale = w / h;
				w = obj.width || w;
				h = obj.height || (w / scale);
				var quality = 0.8; // 默认图片质量为0.7
				//生成canvas
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				// 创建属性节点
				var anw = document.createAttribute("width");
				anw.nodeValue = w;
				var anh = document.createAttribute("height");
				anh.nodeValue = h;
				canvas.setAttributeNode(anw);
				canvas.setAttributeNode(anh);
				ctx.drawImage(that, 0, 0, w, h);
				// 图像质量
				if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
					quality = obj.quality;
				}
				// quality值越小，所绘制出的图像越模糊
				var base64 = canvas.toDataURL('image/jpeg', quality);
				// 回调函数返回base64的值
				callback(base64);
				// return base64;
			}
		}
		var JJ_;

		function verificationPicFile(file) {
			JJ_ = true;
			var fileSize = 0;
			var fileMaxSize = 2000; //1M
			var filePath = file.value;
			if (filePath) {
				fileSize = file.files[0].size;
				var size = fileSize / 1024;
				if (size > fileMaxSize) {
					if ($.cookie('userLang') == 'zh') {
						layer.confirm('文件不能大于1M', {
							title: ['<lang class="lang-info"></lang> '],
							btn: ['<lang class="lang-SureBtn"></lang>', '<lang class="lang-CanCelBtnJ"></lang>']
						});

					} else if ($.cookie('userLang') == 'en') {
						layer.confirm('Not greater than 1M', {
							title: ['<lang class="lang-info"></lang> '],
							btn: ['<lang class="lang-SureBtn"></lang>', '<lang class="lang-CanCelBtnJ"></lang>']
						});

					} else {
						layer.confirm('Fail tidak boleh lebih besar daripada 1M', {
							title: ['<lang class="lang-info"></lang> '],
							btn: ['<lang class="lang-SureBtn"></lang>', '<lang class="lang-CanCelBtnJ"></lang>']
						});
					}
					file.value = "";
					JJ_ = false;
				} else if (size <= 0) {
					// alert('文件不能为0M')
					file.value = "";
					JJ_ = false;
				}
			} else {
				JJ_ = false;
			}
		}

		//  上传按钮
		$('#upload_input').on('change', function() {
			var reader = new FileReader();
			var file = this.files[0];
			reader.onload = function(e) {
				console.log(e)
				console.log((new Blob([this.result]) / 1024) / 1024)
				dealImage(e.target.result, {
					width: 300
				}, function(ys_img) {
					console.log(ys_img)
					$('.zzjy').show();
					$('.loadingZJY').show();

					$.ajax({
						type: "post",
						url: rootPath + '/uploadImg',
						data: {
							suffix: ys_img
						},
						success: function(resultBean) {
							console.log(resultBean)
							$('.zzjy').hide();
							$('.loadingZJY').hide();
							if (resultBean.code == '200') {
								//  上传成功
								// 图片路径设置为读取的图片
								var imgSrc = imgPath + resultBean.data;

								var imgHtmlText = '' +
									'<li style="heigth:65px;">' +
									'    <img src=' + imgSrc + ' />' +
									'    <i></i>' +
									'</li>';
								console.log(imgSrc)
								console.log(imgHtmlText)
								$('#img_list').append(imgHtmlText);
								//  图片路径
								var inputHtmlText = '<input type="hidden" name="imgUrl" value="' + resultBean.data + '" />';
								$('#img_url_list').append(inputHtmlText);
								$("#upload_input").val(''); //设置value 为null
							} else {
								layer.confirm(ur_.getKey(resultBean.msg), {
									title: ['<lang class="lang-info"></lang> '],
									btn: ['<lang class="lang-SureBtn"></lang>', '<lang class="lang-CanCelBtnJ"></lang>']
								});
								// logoImg.removeAttr('src');
							}
						}

					})
				})
			}
			reader.readAsDataURL(file);


			var fileM = $(this)[0];
			var fileObj = fileM.files[0];
			var formData = new FormData();
			// verificationPicFile(fileM);
			formData.append('file', fileObj);
			// 			var fileM = $(this)[0];
			// 			var fileObj = fileM.files[0];
			// 			var formData = new FormData();
			// 			verificationPicFile(fileM);
			// 			formData.append('file', fileObj);
			// 			if(!JJ_){
			// 				return false;
			// 			}
			// 			$('.zzjy').show();
			// 			$('.loadingZJY').show();
			// 			$.ajax({
			// 				type: "post",
			// 				url: rootPath + "/upload",
			// 				data: formData,
			// 				processData: false,
			// 				contentType: false,
			// 				success: function(resultBean) {
			// 						$('.zzjy').hide();
			// 					$('.loadingZJY').hide();
			// 					console.log(resultBean)
			// 
			// 					console.log(resultBean.code)
			// 					if (resultBean.code == '200') {
			// 
			// 						//  上传成功
			// 						// 图片路径设置为读取的图片
			// 						var imgSrc = imgPath + resultBean.data;
			// 
			// 						var imgHtmlText = '' +
			// 							'<li style="heigth:65px;">' +
			// 							'    <img src=' + imgSrc + ' />' +
			// 							'    <i></i>' +
			// 							'</li>';
			// 						console.log(imgSrc)
			// 						console.log(imgHtmlText)
			// 						$('#img_list').append(imgHtmlText);
			// 						//  图片路径
			// 						var inputHtmlText = '<input type="hidden" name="imgUrl" value="' + resultBean.data + '" />';
			// 						$('#img_url_list').append(inputHtmlText);
			// 						$("#upload_input").val(''); //设置value 为null
			// 					} else {
			// 						layer.confirm(ur_.getKey(resultBean.msg), {
			// 							title: ['<lang class="lang-info"></lang> '],
			// 							btn: ['<lang class="lang-SureBtn"></lang>', '<lang class="lang-CanCelBtnJ"></lang>']
			// 						});
			// 						// logoImg.removeAttr('src');
			// 					}
			// 
			// 
			// 
			// 				},
			// 				fail: function() {
			// 
			// 				}
			// 			});

		});




		//  上传按钮
		// 		var uploadInput = $('#upload_input');
		// 
		// 		var _form = $('#uploadForm');
		// 
		// 		// 上传图片and预览
		// 		uploadInput.on('change', function() {
		// 			//判断是否支持FileReader
		// 			var reader;
		// 			if(window.FileReader) {
		// 				reader = new FileReader();
		// 			} else {
		// 
		// 				if($.cookie('userLang')) {
		// 					if($.cookie('userLang') == 'zh') {
		// 						alert(ur_.getKey("您的设备不支持图片预览功能,如需该功能请升级您的设备!"));
		// 
		// 					} else if($.cookie('userLang') == 'en') {
		// 						alert('Your device does not support image preview. Please use another device should you need to proceed further.');
		// 
		// 					} else {
		// 						alert('Mobile anda tidak menyokong pratonton imej. Sila gunakan mobile lain sekiranya anda perlu meneruskan selanjutnya.');
		// 					}
		// 				}
		// 
		// 				return false;
		// 			}
		// 			//获取文件
		// 			var file = this.files[0];
		// 			var imageType = /^image\//;
		// 			//是否是图片
		// 			if(!imageType.test(file.type)) {
		// 
		// 				
		// 				
		// 				if($.cookie('userLang')) {
		// 					if($.cookie('userLang') == 'zh') {
		// 						alert('请选择图片');
		// 
		// 					} else if($.cookie('userLang') == 'en') {
		// 						alert('Please select an image');
		// 
		// 					} else {
		// 						alert('Sila pilih imej');
		// 					}
		// 				}
		// 				
		// 				
		// 				
		// 				
		// 				return false;
		// 			}
		// 			//读取完成
		// 			reader.onload = function(e) {
		// 				//  上传图片
		// 				_form.ajaxSubmit(function(resultBean) {
		// 					if(resultBean.code === '200') {
		// 						//  上传成功
		// 						// 图片路径设置为读取的图片
		// 						var imgSrc = e.target.result;
		// 						var imgHtmlText = '' +
		// 							'<li style="heigth:65px;">' +
		// 							'    <img src=' + imgSrc + ' />' +
		// 							'    <i></i>' +
		// 							'</li>';
		// 						$('#img_list').append(imgHtmlText);
		// 						//  图片路径
		// 						var inputHtmlText = '<input type="hidden" name="imgUrl" value="' + resultBean.data + '" />';
		// 						$('#img_url_list').append(inputHtmlText);
		// 						$("#upload_input").val(''); //设置value 为null
		// 					} else {
		// 						layer.confirm(ur_.getKey(resultBean.msg), {
		// 							title: ['<lang class="lang-info"></lang> '],
		// 							btn: ['<lang class="lang-SureBtn"></lang>', '<lang class="lang-CanCelBtnJ"></lang>']
		// 						});
		// 						logoImg.removeAttr('src');
		// 					}
		// 				});
		// 			};
		// 			reader.readAsDataURL(file);
		// 		});

	})();

	//  删除图片
	$("#img_list").on('click', ' li i', function() {
		var _li = $(this).parent();
		var index = _li.index();
		$('#img_url_list input').eq(index).remove();
		_li.remove();
	});
});
