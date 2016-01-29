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
        var mingo;
   
   init();
   
	function init(){
		 for(var i = 0; i<=24; i++){
			fillCard(i);
		 }
                 mingo = false;
	 }
	  	 
	 function fillCard(i){
		 //base = baseArray[i] * 15;
		 //number = base + Math.floor(Math.random()*15)+1;	
                number = sayings[Math.floor(Math.random() * 19)];
	        $('#cell' + i).html(number);
                if($('#cell' + i).class = "marked") {
                        $('#cell' + i).removeClass("marked");
                        $('#cell' + i).addClass("unmarked");                        
                        $('#cell' + i).css("color","");
                        $('#cell' + i).css("background-color","");
                        if(i == 12) {
                                $('#cell' + i).html('FREE');
                        }
                }
	 }
	 
	 
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
		resetArrays();
		init();
	 });
	 
	 $('td').click(function(){
		var toggle = this.style;
                if($(this).attr("class") == "unmarked") {
                        $(this).removeClass("unmarked");
		        $(this).addClass("marked");
                }
                else {
                        $(this).removeClass("marked");
                        $(this).addClass("unmarked");
                }
		//alert(this.class);
		toggle.backgroundColor = toggle.backgroundColor? "":"#333";
		toggle.color = toggle.color? "":"#fff";
		//$(this).addClass("marked");
		//alert($(this).attr('class'));
		checkForMingo();
	 });

	 function checkForMingo() {


                resetArrays();
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
                                console.log("diag[0]++");
	 		}
			if($('#cell' + (4+ i*4)).attr('class')=="marked") {
	 			diag[1]++;
                                console.log("diag[1]++");
	 		}

	 	}

	 	// console.log(row);
   //              console.log(col);
   //              console.log(diag);

                if(!mingo) {
        		for(var i = 0; i < 5; i++) {
        	 		if(col[i] == 5 || row[i] == 5 || diag[0] == 5 || diag[1] == 5) {
        	 			mingo = true;
                                        alert("MINGO!");
        	 			break;
        	 		}
        	 	}
                }

	 }

 });

