console.log("starting fetch!");

const getLedgerTitleURL = "https://localhost:8000/api/ledger/getLedgerTitles";

const getParticularsOfLedgerURL =
  "https://localhost:8000/api/particular/getParticularsOfLedger";

const widgetContainer = document.getElementById("title-widget-container");
const selectedLedgerTableContainer = document.getElementById(
  "selected-ledger-table-container",
);

//create ledger table in the shadows
function createLedgerTable() {
  let table = document.createElement("table");
  table.setAttribute("id", "dr-ledger-table");
  selectedLedgerTableContainer.append(table);

  let headerRow = document.createElement("tr");
  table.append(headerRow);

  let headingArray = new Array(3);

  for (let i = 0; i < 3; i++) {
    headingArray[i] = document.createElement("th");
    headerRow.append(headingArray[i]);
  }

  headingArray[0].textContent = "Id";
  headingArray[1].textContent = "Title";
  headingArray[2].textContent = "Dr";

  table = document.createElement("table");
  table.setAttribute("id", "cr-ledger-table");
  selectedLedgerTableContainer.append(table);

  headerRow = document.createElement("tr");
  table.append(headerRow);

  headingArray = new Array(3);

  for (let i = 0; i < 3; i++) {
    headingArray[i] = document.createElement("th");
    headerRow.append(headingArray[i]);
  }

  headingArray[0].textContent = "Id";
  headingArray[1].textContent = "Title";
  headingArray[2].textContent = "cr";
}

//get selected ledger
function getParticularsOfLedger(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const drTable = document.getElementById("dr-ledger-table");
      const crTable = document.getElementById("cr-ledger-table");

      //dr
      data.DebitParticulars.forEach((e) => {
        let row = document.createElement("tr");
        drTable.append(row);

        let ParticularId = document.createElement("td");
        ParticularId.innerHTML = e.ParticularId;
        row.append(ParticularId);

        let Title = document.createElement("td");
        Title.innerHTML = e.Title;
        row.append(Title);

        let Amount = document.createElement("td");
        Amount.innerHTML = e.Amount;
        row.append(Amount);
      });

      //cr
      data.CreditParticulars.forEach((e) => {
        let row = document.createElement("tr");
        crTable.append(row);

        let ParticularId = document.createElement("td");
        ParticularId.innerHTML = e.ParticularId;
        row.append(ParticularId);

        let Title = document.createElement("td");
        Title.innerHTML = e.Title;
        row.append(Title);

        let Amount = document.createElement("td");
        Amount.innerHTML = e.Amount;
        row.append(Amount);
      });
    });
}

//update dom from the shadows
function domUpdate(data) {
  data.forEach((e) => {
    let title = document.createElement("span");
    title.innerHTML = e;

    widgetContainer.append(title);

    title.addEventListener("click", function () {
      //add code to execute on click event
      // to clear existing tables
      document.getElementById("dr-ledger-table")?.remove();
      document.getElementById("cr-ledger-table")?.remove();

      createLedgerTable();

      let params = { ledgerName: e };
      let payload = new URLSearchParams(params).toString();
      let url = `${getParticularsOfLedgerURL}?${payload}`;

      getParticularsOfLedger(url);
    });
  });
}

//update cycle starts here!
//to get content for title widget container
function getLedgerTitles() {
  fetch(getLedgerTitleURL)
    .then((response) => response.json())
    .then((data) => {
      domUpdate(data);
    });
}

//for full page refresh
getLedgerTitles();
