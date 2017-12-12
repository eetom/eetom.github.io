// JS for ToDo List Proto

  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Create a "timer" button and append it to each list item
  var myNodelist2 = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist2.length; i++) {
    var timer = document.createElement("SPAN");
    var timertxt = document.createTextNode("Pause");
    var timeicon = document.createElement("i");
    timeicon.className = "fa fa-clock-o";
    timer.className = "pause";
    timer.appendChild(timeicon);
    timer.appendChild(timertxt);
    myNodelist2[i].appendChild(timer);
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
    var timertxt = document.createTextNode("start timer");
    var timericon = document.createElement("i");
    timericon.className = "fa fa-clock-o";
    timer.className = "pause timer initiate";
    timer.appendChild(timericon);
    timer.appendChild(timertxt);
    li.appendChild(timer);

    for (i = 0; i < timer2.length; i++) {
      timer2[i].onclick = function() {
      if (this.className === 'pause timer'){
        this.className = 'start timer';
        this.innerHTML = '<i class="fa fa-hourglass-start" aria-hidden="true"></i> Timing 00:00';
      } else {
        this.className = 'pause timer';
        this.innerHTML = '<i class="fa fa-ban" aria-hidden="true"></i> Pause 00:00';
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

