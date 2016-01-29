 $(document).ready(function(){
   
   var usedArray = new Array(76);
   var baseArray = new Array(0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4);
   var sayings = new Array("Yes, yes, yes!", // 0
   			   "*Censors himself*", // 1
   			   "*Swears*", // 2
   			   "*Awkwardly drinks water*", //3
   			   "*Has uneven sleeves*", // 4
   			   "What is this garbage?!", // 5
   			   "Twitterland", //6
   			   "Googleland", // 7
   			   "Memes", // 8
   			   "The internet is cat pictures", // 9
   			   "Kneecaps blown out", // 10
   			   "Sir Tim", // 11
   			   "*Rick Rolls*", // 12
   			   "*Simpsons picture*", // 13
   			   "Appleland", // 14
   			   "\"Bingo\"", // 15
   			   "The answer is...", // 16
   			   "Be more specific", // 17
   			   "Do I know you from somewhere?", // 18
   			   "4Chans" //19
   			   );
   // var number = 0;
        var col = new Array(0,0,0,0,0);
        var row = new Array(0,0,0,0,0);
        var diag = new Array(0,0);
   var number = "";
   var base = 0;
   
   init();
   
	function init(){
		 for(var i = 0; i<=24; i++){
			fillCard(i);
		 }
	 }
	  	 
	 function fillCard(i){
		 //base = baseArray[i] * 15;
		 //number = base + Math.floor(Math.random()*15)+1;	
		 number = sayings[Math.floor(Math.random() * 19)];
		 $('#cell' + i).html(number);


		 // if(usedArray[number] != true){
			// $('#cell'+i).html(number);
			// 	usedArray[number] = true;
			// }else{
			// 	fillCard(i);
			// }
	 }
	 
	 // function resetUsedNumbersArray(){
		// for(var j = 0; j < usedArray.length; j++){
		// usedArray[j] = false;
		// }	
	 // }
	 
	$('#newCard').click(function(){
        	resetArrays();
        	init();
    	});

        function resetArrays() {
                for(var i = 0; i < 5; i++) {
                        col[i] = 0;
                        row[i] = 0;
                }
                diag[0] = 0;
                diag[1] = 0;
        }
	 
	 $('#newCard').click(function(){
		resetUsedNumbersArray();
		init();
	 });
	 
	 $('td').click(function(){
		var toggle = this.style;
		$(this).addClass("marked");
		//alert(this.class);
		toggle.backgroundColor = toggle.backgroundColor? "":"#333";
		toggle.color = toggle.color? "":"#fff";
		//$(this).addClass("marked");
		//alert($(this).attr('class'));
		checkForMingo();
	 });

	 function checkForMingo() {



	 	// cols and rows
	 	for(var i = 0; i < 5; i++) {
			for(var j = 0; j < 5; j++) {
				if($('#cell' + (j + 5 * i)).attr('class')=="marked") {
	 				col[i]++;
	 			}
				if($('#cell' + (j * 5 + i)).attr('class')=="marked") {
	 				row[i]++;
	 			}
			}
	 	}
	 	//diags
	 	for(var i = 0; i < 5; i++) {
			if($('#cell' + (i*6)).attr('class')=="marked") {
	 			diag[0]++;
	 		}
			if($('#cell' + (4+ i*4)).attr('class')=="marked") {
	 			diag[1]++;
	 		}

	 	}

	 	console.log(diag);

		for(var i = 0; i < 5; i++) {
	 		if(col[i] == 5 || row[i] == 5 || diag[0] == 5 || diag[1] == 5) {
	 			alert("MINGO!");
	 			break;
	 		}
	 	}

	 }

 });

