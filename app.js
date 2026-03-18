var siteStudenti = [];

function vnesiOcenki(brojPredmeti) {
    var ocenki = [];
    for (var i = 1; i <= brojPredmeti; i++) {
        var ocenka = null;
        while (ocenka === null) {
            var vnes = prompt("Внеси оценка за предмет " + i + " (1-10):");
            if (vnes === null) return null;
            var broj = parseInt(vnes);
            if (isNaN(broj) || broj < 1 || broj > 10) {
                alert("Невалидна оценка! Оценката мора да биде помеѓу 1 и 10. Обиди се повторно.");
            } else {
                ocenka = broj;
            }
        }
        ocenki.push(ocenka);
    }
    return ocenki;
}

function presmetajProsek(ocenki) {
    var zbir = 0;
    for (var i = 0; i < ocenki.length; i++) {
        zbir += ocenki[i];
    }
    return zbir / ocenki.length;
}

function prikaziRezultati() {
    if (siteStudenti.length === 0) return;

    var html = "<table class='table table-bordered table-hover'>";
    html += "<thead class='table-dark'><tr>";
    html += "<th>#</th><th>Име</th><th>Оценки</th><th>Просек</th><th>Статус</th>";
    html += "</tr></thead><tbody>";

    for (var i = 0; i < siteStudenti.length; i++) {
        var s = siteStudenti[i];
        var statusClass = s.prosek < 5 ? "ne-pominal" : "pominal";
        var statusText = s.prosek < 5 ? "Не поминал" : "Поминал";

        html += "<tr>";
        html += "<td>" + (i + 1) + "</td>";
        html += "<td>" + s.ime + "</td>";
        html += "<td>" + s.ocenki.join(", ") + "</td>";
        html += "<td>" + s.prosek.toFixed(2) + "</td>";
        html += "<td class='" + statusClass + "'>" + statusText + "</td>";
        html += "</tr>";
    }

    html += "</tbody></table>";
    document.getElementById("rezultati").innerHTML = html;
}

function startApp() {
    var prodolzi = true;

    while (prodolzi) {
        var brojStudenti = parseInt(prompt("Внесете број на студенти:"));

        if (isNaN(brojStudenti) || brojStudenti <= 0) {
            alert("Внесете валиден број на студенти.");
            continue;
        }

        for (var i = 0; i < brojStudenti; i++) {
            var ime = prompt("Внесете име на студент " + (i + 1) + ":");
            if (ime === null || ime.trim() === "") {
                alert("Името не може да биде празно.");
                i--;
                continue;
            }

            var brojPredmeti = parseInt(prompt("Колку предмети има " + ime + "?"));
            if (isNaN(brojPredmeti) || brojPredmeti <= 0) {
                alert("Внесете валиден број на предмети.");
                i--;
                continue;
            }

            var ocenki = vnesiOcenki(brojPredmeti);
            if (ocenki === null) {
                i--;
                continue;
            }

            var prosek = presmetajProsek(ocenki);

            siteStudenti.push({
                ime: ime,
                ocenki: ocenki,
                prosek: prosek
            });
        }

        prikaziRezultati();

        prodolzi = confirm("Дали сакате да продолжите со внесување нови студенти?");
    }

    alert("Програмата е завршена. Резултатите се прикажани на страницата.");
}
