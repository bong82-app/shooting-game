/*
    	[JS 요약 설명]
    	1. window.onload : 웹 브라우저 로딩 완료 상태를 확인합니다
    	2. addEventListener : 객체에 특정 이벤트를 등록합니다
    	3. touchstart : 터치 시작을 의미합니다
    	4. touchmove : 터치 이동 상태를 의미합니다
    	5. touchend : 터치 종료 상태를 의미합니다
    	6. 참고 : 드래그앤 드롭 기능 구현 시 body 부분에 스크롤 이벤트를 막아줘야 정상 기능이 수행됩니다    	
    	*/
   	
    	


    	/* [html 최초 로드 및 이벤트 상시 대기 실시] */
    	window.onload = function() {
    		console.log("");
    		console.log("[window onload] : [start]");
    		console.log("");


    		// [터치 등록 이벤트 호출]
    		main();
    	};
    	



    	/* [터치 이벤트 등록 및 터치 상황 확인 함수] */
    	function main(){    		
    		console.log("");
    		console.log("[main] : [start]");    		
    		console.log("");


    		// [특정 객체 터치 이벤트 등록 실시]
    		var id = "one_container";
    		document.getElementById(id).addEventListener("touchstart", handleStart, false);
    		document.getElementById(id).addEventListener("touchmove", handleMove, false);
    		document.getElementById(id).addEventListener("touchend", handleEnd, false);
			

    		// [모바일 : 터치 시작 내부 함수 - (주의) 클릭 이벤트와 겹칠 수 있음]
    		function handleStart(evt) {
    			console.log("");
    			console.log("[main] : [handleStart] : [start]");


    			// body 스크롤 막음 [바디영역에서 스크롤있으면 터치 이벤트 안먹힙니다]
    			BodyScrollDisAble();


    			// 터치한 div id 값 확인 
    			var startId = evt.targetTouches[0].target.id;
    			console.log("[main] : [handleStart] : [ID] : " + startId);    			


    			// 좌표값 확인
    			//var startX = $(this).scrollLeft(); //jquery 방식
    			//var startY = $(this).scrollTop(); //jquery 방식
    			var startX = evt.changedTouches[0].clientX;
    			var startY = evt.changedTouches[0].clientY;
    			console.log("[main] : [handleStart] : [X] : " + startX);
    			console.log("[main] : [handleStart] : [Y] : " + startY);
    			console.log("");
    		};


    		// [모바일 : 터치 이동 내부 함수]
    		function handleMove(evt) {
    			console.log("");		
    			console.log("[main] : [handleMove] : [start]");


    			// body 스크롤 막음 [바디영역에서 스크롤있으면 터치 이벤트 안먹힙니다]
    			BodyScrollDisAble();


    			// 터치한 div id 값 확인 	
    			var moveId = evt.targetTouches[0].target.id;
    			console.log("[main] : [handleMove] : [ID] : " + moveId);


    			// 좌표값 확인
    			// var moveX = $(this).scrollLeft(); //jquery 방식
    			// var moveY = $(this).scrollTop(); //jquery 방식
    			var moveX = evt.changedTouches[0].clientX;
    			var moveY = evt.changedTouches[0].clientY;
    			console.log("[main] : [handleMove] : [X] : " + moveX);
    			console.log("[main] : [handleMove] : [Y] : " + moveY);
    			console.log("");
    		};


    		// [모바일 : 터치 종료 내부 함수] 
    		function handleEnd(evt) {
    			console.log("");
    			console.log("[main] : [handleEnd] : [start]");


    			// 바디 스크롤 허용 
    			BodyScrollAble();


    			// 좌표값 확인 
    			var endX = evt.changedTouches[0].clientX;
    			var endY = evt.changedTouches[0].clientY;
    			console.log("[main] : [handleEnd] : [X] : " + endX);
    			console.log("[main] : [handleEnd] : [Y] : " + endY);
    			console.log("");
    		};

    	};




    	/* [body 영역 스크롤 관리 부분] */
    	function BodyScrollDisAble(){
    		//document.body.style.overflow = "hidden"; //스크롤 막음
    	};		
    	function BodyScrollAble(){
    		//document.body.style.overflow = "auto"; //스크롤 허용
    	};