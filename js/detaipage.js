var $mask = $(".mask");
	var $big = $(".big");
	var $bigImg = $(".bigImage");
	var $small = $(".small");
	
 	//鼠标移入移出  操作  大图和mask的显示和隐藏
 	$(".small").on({
 		"mouseover":function(){
 			//显示mask和big
 			$mask.show();
 			$big.show();
 		},
 		"mouseout":function(){
 			$mask.hide();
 			$big.hide();
 		},
 		"mousemove" :function(e){
 			var e = e || event;
 			var x = e.pageX - $small.offset().left - $mask.outerWidth()/2;
 			var y = e.pageY - $small.offset().top - $mask.outerHeight()/2;
 			var maxL = $small.outerWidth() - $mask.outerWidth();
 			var maxT = $small.outerHeight() - $mask.outerHeight();
 			x = Math.min(Math.max(0,x),maxL);
 			y = Math.min(Math.max(0,y),maxT);
 			//设置mask的left和top
 			$mask.css({
 				left : x,
 				top : y
 			})
 			//设置大图的left和top
 			//大图的宽度/小图宽度 = 大图left / mask的left
 			var bigImgLeft = x * $bigImg.outerWidth()/$small.outerWidth();
 			var bigImgTop = y * $bigImg.outerHeight()/$small.outerHeight();
 			
 			//设置大图的left和top
 			$(".bigImage").css({
 				left : -bigImgLeft,
 				top : -bigImgTop
 			})
 		}
 	})
 	$(window).scroll(function(){
	    	var scrTop = $(document).scrollTop();
	    	if(scrTop>=150){
	    		$('.gotop').css('display','block')
	    	}else{
	    		setTimeout(function(){
	    			$(".gotop").css('display','none')
	    		},2500)
	    	}
	    })
	    $(".gotop").click(function(){
	    	$("html,body").animate({"scrollTop":0},1000)
	    })
    //添加到购物车
$(function(){
				//加载已有的购物车信息
				loadCart();
				
				//给购物车按钮加一个点击事件
				$("#buy").click(function(){
					location.href = "ShoppingTrolley.html";
				})
				//给加入购物车按钮添加点击事件
				$(".addToCart").click(function(e){
					let goodId = $(".content-right h1").attr('data-good-id')
			     	let goodName = $(".content-right h1 span").html()
			     	let goodSrc = $(".smallImg").attr('src')
			     	let goodPrice = parseInt($(".price").html())

					//获取cookie中的信息
					//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					//将字符串转成对象
					var cartObj = convertCartStrToObj(cartStr);
					//判断该商品是否已经在购物车中存在
					if(goodId in cartObj){
						//如果已存在，那么该商品的数量加1
						cartObj[goodId].num += 1;
					}else{
						//如果不存在，那么将新商品的信息存入
						cartObj[goodId] = {
							name : goodName,
							price : goodPrice,
							num : 1,
							src : goodSrc
						};
					}
					
					//将新的购物车信息存回cookie
					//将对象转为字符串
					cartStr = convertObjToCartStr(cartObj);
					//存入cookie
					//document.cookie = "key=value"
					$.cookie("cart",cartStr,{expires : 7,path:"/"});
					
					
					
					//做一个飞入购物车的效果
					var cloneImg = $(".smallImg").clone().css({width:50,height:50});
					cloneImg.fly({
						start : {
							top : e.clientY,
							left : e.clientX
						},
						end :{
							top : $("#buy").offset().top,
							left : $("#buy").offset().left,
							width:0,
							height:0
						},
						autoPlay : true,
						onEnd : function(){
							$("#buy").val(function(index,v){
						var pattern = /(\d+)/;
						var num = parseInt(v.match(pattern)[1]);
						return "购物车(" + (num + 1) + ")";
					});
					cloneImg.remove();
						}
					})
				})
			});
			
			
			function convertCartStrToObj(cartStr){
			
				if(!cartStr){
					return {};
				}
				var goods = cartStr.split(":");
				var obj = {};
				for(var i = 0; i < goods.length; i ++){
					var data = goods[i].split(",");
					//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
					obj[data[0]] = {
						name : data[1],
						price : parseFloat(data[2]),
						num : parseInt(data[3]),
						src : data[4]
					}
				}
				return obj;
			}
			function convertObjToCartStr(obj){
					
					var cartStr = "";
					//遍历对象
					for(var id in obj){
						if(cartStr){
							cartStr += ":";
						}

						cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
					}
					return cartStr;
			}
			
			//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
			function loadCart(){
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					//获取到购物车中所有商品的数量
					var total = 0;
					for(var id in cartObj){
						total += cartObj[id].num;
					}
					$("#buy").val("购物车(" + total + ")");
			}