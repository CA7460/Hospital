/*
  Nom: hospitalisations.js
  Auteur: Yulia Khonyak
  Date de création: Avril 2021
*/

let buttonSelectionne = '';

function initialisation() {
    document.getElementById('btnClear').style.display = "none";
}

function focused(valeur){
    buttonSelectionne = valeur;

    clearFocused(['patients', 'hospitalisations', 'hospitalisationsPatient2']);

    setStatus(valeur);
}

function clearFocused(valeurs) {
    for (let valeur of valeurs) {
        let selectedElement = document.getElementById(valeur);
        if(selectedElement != null && selectedElement.hasChildNodes() && selectedElement.firstElementChild.classList.contains('icon-box-cliquee')) {
            selectedElement.firstElementChild.classList.remove('icon-box-cliquee');
        }
    }
}

function setStatus(valeur){
    let selectedElement = document.getElementById(valeur);
    selectedElement.firstElementChild.classList.add('icon-box-cliquee');

    if (valeur === "hospitalisationsPatient2") {
        document.getElementById('statusBox').placeholder = "Hospitalisations par patient";
    }

    if (valeur === "hospitalisations") {
        document.getElementById('statusBox').placeholder = "Liste des hospitalisations";
    }

    if (valeur === "patients") {
        document.getElementById('statusBox').placeholder = "Liste de patients";
    }
}


function listeDossierPatients(listerPatients) {
    clearData('contenu');
    clearData('contenu2');

    let contenu = document.getElementById('contenu2');
    let element = document.getElementById('hospitalisationsPatient');

    if(element == null) {
        let select = document.createElement('select');
        select.id = 'hospitalisationsPatient';
        select.className = 'form-select';
        select.setAttribute('onchange', 'chargeSelection();');
        contenu.append(select);

        let list = document.getElementById('hospitalisationsPatient');
        list.options.add(new Option('Sélectionnez le numéro de dossier du patient', ''));

        for (let index in listerPatients) {
            list.options.add(new Option(listerPatients[index].dossier + ' - ' + listerPatients[index].prenom + ' ' + listerPatients[index].nom, listerPatients[index].dossier));
        }

        document.getElementById('statusBox').placeholder = "Hospitalisations par patient";
    }
}

function clearData(valeur) {
    console.log(buttonSelectionne);
    setStatus(buttonSelectionne);

    document.getElementById('btnClear').style.display = "none";
    if(valeur == 'contenu') {
        let list = document.getElementById('hospitalisationsPatient');
        if(list != null) {
            list.selectedIndex = 0;
        }
    }

    let elements = document.getElementById(valeur);
    while (elements.hasChildNodes()) {
        elements.removeChild(elements.firstChild)
    }
}

function creationTable(listeDonnees, selection, tabValeur) {
    if(selection == null) {
        clearData('contenu2');
    }

    let records = 0;
    let table = document.createElement("table");
    for(let row = -1; row < listeDonnees.length; row++) {
        if(row == -1) {
            let tr = table.insertRow(-1);
            let header = Object.keys(listeDonnees[row+1]);
            for(let cell = 0; cell < header.length; cell++) {
                let th = document.createElement("th");
                th.innerHTML = header[cell];
                tr.appendChild(th);
                tr.setAttribute('id','tab_ligneTitre')
            }
        } else {
            let value = Object.values(listeDonnees[row]);
            if(selection != null) {
                if(value[1] == selection) {
                    records++;
                    let tr = table.insertRow(-1);
                    for(let cell = 0; cell < value.length; cell++) {
                        let tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = value[cell];
                    }
                }
            } else {
                records++;
                let tr = table.insertRow(-1);
                for(let cell = 0; cell < value.length; cell++) {
                    let tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = value[cell];
                }
            }
        }
    }

    if (records === 0) {
        clearData('contenu');
    } else {
        setStyleStatusBox('statusBox-ok');

        table.className = 'table table-bordered table-hover table-striped styled-table';

        let divContainer = document.getElementById("contenu");
        divContainer.innerHTML = '';
        divContainer.appendChild(table);
    }

    if(records > 0) {
        document.getElementById('btnClear').style.display = "block";
    } else {

    }

    if (tabValeur === "hospitalisationsPatient2") {
        document.getElementById('statusBox').placeholder = "Nombre d'hospitalisations par patient:  " + records;
    }

    if (tabValeur === "hospitalisations") {
        document.getElementById('statusBox').placeholder = "Nombre d'hospitalisations:  " + records;
    }

    if (tabValeur === "patients") {
        document.getElementById('statusBox').placeholder = "Nombre total de patients:  " + records;
    }

    setStyleStatusBox('statusBox-ok');
}

function setStyleStatusBox(valeurStatusBox) {
    let statusBox = document.getElementById('statusBox');

    if (valeurStatusBox === "erreur") {
        statusBox.classList.add('statusBox-erreur');
    } else {
        statusBox.classList.add('statusBox-ok');
    }
}


