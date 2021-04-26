/*
  Nom: requetes.js
  Auteur: Yulia Khonyak
  Date de création: Avril 2021
*/

function chargerDonnees(valeur) {
    fetch('donnees/hopitaux.json')
    .then((reponse) => {
        if (reponse.status !== 200) {
             document.getElementById('statusBox').placeholder = 'Pas trouvé le fichier voulu ' +
                reponse.status;
            setStyleStatusBox('erreur');
            return;
        }

        reponse.json().then((hopitaux) => {
            switch(valeur) {
                case 'hospitalisationsPatient':
                    listeDossierPatients(hopitaux.patients)
                    break;
                case 'hospitalisations':
                    creationTable(hopitaux.hospitalisations,null, 'hospitalisations');
                    break;
                case 'patients':
                default:
                    creationTable(hopitaux.patients, null, 'patients');

            }
        });
    })
    .catch(function(err) {
        document.getElementById('statusBox').placeholder = 'Problème, essayez plus tard';
        setStyleStatusBox('erreur');
    });
}

function chargeSelection() {
    let selection = document.getElementById('hospitalisationsPatient');

    if (selection.selectedIndex > 0) {
        fetch('donnees/hopitaux.json')
            .then((reponse) => {
                if (reponse.status !== 200) {
                    document.getElementById('statusBox').placeholder = 'Pas trouvé le fichier voulu ' + reponse.status;
                    setStyleStatusBox('erreur');
                    return;
                }

                reponse.json().then((hopitaux) => {
                    creationTable(hopitaux.hospitalisations, selection.value, 'hospitalisationsPatient2');
                });
            })
            .catch(function(err) {
                document.getElementById('statusBox').placeholder = 'Problème, essayez plus tard';
                setStyleStatusBox('erreur');
            });
    }
}

