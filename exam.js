//插入页面的控件
$("h4:first").after('  答题数：<input type="text" id="timus" style="width:34px;" value="100"> \
间隔：<input type="text" id="sleep_time" style="width:26px;" value="10"> \
+随机<input type="text" id="rnd_time" style="width:26px;"  value="15">秒。 \
<input type="button" value="答题！" id="answerme"/>  ')
var sleep_time = parseInt($("#sleep_time").val());
var rnd_time = parseInt($("#rnd_time").val());
var timus = parseInt($("#timus").val());

function doit(){
    var input_time = sleep_time*1000;
    var rndtime = Math.random()*rnd_time*1000;
    sltime = input_time+rndtime
    if(now_id < timus+1) {
		//获取当前题目的Id，拼接成获取答案的请求网址，用的是GitHub的库，避免重复请求考试服务器引发怀疑
		var nowSubjectId = $("#nowSubjectId").val();
		//if (nowSubjectId == null ){nowSubjectId = '15236'}
		var url = "https://ghproxy.com/https://raw.githubusercontent.com/weiwangbiao/GXXFYF_exam/master/tiku/"+nowSubjectId+".json";
		var request = new XMLHttpRequest();
		request.open("get",url);
		request.send(null);
		request.onload =  function(){
			if (request.status == 200){
				var json = JSON.parse(request.responseText);
				answer_id =  json.id.split('_');
				console.log($("#nowSubjectId").val()+": "+answer_id);
                for (i=0; i<answer_id.length; i++){
                    // console.log(answer_id[i]);
					if  (json.itemIds.includes(answer_id[i])){
						$("li[itemid='"+answer_id[i]+"']").click();
						}else{
							console.log('use data-type=0');
							$("li[data-type='0']").click();
							}
					}
				if ($(".primary").length < 1){
					console.log('没有找到答案，乱选吧。');
					$("li[data-type='0']").click();
					}
				console.log(new Date().toLocaleTimeString()+': 已经答完第'+ now_id+' 题，等待'+parseInt(sltime)/1000+' 秒答下一题...');		
				if ($("#btnConfirm").length > 0){
					$("#btnConfirm").click();
					}
				if ($("#btnNext").length > 0){
					$("#btnNext").click();
					}
				setTimeout("doit()", sltime);
				now_id++;


			}else{
				//console.log('use data-type=0');
				$("li[data-type='0']").click();
				console.log(new Date().toLocaleTimeString()+': 已经答完第'+ now_id+' 题，等待'+parseInt(sltime)/1000+' 秒答下一题...');		
				if ($("#btnConfirm").length > 0){
					$("#btnConfirm").click();
					}
				if ($("#btnNext").length > 0){
					$("#btnNext").click();
					console.log('next');
					}
				now_id++;
				setTimeout("doit()", sltime);				
				}
		}
	}else{
		console.log(new Date().toLocaleTimeString()+': 答题完毕');
		}
	
	// $("#answerme").removeAttr("disabled");
	
		
}




$("#answerme").click(()=>{
	var now_id = 1;
	doit();  
})

