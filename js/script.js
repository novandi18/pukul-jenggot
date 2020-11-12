// Pukul si Jenggot
// Novandi Ramadhan @ 2020
// Inspired by Web Programming Unpas

const rumput = $(".rumput");
const jenggot = document.querySelectorAll('.jenggot');
const papanSkor = document.querySelector('.papan-skor');
// const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;


// Random rumput
function randomRumput(rumput) {
  const r = Math.floor(Math.random() * rumput.length);
  const rRandom = rumput[r];
  if (rRandom == tanahSebelumnya) {
    randomRumput(rumput);
  }
  tanahSebelumnya = rRandom;
  return rRandom;
}

// Random waktu muncul jenggot
function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Muncul Jenggot
function munculJenggot() {
  const rRandom = randomRumput(rumput);
    const wRandom = randomWaktu(300, 1000);
    rRandom.classList.add('muncul');

    setTimeout(() => {
        rRandom.classList.remove('muncul');
        if (!selesai) {
            munculJenggot();
        }
    }, wRandom);
}


// Ubah waktu permainan
let waktuGame = $('#pilihan-waktu').val();
function ubahWaktuGame() {
  selectedVal = $('#pilihan-waktu').val();
  
  $('#pilihan-waktu > option').each(function(i, item) {
    if(item.value === waktuGame) {
      $(item).removeAttr("selected");
    }
  });
  
  $('#pilihan-waktu > option').each(function(i, item) {
    if(item.value === selectedVal) {
      $(item).attr("selected", "true");
      waktuGame = $(item).val();
      document.querySelector('.papan-waktu').innerHTML = waktuGame + ":00";
    }
  });
}

// Mulai
function mulai() {
  const durasiGame = waktuGame + "000";
  id = document.getElementById("papan-waktu-mulai");
  document.querySelector('.papan-waktu').innerHTML = waktuGame + ":00";
  document.querySelector('.mulai').classList.add("hidden");
  document.getElementById("clouds").classList.add("hidden");
  id.classList.remove("hidden");
  papanSkor.innerHTML = "0";
  id.innerHTML = "5";
  
  let counter = 5;
  
  setInterval(function() {
    counter--;
    
    if(counter >= 0) {
      id.innerHTML = counter;
    }
      
    if(counter === 0) {

      // Countdown timer 10s
      function Countdown(elem, seconds) {
        let that = {};
        that.elem = elem;
        that.seconds = seconds;
        that.totalTime = seconds * 100;
        that.usedTime = 0;
        that.startTime = +new Date();
        that.timer = null;
        that.count = function() {
          that.usedTime = Math.floor((+new Date() - that.startTime) / 10);
          let tt = that.totalTime - that.usedTime;
          if (tt <= 0) {
            that.elem.innerHTML = '00:00';
            clearInterval(that.timer);
          } else {
            let mi = Math.floor(tt / (60 * 100));
            let ss = Math.floor((tt - mi * 60 * 100) / 100);
            let ms = tt - Math.floor(tt / 100) * 100;
            that.elem.innerHTML = that.fillZero(ss) + ":" + that.fillZero(ms);
          }
        };
          
        that.init = function() {
          if(that.timer){
            clearInterval(that.timer);
            that.elem.innerHTML = '00:00';
            that.totalTime = seconds * 100;
            that.usedTime = 0;
            that.startTime = +new Date();
            that.timer = null;
          }
        };
        
        that.start = function() {
          if(!that.timer){
            that.timer = setInterval(that.count, 10);
          }
        };
        
        that.stop = function() {
          console.log('usedTime = ' + countdown.usedTime);
          if (that.timer) clearInterval(that.timer);
        };
        
        that.fillZero = function(num) {
          return num < 10 ? '0' + num : num;
        };
        
        return that;
      }
        
      let span = document.getElementById('papan-waktu');
      let countdown = new Countdown(span, waktuGame);
      
      id.classList.add("hidden");
      selesai = false;
      document.querySelector('.mulai').classList.add("hidden");
      skor = 0;
      document.querySelector('.ingame').classList.remove("opacity");
      papanSkor.textContent = skor;
      countdown.start();
      munculJenggot();
      setTimeout(() => {
        document.querySelector('.ingame').classList.add("opacity");
        document.querySelector('.mulai').classList.remove("hidden");
        document.getElementById("clouds").classList.remove("hidden");
        selesai = true;
        countdown.init();
      }, durasiGame);
    }
  }, 1000);
  
  id.innerHTML = "5";
}

function pukul() {
  skor++;
  this.parentNode.classList.remove('muncul');
  papanSkor.textContent = skor;
}

jenggot.forEach(r => {
  r.addEventListener('click', pukul);
});


// Option button click show
function showOption() {
  document.querySelector(".optionbar").classList.remove("slide");
  document.querySelector(".config").classList.add("hidden");
  document.querySelector(".config-close").classList.remove("hidden");
}

function hideOption() {
  document.querySelector(".optionbar").classList.add("slide");
  document.querySelector(".config").classList.remove("hidden");
  document.querySelector(".config-close").classList.add("hidden");
}