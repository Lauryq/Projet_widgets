var now = new Date ();

var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
var jour = now.getDate ();


document.getElementById("mois").innerHTML = (mois[now.getMonth()]);
document.getElementById("jour").innerHTML = jour;