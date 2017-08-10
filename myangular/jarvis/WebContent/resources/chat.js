	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;

	recognition.onresult = function(event) {
		var interim_transcript = '';
		var final_transcript = ''

		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0].transcript;
			}
		}
		console.log((new Date).toLocaleTimeString());
		final_transcript = final_transcript;
		populateUserText(final_transcript);
	}

	recognition.onerror = function(event) {
		console.log("Error");
	}

	recognition.onend = function() {
		console.log("On end");
		recognition.onresult(event);
	}

	function listen(event, greet) {
		recognition.lang = 'en-US';
		recognition.continious = true;
		recognition.interimResults = false;
		//recognition.maxAlternatives = 5;
		if(greet){
			greeting();
		}
		console.log((new Date).toLocaleTimeString());
		recognition.start();
	}

	function speech(text) {
		var u = new SpeechSynthesisUtterance();
		u.text = text;
		u.lang = 'en-US';
		u.rate = 0.5;
		web.addMessage(text);
		web.processMessages();
		//speechSynthesis.speak(u);
	}

	function greeting() {
		var greeting = "Hello, I am Eva and will be assisting you today.";
		speech(greeting);
		popualteIvaGreeting(greeting);
	}

	var two_line = /\n\n/g;
	var one_line = /\n/g;
	function linebreak(s) {
		return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}

	var first_char = /\S/;
	function capitalize(s) {
		return s.replace(first_char, function(m) {
			return m.toUpperCase();
		});
	}

	function toggleMic() {
		if (document.getElementById("input").name == 'mic') {
			document.getElementById("input").src = "./resources/stop.png";
			document.getElementById("input").name = 'stop';
			info_msg.innerHTML = "Listening. Click stop icon when you are done.";
			if(document.getElementById("iva_span1").style.display == "none"){
				listen(event,true);	
			}else{
				listen(event,false);
			}
		} else if (document.getElementById("input").name == 'stop') {
			document.getElementById("input").src = "./resources/mic.png";
			document.getElementById("input").name = 'mic';
			info_msg.innerHTML = "Click on the microphone icon and begin speaking.";
			recognition.stop();
		}
		//console.log(document.getElementById("input").name);
	}

	function popualteIvaGreeting(text) {
		document.getElementById("iva_span1").style.display = "";
		iva_text.innerHTML = capitalize(text);
	}
	
	function popualteIvaResponse(text) {
		results.innerHTML += '<span class=\"iva\" id=\"iva_span2\" style=\"text-align: center;\"> <img class=\"round\" src=\"./resources/iva.png\" width=\"39\" height=\"39\" /> <div style=\"display: inherit;\"><span id=\"iva_text2\" class=\"question\" id=\"iva_text\">'+text+'</span></div></span>\</br>';
	}

	
	function populateUserText(text) {
		if(document.getElementById("user_span").style.display == "none"){
			document.getElementById("user_span").style.display = "";
			user_text.innerHTML = capitalize(text);
			if (wait()) {
				IvaSpeaking("");
			}	
		}else{
			results.innerHTML += '<span class=\"user\" id=\"user_span2\" style=\"text-align: right;\"> <span id=\"user_text2\" class=\"final\" >'+text+'</span> <img class=\"round\" src=\"./resources/userdp.png\" width=\"39\" height=\"39\" /></span>\</br>';
			IvaSpeaking("thanks");
		}
	}

	function wait() {
		var timeleft = 10;
		var downloadTimer = setInterval(function() {
			timeleft--;
			if (timeleft <= 0)
				clearInterval(downloadTimer);
		}, 1000);
		return true;
	}

	function IvaSpeaking(text) {
		if(text == ""){
		var response = "Lets collect some quick information about yourself like name, age and location";
		}else{
			response = "Thank you."
		}
		speech(response);
		popualteIvaResponse(response);
	}
	