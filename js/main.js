var $sessionValue = $(".session.amount"),
    $breakValue = $(".break.amount"),
    $clockTimer = $(".timer"),
    $clockFace = $(".clock-face"),
    breakLength = 5,
    sessionLength = 20,
    currentTime = 1,
    currentSeconds = 1200,
    breakSeconds = 300,
    timer;

updateTimer();

function startCountDown() {  
  timer = setInterval(function(){ 
      $clockTimer.html(Math.floor(currentSeconds / 60) + ':' + ((currentSeconds % 60 < 10) ? '0' + currentSeconds % 60 : currentSeconds % 60));
      currentSeconds--;
      if (currentSeconds === 0) {
      	alert("Break Time");
        pauseCountDown();
        setCurrentTime();
        startBreakCountDown();
      }
  }, 1000);
}

function startBreakCountDown() {
  timer = setInterval(function(){ 
    $clockTimer.html(Math.floor(breakSeconds / 60) + ':' + ((breakSeconds % 60 < 10) ? '0' + breakSeconds % 60 : breakSeconds % 60));
    breakSeconds--;
    if (breakSeconds === 0) {
  		alert("Work Time");
  		pauseCountDown();
      setBreakTime();
    	startCountDown();
  	};
  }, 1000);
}

function setBreakTime() {
  breakSeconds = breakLength * 60;
}

function pauseCountDown() {
	clearInterval(timer);
}

function decBreakLength() {
  if (breakLength > 0) {
    breakLength--;
  };
}

function incBreakLength() {
  breakLength++;
}

function decSessionLength() {
  if(sessionLength > 0) {
    sessionLength--;
  };
}

function incSessionLength() {
  sessionLength++;
}

function setCurrentTime() {
  currentSeconds = sessionLength * 60;
}

function updateBreakLength() {
  $breakValue.text(breakLength);
}

function updateSessionLength() {
  $sessionValue.text(sessionLength);
}

function updateTimer() {
  $clockTimer.text(sessionLength);
}

/* Break Length Controller */
$(".break.decrease").click(function(){
	decBreakLength();
	updateBreakLength();
});

$(".break.increase").click(function() {
	incBreakLength();
  updateBreakLength();
});

/* Session Length Controller */
$(".session.decrease").click(function(){
	decSessionLength();
  setCurrentTime();
	updateSessionLength();
  updateTimer();
  pauseCountDown();
});

$(".session.increase").click(function() {
	incSessionLength();
  setCurrentTime();
	updateSessionLength();
  updateTimer();
  pauseCountDown();
});

$clockFace.click(function() {
  $(this).toggleClass("toggled");
  if ($(this).hasClass("toggled")) {
  	startCountDown();
  } else {
  	pauseCountDown();
  }
});