if (window.location.host != 'exam.gxpf.cn') {
	alert('Enter exam/exercise first, and then click me.');
}
else {
	var sltime = prompt("Please input sleep time(s): ","20");
	sltime = parseInt(sltime*1000);
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
		var rndtime = Math.round(Math.random()*60000);
		sltime = sltime+rndtime
		console.log('answering no.'+now_id+' ...and wait for '+sltime/1000+' seconds...');
		$("li[data-type='0'").click();
		$("#btnConfirm").click();
		if ($("#btnNext").length > 0){
			$("#btnNext").click();
			}
		setTimeout("doit()", sltime+rndtime);
		now_id++;
	}	
		
}
