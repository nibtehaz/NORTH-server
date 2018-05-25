var uniprotIds = ['A0A178W407','A0A0D3BI22','Q7X9V3','A0A078GGS4','A0A078GWL8'];
var proteinName = ['Uncharacterized protein','Uncharacterized protein','Acetyltransferase NSI','BnaCnng04490D protein','BnaC05g29050D protein'];
var organism = ['Arabidopsis thaliana','Brassica napus','Arabidopsis thaliana','Brassica napus','Brassica napus']
var uniprotUrl = 'http://www.uniprot.org/uniprot/';
var currentPgntn = 1;

var firstPage = 1;
var lastPage = 14;

function pgntnClk(pgntnID)
{   
    var oldPgntn = document.getElementById('pgntn'+currentPgntn.toString());

    oldPgntn.classList.remove('active');

    currentPgntn = parseInt(pgntnID[5]);

    var newPgntn = document.getElementById(pgntnID);

    newPgntn.classList.add('active');

    if(currentPgntn==firstPage)
    {
        var arw = document.getElementById("leftArrow");
        arw.classList.add("disabled");
        arw.classList.remove("waves-effect");

        var arw = document.getElementById("rightArrow");
        arw.classList.remove("disabled");
        arw.classList.add("waves-effect");
    }

    else if(currentPgntn==lastPage)
    {
        var arw = document.getElementById("rightArrow");
        arw.classList.add("disabled");
        arw.classList.remove("waves-effect");

        var arw = document.getElementById("leftArrow");
        arw.classList.remove("disabled");
        arw.classList.add("waves-effect");
    }


}


function updateTable()
{
    currentPgntn--;

    document.getElementById("td11").innerHTML = proteinName[currentPgntn*5];
    document.getElementById("td21").innerHTML = proteinName[currentPgntn*5+1];
    document.getElementById("td31").innerHTML = proteinName[currentPgntn*5+2];
    document.getElementById("td41").innerHTML = proteinName[currentPgntn*5+3];
    document.getElementById("td51").innerHTML = proteinName[currentPgntn*5+4];

    document.getElementById("td12").innerHTML = organism[currentPgntn*5];
    document.getElementById("td22").innerHTML = organism[currentPgntn*5+1];
    document.getElementById("td32").innerHTML = organism[currentPgntn*5+2];
    document.getElementById("td42").innerHTML = organism[currentPgntn*5+3];
    document.getElementById("td52").innerHTML = organism[currentPgntn*5+4];

    document.getElementById("td13").innerHTML = uniprotIds[currentPgntn*5];
    document.getElementById("td23").innerHTML = uniprotIds[currentPgntn*5+1];
    document.getElementById("td33").innerHTML = uniprotIds[currentPgntn*5+2];
    document.getElementById("td43").innerHTML = uniprotIds[currentPgntn*5+3];
    document.getElementById("td53").innerHTML = uniprotIds[currentPgntn*5+4];

    document.getElementById("td14").innerHTML = '<a class="waves-effect waves-light btn" target="_blank" href="' + uniprotUrl + uniprotIds[currentPgntn*5] +'">UniProt</a>';
    document.getElementById("td24").innerHTML = '<a class="waves-effect waves-light btn" target="_blank" href="' + uniprotUrl + uniprotIds[currentPgntn*5+1] +'">UniProt</a>';
    document.getElementById("td34").innerHTML = '<a class="waves-effect waves-light btn" target="_blank" href="' + uniprotUrl + uniprotIds[currentPgntn*5+2] +'">UniProt</a>';
    document.getElementById("td44").innerHTML = '<a class="waves-effect waves-light btn" target="_blank" href="' + uniprotUrl + uniprotIds[currentPgntn*5+3] +'">UniProt</a>';
    document.getElementById("td54").innerHTML = '<a class="waves-effect waves-light btn" target="_blank" href="' + uniprotUrl + uniprotIds[currentPgntn*5+4] +'">UniProt</a>';

    currentPgntn++;
}

