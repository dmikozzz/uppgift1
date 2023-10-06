const prompt = require(`prompt-sync`)({ sigint: true })

const fs = require('fs')
const questions = require('./questions.json');
const answers = require('./answers.json');

const currentDate = new Date().toLocaleString();
let array = [];

let hund = 0;
let katt = 0;
let kanin = 0;
let fisk = 0;

for (let i = 0; i < answers.length; i++) {
  array.push(answers[i]);
}

console.log(`Välkommen till frågeformuläret`);

dittNamn = prompt("Var vänlig ange ditt namn: ")
console.log("Var vänlig och svara med J för JA och N för NEJ.");

let validInput = false;
while (!validInput) {

  for (let i = 0; i < questions.length; i++) {
    console.log(questions[i].questions);

    let a = prompt("J/N: ").trim().toUpperCase();
    switch (a) {
      case 'J':
        hund += questions[i].hundJa;
        katt += questions[i].kattJa;
        kanin += questions[i].kaninJa;
        fisk += questions[i].fiskJa;

        break;
      case 'N':
        hund += questions[i].hundNej;
        katt += questions[i].kattNej;
        kanin += questions[i].kaninNej;
        fisk += questions[i].fiskNej;
        break;
      default:
        console.log("Du måste svara med J för JA eller N för NEJ");
        i--;
        break;
    }

  }
  validInput = true;
}

let totalPoints = hund + katt + kanin + fisk

let hundresult = hund / totalPoints * 100;
let kattresult = katt / totalPoints * 100;
let kaninresult = kanin / totalPoints * 100;
let fiskresult = fisk / totalPoints * 100;

let results = [{ djur: 'hund', procent: hundresult.toFixed(2) }, { djur: 'katt', procent: kattresult.toFixed(2) }, { djur: 'kanin', procent: kaninresult.toFixed(2) }, { djur: 'fisk', procent: fiskresult.toFixed(2) }]
results.sort((a, b) => b.procent - a.procent);

const user = {
  datum: currentDate,
  namn: dittNamn,
  resultat: results
}
console.log(user);

array.push(user);

fs.writeFile('./answers.json', JSON.stringify(array, null, 2), (err) => {
  if (err) throw err;
  console.log('Dina svar har sparats.');
});