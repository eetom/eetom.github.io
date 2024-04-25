// JS for Taskit

  var seconds = 0;
  var minutes = 0;
  var hours = 0;

  // Create a "close" and "timer" button and append it to each list item
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    var timer = document.createElement("SPAN");
    var timertxt = document.createTextNode("Pause");
    var timeicon = document.createElement("i");
    span.className = "close";
    span.appendChild(txt);
    timeicon.className = "fa fa-clock-o";
    timer.className = "pause basic";
    timer.appendChild(timeicon);
    timer.appendChild(timertxt);
    myNodelist[i].appendChild(span);
    myNodelist[i].appendChild(timer);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  // Click on a timer button to hide the current list item
  var timer2 = document.getElementsByClassName("timer");
  var i;
  for (i = 0; i < timer2.length; i++) {
    timer2[i].onclick = function() {
      if (this.className === 'pause'){
        this.className = 'start';
      } else {
        this.className = 'pause';
      }
    }
  }

  window.onload=function(){
    // Add a "checked" symbol when clicking on a list item
    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);


    var seconds = 0o0;
    var tens = 0o0;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval;

    buttonStart.onclick = function () {

      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }

    buttonStop.onclick = function () {
      clearInterval(Interval);
    }

    buttonReset.onclick = function () {
      clearInterval(Interval);
      tens = "00";
      seconds = "00";
      appendTens.innerHTML = tens;
      appendSeconds.innerHTML = seconds;
    }

    function startTimer() {
      tens++;

      if (tens <= 9) {
        appendTens.innerHTML = "0" + tens;
      }

      if (tens > 9) {
        appendTens.innerHTML = tens;

      }

      if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }

      if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
      }

    }


  }

  // Create a new list item when clicking on the "Add" button
  function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var timer = document.createElement("SPAN");
    var timericon = document.createElement("i");
    timericon.className = "fa fa-clock-o";
    timer.className = "pause timer initiate";
    timer.appendChild(timericon);
    li.appendChild(timer);

    for (i = 0; i < timer2.length; i++) {
      timer2[i].onclick = function() {
      if (this.className === 'start timer'){
        this.className = 'pause timer';
        this.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i><span class="watch">' + hours + ':' + minutes + ':' + seconds + '</span>';
      } else {
        this.className = 'start timer';
        this.innerHTML = '<i class="fa fa-hourglass-start" aria-hidden="true"></i><span class="watch">' + hours + ':' + minutes + ':' + seconds + '</span>';
      }
        console.log('TIMER START!')
      }
    }

    var span = document.createElement("SPAN");
    var closeicon = document.createElement("i");
    closeicon.className = "fa fa-times";
    span.className = "close";
    span.appendChild(closeicon);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        console.log('CLOSED!')
      }
    }
  }

  function saveList() {
    alert("This feature is not ready!");
  }

