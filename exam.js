if (window.location.host != 'exam.gxpf.cn') {
	alert('Enter exam/exercise first, and then click me.');
}
else {
	var input_time = prompt("Please input sleep time(s): ","20");
	input_time = parseInt(input_time*1000);
	var input_rndtime = prompt("Please input random time(s): ","20");
	var now_id = 1;	
	doit();
	/*
	if ($("#btnHandPaper").length > 0) {
		$("#btnHandPaper").click();
		}
	*/
}
function doit(){
	if(now_id < 51) {
		var rndtime = Math.round(Math.random()*input_rndtime*1000);
		sltime = input_time+rndtime
		console.log(new Date().toLocaleTimeString()+': answering no.'+now_id+' ...and wait for '+sltime/1000+' seconds...');
		
		##$("li[data-type='0'").click();
		document.getElementById("btnConfirm").click();
		##$("#btnConfirm").click();
		if ($("#btnNext").length > 0){
			$("#btnNext").click();
			}
		setTimeout("doit()", sltime+rndtime);
		now_id++;
	}	
		
}
