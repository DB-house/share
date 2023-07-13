				var inputInterval = 2000;
				const feelmap = new Map([
							["good" ,0],
							["normal" ,0],
							["bad" ,0],
							]);
				const arr =[3];
				$(document).ready( function() {
					console.log(window.location.href);		
					if(window.location.href.indexOf('param') ==-1)
					{
						console.log("PATH");
						const arrtmp = window.location.href.split("-");
						arr[1]=arrtmp[1];
						arr[2]=arrtmp[2];
					}
					else if(window.location.href.indexOf('param') > 0) 
					{
						console.log("PARAM");
						floor= getParam("floor");
						name= getParam("name");
						name= decodeURI(decodeURIComponent(name));

						arr[1] =floor;
						arr[2] =name;
					}
					console.log(arr[1]); //floor
					console.log(arr[2]); //name
					getFeelings();
				});

				function getParam(name) {
						var url = location.href;
						name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
						var regexS = "[\\?&]"+name+"=([^&#]*)";
						var regex = new RegExp(regexS);
						var results = regex.exec(url);
						return results == null ? null : results[1];
				}
				
				var inputFlag = false;
				function updateFeelings(div_id)
				{
					if(inputFlag == true)
					{
						return;
					}
					inputFlag = true
					addCount(div_id);
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange=function()
					{
						xmlhttp.onreadystatechange=function()
						{
							//stateChange(xmlhttp, div_id);
						};
					};
					var url_put_score = 'http://ddorang.dothome.co.kr/feel/input.html?name='+arr[2]+'&floor='+arr[1]+'&score_good='+feelmap.get('good')+'&score_normal='+feelmap.get('normal')+'&score_bad='+feelmap.get('bad');
					xmlhttp.open("GET", url_put_score, true);
				 	xmlhttp.send();
					setTimeout(() => {inputFlag = false}, inputInterval);
				}
				
				function stateChange(xmlhttp, div_id)
				{
					if (xmlhttp.readyState==4&&xmlhttp.status==200)
						document.getElementById(div_id).innerHTML=xmlhttp.responseText.replaceAll(']",',']",</br>');
				}

				function getFeelings()
				{
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange=function()
					{

						if (xmlhttp.readyState==4&&xmlhttp.status==200) {
							console.log("----------------");
							//@,name=VXPM1,date=2023-07-12,floor=14,normal=1,bad=0,good=1,@
							if (xmlhttp.readyState==4&&xmlhttp.status==200){
								console.log('xmlhttp.responseText');
								console.log(xmlhttp.responseText);
								console.log('-------------------2');
								if(xmlhttp.responseText.indexOf("@") > 0){
									const arrscore = xmlhttp.responseText.split("@")[1].split(",");
									console.log('-------------------2');
									console.log(arrscore);
									console.log('-------------------3');
									feelmap.set('good', Number(arrscore[6].split('=')[1]));
									feelmap.set('normal', Number(arrscore[4].split('=')[1]));
									feelmap.set('bad', Number(arrscore[5].split('=')[1]));

								}else{
									feelmap.set('good', Number(0));
									feelmap.set('normal', Number(0));
									feelmap.set('bad', Number(0));
								}
								document.getElementById('good').innerHTML= getImgHtml.apply(feelmap.get('good')+"".split(""));
								document.getElementById('normal').innerHTML= getImgHtml.apply(feelmap.get('normal')+"".split(""));
								document.getElementById('bad').innerHTML= getImgHtml.apply(feelmap.get('bad')+"".split(""));
							}

						}
					};
					var url_get_score = 'http://ddorang.dothome.co.kr/feel/get.html?name='+arr[2]+'&floor='+arr[1];
					xmlhttp.open("GET", url_get_score, true);
					xmlhttp.send();
				}
				
				function addCount(div_id)
				{
						console.log("inputFlag :"+ inputFlag);
						inputFlag = true;
						var tmpcount=feelmap.get(div_id) + 1;	
						feelmap.set(div_id, tmpcount);
						document.getElementById(div_id).innerHTML= getImgHtml.apply(tmpcount+"".split(""));
						
				
				}
				
			   function getImgHtml() {
				  var path = "";  
				  for (var i=0,s=[]; i<this.length; i++) {
					s.push("<img style=\"width:20%;height:100%;\" src=\"num/"+path+this[i]+".jpg\" />");
				  }
				  return s.join("");
				}

			window.setTimeout('window.location.reload(true)',(1000*60)*60*6);
