// mappa con i nomi delle personalità (con aggiornamento del valore in base a quante volte verranno scelte) 
    const mappa_personalita = {'blep' : 0, 
                         'burger' : 0, 
                         'cart': 0, 
                         'dopey': 0, 
                         'happy': 0, 
                         'nerd': 0, 
                         'shy': 0, 
                         'sleeping': 0, 
                         'sleepy': 0
                        };

    //array per salvare le scelte dell'utente
    let salvate = ["one", "two", "three"];

    //const per selezionare ogni blocco
    const blocchi = document.querySelectorAll(".choice-grid div");

    for(const blocco of blocchi)
    {
        blocco.addEventListener("click", click_blocchi);
    }

    function click_blocchi(event)
    {
        const risposta = event.currentTarget;//blocco cliccato
        const image = risposta.querySelector(".checkbox");
        image.src = "./images/checked.png";
        const risposte = document.querySelectorAll(".choice-grid div");//ho bisogno di selezionare tutti i blocchi
        risposta.classList.add("immagine_cliccata");      
       for(const risposta_scartata of risposte)
        {
            if(risposta_scartata !== risposta && risposta_scartata.dataset.questionId === risposta.dataset.questionId) 
            {
                risposta_scartata.classList.add("overlay");
                 risposta_scartata.classList.remove("immagine_cliccata");
               const immagine_non_cliccata = risposta_scartata.querySelector(".checkbox");
                immagine_non_cliccata.src = "./images/unchecked.png";
            
                risposta.classList.remove("overlay");
            }   
        }

        //setta il vettore in base alle risposte date
        for(let i=0; i<salvate.length; i++)
        {
            if(salvate[i] === risposta.dataset.questionId)
            {
                salvate[i] = risposta.dataset.choiceId;
            }
        }

        //l'utente ha raggiunto la fine del quiz, quindi dovrà essre impossibile un nuovo click
        if(salvate[0] !== "one" && salvate[1] !== "two" && salvate[2] !== "three")
        {
             for(const blocco of blocchi)
            {
                blocco.removeEventListener("click", click_blocchi);
            }

                const blocco_result = document.querySelector(".hidden");
                blocco_result.classList.remove("hidden");

                const mappa_personalita = trovaRisultato();

                 title.append(RESULTS_MAP[mappa_personalita].title);
                 contents.append(RESULTS_MAP[mappa_personalita].contents);
            
        }
      
                //associo al button un listener per ricaricare il quiz
                const button = document.querySelector("button");
                button.addEventListener("click", reset);
    }

    //const per visualizzare il risultato
    const title = document.querySelector("h2");
    const contents = document.querySelector("p");  


    function trovaRisultato()
    {
        for(let i=0; i<salvate.length; i++)
        {
            mappa_personalita[salvate[i]]++;
        }

       for(let nome_mappa_personalita in mappa_personalita)
       {
           if(mappa_personalita[nome_mappa_personalita] > 1)
           {
               return nome_mappa_personalita;
           }

           return salvate[0];
       }
    }
    //ricarico la pagina
    function reset()
    {
          //riporto la mappa ai valori iniziali 
       for(let nome_mappa_personalita in mappa_personalita)
       {
           mappa_personalita[nome_mappa_personalita] = 0;
       }

        salvate = ["one", "two", "three"];//riposto l'array ai valori iniziali

        for(const blocco of blocchi)
        {   //riporto i blocchi alle loro situazioni iniziali
            const image = blocco.querySelector(".checkbox");
            image.src = "./images/unchecked.png";
            blocco.classList.remove("overlay");
            blocco.classList.remove(".checkbox");
            blocco.classList.remove("immagine_cliccata");
            blocco.addEventListener("click", click_blocchi);
        }
        //riporto il risultato alla situazione iniziale
        blocco_result = document.querySelector("#result");
       blocco_result.classList.add("hidden");
       title.innerHTML = " ";
       contents.innerHTML = " ";
    }


    



