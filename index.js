let object ={
    "Goalers":{
        Meccsek: 3,
        Győzelmek: 3,
        Vereségek: 0,
        Döntetlenek: 0,
        Gólok: 12,
        Kapott: 6,
        Pontok: 0
    },
    "Koffein United":{
        Meccsek: 3,
        Győzelmek: 0,
        Vereségek: 2,
        Döntetlenek: 1,
        Gólok: 6,
        Kapott: 10,
        Pontok: 0
    },
    "Les City":{
        Meccsek: 3,
        Győzelmek: 0,
        Vereségek: 2,
        Döntetlenek: 1,
        Gólok: 6,
        Kapott: 9,
        Pontok: 0
    },
    "FC Kerekerdő":{
        Meccsek: 3,
        Győzelmek: 2,
        Vereségek: 1,
        Döntetlenek: 0,
        Gólok: 8,
        Kapott: 7,
        Pontok: 0
    }
}

let csapatok = Object.keys(object)
let adatok = Object.keys(object[csapatok[0]])


function Pontszamitas() {
  
  for (const csapat of Object.values(object)) 
  {
    csapat.Pontok = csapat.Győzelmek * 3 + csapat.Döntetlenek;
  }
}

function ObjectKiiras(){

    let tablazat = "<table>"
    
    //Adatok nevei (elso sor)
    tablazat += "<tr><th></th>";
    for (let i = 0; i < adatok.length; i++) {
        tablazat += `<th>${adatok[i]}</th>`;
    }
    tablazat += "</tr>";

    //Fő kiíratás
    for (let i = 0; i < csapatok.length; i++) 
    {
        tablazat += "<tr>";
        tablazat += `<th>${csapatok[i]}</th>`;

        for (let j = 0; j < adatok.length; j++) 
        {
            tablazat += `<td>${object[csapatok[i]][adatok[j]]}</td>`;
        }      
        tablazat += "</tr>";
    }

    tablazat += "</table>"
    document.getElementById("tablazat").innerHTML = tablazat
}

Pontszamitas()
ObjectKiiras()

console.log(adatok)

function CsapatListaFrissitese() {
    Pontszamitas();

    csapatok = Object.keys(object);
    csapatok.sort(function (csapatA, csapatB) {
        return object[csapatB].Pontok - object[csapatA].Pontok;
    });

    ObjectKiiras();

    let modositandoCsapat = document.getElementById("modositando-csapat");
    let torlendoCsapat = document.getElementById("torlendo-csapat");
    modositandoCsapat.innerHTML = '<option value="">Válassz csapatot</option>';
    torlendoCsapat.innerHTML = '<option value="">Válassz csapatot</option>';

    for (let i = 0; i < csapatok.length; i++) {
        let modositasiOpcio = document.createElement("option");
        modositasiOpcio.value = csapatok[i];
        modositasiOpcio.textContent = csapatok[i];
        modositandoCsapat.appendChild(modositasiOpcio);

        let torlesiOpcio = document.createElement("option");
        torlesiOpcio.value = csapatok[i];
        torlesiOpcio.textContent = csapatok[i];
        torlendoCsapat.appendChild(torlesiOpcio);
    }
}

function CsapatAdatokBeolvasasa(elotag) {
    return {
        Meccsek: Number(document.getElementById(elotag + "-meccsek").value),
        Győzelmek: Number(document.getElementById(elotag + "-gyozelmek").value),
        Vereségek: Number(document.getElementById(elotag + "-veresegek").value),
        Döntetlenek: Number(document.getElementById(elotag + "-dontetlenek").value),
        Gólok: Number(document.getElementById(elotag + "-golok").value),
        Kapott: Number(document.getElementById(elotag + "-kapott-golok").value),
        Pontok: 0
    };
}

function CsapatAdatokEllenorzese(csapat) {
    if (csapat.Meccsek !== csapat.Győzelmek + csapat.Vereségek + csapat.Döntetlenek) {
        alert("A lejátszott mérkőzések száma egyezzen meg a győzelmek, vereségek és döntetlenek összegével.");
        return false;
    }

    return true;
}

function ModositoUrlapKitoltese() {
    let csapatNev = document.getElementById("modositando-csapat").value;
    if (csapatNev === "") {
        return;
    }

    let csapat = object[csapatNev];
    document.getElementById("modositas-csapatnev").value = csapatNev;
    document.getElementById("modositas-meccsek").value = csapat.Meccsek;
    document.getElementById("modositas-gyozelmek").value = csapat.Győzelmek;
    document.getElementById("modositas-veresegek").value = csapat.Vereségek;
    document.getElementById("modositas-dontetlenek").value = csapat.Döntetlenek;
    document.getElementById("modositas-golok").value = csapat.Gólok;
    document.getElementById("modositas-kapott-golok").value = csapat.Kapott;
}

document.getElementById("csapat-hozzaadas-gomb").addEventListener("click", function () {
    let urlap = document.getElementById("csapat-hozzaadas-urlap");
    if (!urlap.reportValidity()) {
        return;
    }

    let csapatNev = document.getElementById("hozzaadas-csapatnev").value.trim();
    if (csapatNev === "" || csapatNev === "__proto__" || csapatNev.includes("<") || csapatNev.includes(">")) {
        alert("Adj meg egy érvényes csapatnevet.");
        return;
    }

    if (Object.keys(object).includes(csapatNev)) {
        alert("Már létezik ilyen nevű csapat.");
        return;
    }

    let csapat = CsapatAdatokBeolvasasa("hozzaadas");
    if (!CsapatAdatokEllenorzese(csapat)) {
        return;
    }

    object[csapatNev] = csapat;
    urlap.reset();
    CsapatListaFrissitese();
});

document.getElementById("modositando-csapat").addEventListener("change", ModositoUrlapKitoltese);

document.getElementById("csapat-modositas-gomb").addEventListener("click", function () {
    let urlap = document.getElementById("csapat-modositas-urlap");
    if (!urlap.reportValidity()) {
        return;
    }

    let regiNev = document.getElementById("modositando-csapat").value;
    if (regiNev === "") {
        alert("Válassz ki egy módosítandó csapatot.");
        return;
    }

    let ujNev = document.getElementById("modositas-csapatnev").value.trim();
    if (ujNev === "" || ujNev === "__proto__" || ujNev.includes("<") || ujNev.includes(">")) {
        alert("Adj meg egy érvényes csapatnevet.");
        return;
    }

    if (ujNev !== regiNev && Object.keys(object).includes(ujNev)) {
        alert("Már létezik ilyen nevű csapat.");
        return;
    }

    let csapat = CsapatAdatokBeolvasasa("modositas");
    if (!CsapatAdatokEllenorzese(csapat)) {
        return;
    }

    delete object[regiNev];
    object[ujNev] = csapat;
    CsapatListaFrissitese();
    document.getElementById("modositando-csapat").value = ujNev;
    ModositoUrlapKitoltese();
});

document.getElementById("csapat-torles-gomb").addEventListener("click", function () {
    let csapatNev = document.getElementById("torlendo-csapat").value;
    if (csapatNev === "") {
        alert("Válassz ki egy törlendő csapatot.");
        return;
    }

    if (confirm('Biztosan törlöd ezt a csapatot: "' + csapatNev + '"?')) {
        delete object[csapatNev];
        document.getElementById("csapat-modositas-urlap").reset();
        CsapatListaFrissitese();
    }
});

CsapatListaFrissitese();