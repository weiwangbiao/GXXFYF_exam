$("h4.d-flex-item").after(`间隔：<input type="text" id="sleep_time" style="width:26px;" value="10">
 +随机<input type="text" id="rnd_time" style="width:26px;"  value="15">秒。
 <input type="button" value="${location.pathname == "/exercise.html" ? "练习" : "答题"}" id="answerme"/> 
 <input type="button" style="display:none" value="停!" id="stop"/> `)
function do_exam() {
	let input_time = document.querySelector("#sleep_time").value * 1000
	let rndtime = Math.random() * document.querySelector("#rnd_time").value * 1000
	let sltime = parseInt(input_time + rndtime)

	if (document.querySelectorAll(".noanswer").length > 0) {
		//ing表示正在答题的题目，如果不在答未答的题目，则强行进入未答的第一题
		let ing = document.querySelector(".ing")
		if (!ing) {
			document.querySelectorAll(".solid")[document.querySelectorAll(".solid").length - 1].click()
			document.querySelector("#btnConfirm").click()
		}
		let now_id = (ing.textContent - 0)
		//获取当前题目的Id，拼接成获取答案的请求网址，用的是GitHub的库，避免重复请求考试服务器引发怀疑
		let nowSubjectId = document.querySelector("#nowSubjectId").value || "15236"
		let url = `https://ghproxy.com/https://raw.githubusercontent.com/weiwangbiao/GXXFYF_exam/master/tiku/${nowSubjectId}.json`
		let request = new XMLHttpRequest()
		request.open("get", url, true) //true异步，false同步，等待结果后才继续
		request.send()
		request.onload = function () {
			if (request.status == 200) {
				let json = JSON.parse(request.responseText)
				let answer_id = json.id.split('_');//多选答案为3232_3133_3234，需要拆分为[3232,3233,3234]
				console.log(document.querySelector("#nowSubjectId").value + ": " + answer_id)
				for (i = 0; i < answer_id.length; i++) {
					if (json.itemIds.includes(answer_id[i])) { //判断题目中有这个选项再选择（有些题目的答案有问题）
						document.querySelector("li[itemid='" + answer_id[i] + "']").click()
					}
				}
				if (document.querySelectorAll(".primary").length < 1) { //选择的答案数量不小于1个
					//console.log('没有找到答案，乱选吧。')
					let data_type = document.querySelectorAll("li[data-type='0']")
					data_type.forEach(element => element.click())
				}
				document.querySelector("#btnConfirm").click()
				console.log(new Date().toLocaleTimeString() + '，答完第' + now_id + ' 题，' + sltime + ' ms后下一题...')
				handler = setTimeout(do_exam, sltime)
			}
		}
	} else {
		console.log(new Date().toLocaleTimeString() + ': 答题完毕')
		//用JavaScript实现自动点击由confirm弹出的对话框中的“确定”按钮
		window.confirm = () => { return 1 }
		document.querySelector("#btnHandPaper").click()
	}
}
function do_exercise() {
	let data_type = document.querySelectorAll("li[data-type='0']")
	data_type.forEach(element => element.click())
	if (document.querySelector("#btnConfirm")) {
		document.querySelector("#btnConfirm").click()
	}
	if (document.querySelector("#btnNext")) {
		document.querySelector("#btnNext").click()
	}
	handler = setTimeout(do_exercise, 2000)
}

document.querySelector("#stop").addEventListener("click", function stop_do() {
	clearTimeout(handler)
	document.querySelector("#stop").style.display = "none"
	document.querySelector("#answerme").style.display = "block"

})
let handler = 0
document.querySelector("#answerme").addEventListener("click", () => {
	location.pathname == "/exercise.html" ? do_exercise() : do_exam()
	document.querySelector("#stop").style.display = "block"
	document.querySelector("#answerme").style.display = "none"
})