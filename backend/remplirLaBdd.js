const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const Chercheur = require("./schema/Chercheur")
require('dotenv').config();
// Load an existing workbook
const mongoose = require("mongoose");
mongoose.connect(process.env.URL).then(() => {
    workbook.xlsx.readFile('Fichier LMCS_2024.xlsx')
        .then(() => {
            const sheet = ["Doctorants", "Chercheurs"];
            for (let sheetName of sheet) {

                const worksheet1 = workbook.getWorksheet(sheetName);
                // workbook.eachSheet((worksheet, sheeId) => {
                let row = (sheetName == 'Doctorants') ? 5 : 8;
                for (; row < worksheet1.rowCount; row++) {
                    const chercheur = {};
                    for (let col = 'D'; col <= 'K'; col = String.fromCharCode(col.charCodeAt(0) + 1)) {

                        switch (col) {
                            case 'D':
                                const Nom = worksheet1.getCell('C' + row).value;
                                const Prenom = worksheet1.getCell(col + row).value;
                                chercheur.nomComplet = Prenom + ' ' + Nom;

                                break;
                            case 'E':
                                {
                                    const matricule = worksheet1.getCell(col + row).value;
                                    if (matricule) {
                                        chercheur.Matricule = '' + matricule;
                                    } else chercheur.Matricule = 'undefiend';
                                    //  console.log(chercheur);
                                }
                                break;
                            case 'F':
                                {
                                    const gradeDeRecherch = worksheet1.getCell(col + row).value;
                                    if (gradeDeRecherch)
                                        chercheur.GradeEnsegnement = gradeDeRecherch;
                                    else
                                        chercheur.GradeEnsegnement = 'undefiend';



                                }
                                break;
                            case 'G':
                                {
                                    const etablismenetOrigin = worksheet1.getCell(col + row).value;
                                    chercheur.EtablissementOrigine = etablismenetOrigin;
                                    // console.log(chercheur);





                                }
                                break;

                            case 'H':
                                {
                                    const diplome = worksheet1.getCell(col + row).value;
                                    chercheur.Diplome = (diplome) ? diplome : 'undefinied';



                                }
                                break;
                            case 'I':
                                {
                                    const quality = worksheet1.getCell(col + row).value;

                                    chercheur.Qualité = (quality) ? quality : 'undefiend';

                                }
                                break;
                            case 'J':
                                {
                                    chercheur.statut = 'Actif';
                                }
                                break;
                            case 'K':
                                {
                                    const id = worksheet1.getCell(col + row).value;
                                    chercheur._id = (id) ? id : "undefiend";
                                    const cher = new Chercheur(chercheur);
                                    cher.save().then(() => {

                                    }).catch((err) => { console.log("error") })
                                }
                                break;








                        }

                    }

                    console.log("bien fiat");
                }



            }















        }).catch((err) => {
            console.log(err)
        })
}).catch((err) => {

    console.log(err);
})