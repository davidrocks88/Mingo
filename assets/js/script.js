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
   		"4Chanz", //19
                "Oh Boy",// 20
                "*Laughs Maniacally", //21
                "*Rubs hands together*", //22
                "Interwebs",
                "Have you ever heard of a thing called...",
                "*Brings in a guest lecturer*",
                "*Asks someone to repeat themself*",
                "Never ever trust user input",
                "There you go!",
                "*Points at somebody* \"Fire!\"",
                "Mmmmmmmm"
   		);
        var col = new Array(0,0,0,0,0);
        var row = new Array(0,0,0,0,0);
        var diag = new Array(0,0);
        var number = "";
        var mingo;
        var usedSayings = new Array(sayings.length);
   
        init();
   
	function init(){
		 initializeUsed();
                 for(var i = 0; i<=24; i++){
			fillCard(i);
		 }
                 mingo = false;
                 var name = prompt("Please enter your name", "");
                 newName.set("name", name);
                 newName.set("isPlayer", true);

	}
        function initializeUsed() {
                for(var i = 0; i < sayings.length; i++) {
                        usedSayings[i] = 0;
                }
        }
	  	 
	function fillCard(i){
	        $('#cell' + i).html(getSaying());
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

        function getSaying() {
                var index;
                while(true) {
                        index = Math.floor(Math.random() * sayings.length);
                        if(usedSayings[index] == 0) {
                                usedSayings[index] = 1;
                                return sayings[index];
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
	
        function printAllWinners() {
                var query = new Parse.Query(MingoWinnerName);
                //query.equalTo("isPlayer", true);
                console.log(query[0]);
                // var length = query.length;
                // var winners = new Array(length);
                // for(var i = 0; i < length; i++) {
                //         winners[i] = query[i].get("name");
                // }
                // console.log(winners);

        }

	$('td').click(function(){

                printAllWinners()
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
                                initializeUsed();
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

