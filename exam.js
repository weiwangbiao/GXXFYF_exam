$("h4.d-flex-item").after('间隔：<input type="text" id="sleep_time" style="width:26px;" value="10"> \
+随机<input type="text" id="rnd_time" style="width:26px;"  value="15">秒。 \
<input type="button" value="答题！" id="answerme"/>  ')
function doit() {

	var now_id = parseInt($(".ing").text());
	if (!now_id) { now_id = 1 + parseInt($("#totalCount").text()); }
	var input_time = parseInt($("#sleep_time").val() * 1000);
	var rndtime = Math.random() * parseInt($("#rnd_time").val()) * 1000;
	sltime = input_time + rndtime
	// $("#answerme").attr("disabled","disabled");

	if ($(".noanswer").length > 0 || $("#btnNext").length > 0) {
		//获取当前题目的Id，拼接成获取答案的请求网址，用的是GitHub的库，避免重复请求考试服务器引发怀疑
		var nowSubjectId = $("#nowSubjectId").val();
		//if (nowSubjectId == null ){nowSubjectId = '15236'}
		var url = "https://ghproxy.com/https://raw.githubusercontent.com/weiwangbiao/GXXFYF_exam/master/tiku/" + nowSubjectId + ".json";
		var request = new XMLHttpRequest();
		request.open("get", url, true); //true异步，false同步，等待结果后才继续
		request.send(null);
		request.onload = function () {//true异步,用onreadystatechange会不等结果，导致同一时刻答多道题，false同步，都得不到结果
			if (request.status == 200) {
				var json = JSON.parse(request.responseText);
				answer_id = json.id.split('_');
				console.log($("#nowSubjectId").val() + ": " + answer_id);
				for (i = 0; i < answer_id.length; i++) {
					// console.log(answer_id[i]);
					if (json.itemIds.includes(answer_id[i])) {
						$("li[itemid='" + answer_id[i] + "']").click();
					} else {
						console.log('use data-type=0');
						$("li[data-type='0']").click();
					}
				}
				if ($(".primary").length < 1) {
					console.log('没有找到答案，乱选吧。');
					$("li[data-type='0']").click();
				}
				console.log(new Date().toLocaleTimeString() + ': 已经答完第' + now_id + ' 题，等待' + parseInt(sltime) / 1000 + ' 秒答下一题...');
				if ($("#btnConfirm").length > 0) {
					$("#btnConfirm").click();
				}
				if ($("#btnNext").length > 0) {
					$("#btnNext").click();
				}
				setTimeout("doit()", sltime);
				now_id++;


			} else {
				//console.log('use data-type=0');
				$("li[data-type='0']").click();
				console.log(new Date().toLocaleTimeString() + ': 已经答完第' + now_id + ' 题，等待' + parseInt(sltime) / 1000 + ' 秒答下一题...');
				if ($("#btnConfirm").length > 0) {
					$("#btnConfirm").click();
				}
				if ($("#btnNext").length > 0) {
					$("#btnNext").click();
					console.log('next');
				}

				setTimeout("doit()", sltime);
			}
		}
	} else {
		console.log(new Date().toLocaleTimeString() + ': 答题完毕');
		//用JavaScript实现自动点击由confirm弹出的对话框中的“确定”按钮
		window.confirm = () => { return 1 };
		$("#btnHandPaper").click();
	}
}
var now_id = 1;
//$("#answerme").click(() => {
//	doit();
//})
document.querySelector("#answerme").addEventListener("click", doit)


