const btnGioca = document.getElementById('gioca')
const selectDifficolta = document.getElementById('difficolta');
const htmlMain = document.querySelector('main')
const r = document.querySelector(':root');


btnGioca.addEventListener('click', function(){
    campoMinato();
})

// funzioni

function campoMinato(){
    // richiamo valore del select 
    let valoreDifficolta = parseInt(selectDifficolta.value)

    let bombe = generazionebombe( valoreDifficolta)

    let gameOver = false
    let score = 0

    // reset variabile css 
    variabileDifficolta(valoreDifficolta)

    // refresh del main 
    htmlMain.innerHTML = ''

    // generazione della griglia 
    let divGriglia = document.createElement('div')

    // con aggiunta classe
    divGriglia.classList.add('griglia')

    // inserimento dopo il click 
    htmlMain.append(divGriglia)




    // generare le celle 
    for (let i = 1; i <= valoreDifficolta; i++ ){
        let divCella = document.createElement('div')
        divCella.classList.add('item')

        // numero nella cella 
        divCella.innerText = i

        document.querySelector('.griglia').append(divCella)

        divCella.addEventListener('click', function(){
            console.log(i)

            if(!gameOver){
                // controllo presenza della bomba 
                if( !bombe.includes(i)){
                    this.classList.add('clicked')
                    score++
                } else{
                    this.classList.add('clicked-bomb')
                    gameOver = true
                    document.querySelector('#game-over').append(document.innerHTML = `Hai Perso: con ${score} punti`)
                    this.innerHTML = `<i class="fa-solid fa-bomb fa-beat" style="color: #b30000;"></i>`
                    // alert( 'Hai perso, Riprova!' )
                    
                }
            } else{
                htmlMain.innerHTML = ''
                document.querySelector('#game-over').innerHTML = ``
            }
            
            
        })
    }


}

function variabileDifficolta(x) {
    x = Math.sqrt(x)

    // aggiunta della variabile del --numeocelle per selezionare la difficolta con il select 
    r.style.setProperty('--numCelle', x);
}

function generazionebombe(difficoltaParam){
    const arrayBombe = []
    

    // creazione 16 bombe 
    for( let k = 0; arrayBombe.length < 16; k++){

        let bomb = numRandom(1, difficoltaParam)
         if(!arrayBombe.includes( bomb )){
            arrayBombe.push (bomb)
         }
    }

   

    console.log( arrayBombe )
    return arrayBombe
}

function numRandom(min, max){
    return Math.floor(Math.random() * max) + min
}