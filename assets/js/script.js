Parse.initialize("rfxCYz4gizVzN9gRnQjcWigoHxKgxiWf33pAVVFY", "5M5b1gO1ioUC0OOBH0uUEmpICQWbHqaZ5Zs0Ix2D");

var MingoWinnerName = Parse.Object.extend("MingoWinnerName");
var newName = new MingoWinnerName();

$(document).ready(function(){
        var usedArray = new Array(76);
        var sayings = new Array(
                "Yes, yes, yes!", // 0
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
   		"4Chans", //19
                "Oh Boy",// 20
                "*Laughs Maniacally", //21
                "*Rubs hands together*" //22
   		);
        var col = new Array(0,0,0,0,0);
        var row = new Array(0,0,0,0,0);
        var diag = new Array(0,0);
        var number = "";
        var mingo;
   
        init();
   
	function init(){
		 for(var i = 0; i<=24; i++){
			fillCard(i);
		 }
                 mingo = false;
                 var name = prompt("Please enter your name", "");
                 newName.set("name", name);
	 }
	  	 
	function fillCard(i){
                number = sayings[Math.floor(Math.random() * sayings.length)];
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
		toggle.backgroundColor = toggle.backgroundColor? "":"#333";
		toggle.color = toggle.color? "":"#fff";

		checkForMingo();
	 });
        function isMarked(cell) {
                if(cell.attr('class')=="marked") {
                        return true;
                } else return false;
        }

	function checkForMingo() {
                resetArrays();
                checkRowsAndCols();
                checkDiags();
                if(!mingo) {
                        checkArrays();
                }
	}

        function checkRowsAndCols() {
                for(var i = 0; i < 5; i++) {
                        for(var j = 0; j < 5; j++) {
                                if(isMarked($('#cell' + (j + 5 * i)))) {
                                        col[i]++;
                                }
                                if(isMarked($('#cell' + (j * 5 + i)))) {
                                        row[i]++;
                                }
                        }
                }
        }
        function checkDiags() {
                for(var i = 0; i < 5; i++) {
                        if(isMarked($('#cell' + (i*6)))) {
                                diag[0]++;
                        }
                        if(isMarked($('#cell' + (4+ i*4)))) {
                                diag[1]++;
                        }
                }
        }
        function checkArrays() {
                for(var i = 0; i < 5; i++) {
                        if(col[i] == 5 || row[i] == 5 || 
                          diag[0] == 5 || diag[1] == 5) {
                                mingo = true;
                                alert("MINGO!");
                                saveNameInDb();
                                break;
                        }
                }
        }
        function saveNameInDb() {
                newName.save(null, {
                        success: function(newName) {
                        // Execute any logic that should take place after the object is saved.
                        //alert('New object created with objectId: ' + newName.id);
                },
                error: function(newName, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    //alert('Failed to create new object, with error code: ' + error.message);
                  }
                });
        }
 });

