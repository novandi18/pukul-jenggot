// Pukul si Jenggot
// Novandi Ramadhan @ 2020
// Inspired by Web Programming Unpas

const rumput = document.querySelectorAll('.rumput');
const jenggot = document.querySelectorAll('.jenggot');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;

function randomRumput(rumput) {
    const r = Math.floor(Math.random() * rumput.length);
    const rRandom = rumput[r];
    if (rRandom == tanahSebelumnya) {
        randomRumput(rumput);
    }
    tanahSebelumnya = rRandom;
    return rRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

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

function mulai() {
    selesai = false;
    document.querySelector('.mulai').classList.add("hidden");
    skor = 0;
    papanSkor.textContent = skor;
    munculJenggot();
    setTimeout(() => {
        document.querySelector('.mulai').classList.remove("hidden");
        selesai = true;
    }, 10000);
}

function pukul() {
    skor++;
    this.parentNode.classList.remove('muncul');
    pop.play(); 
    papanSkor.textContent = skor;
}

jenggot.forEach(r => {
    r.addEventListener('click', pukul);
});