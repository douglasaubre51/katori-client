"use strict";
console.log("starting fetch!");

const getLedgerTitleURL = "https://localhost:8000/api/ledger/getLedgerTitles";

const getLedgerByTitleURL =
  "https://localhost:8000/api/ledger/getLedgerByTitle";

const getParticularsOfLedgerURL =
  "https://localhost:8000/api/particular/getParticularsOfLedger";

const widgetContainer = document.getElementById("title-widget-container");
const trialBalanceGroup = document.getElementById("trial-balance-group");
const selectedLedgerTableContainer = document.getElementById(
  "selected-ledger-table-container",
);

//create ledger table in the shadows
function createLedgerTable() {
  let table = document.createElement("table");
  table.setAttribute("id", "dr-ledger-table");
  table.setAttribute("border", 1);
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
  table.setAttribute("border", 1);
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
// get selected ledger details
function getLedgerByTitle(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.TotalDebit);
      console.log(data.TotalCredit);

      let balanceGroup = document.createElement("div");
      balanceGroup.setAttribute("id", "balance-group");
      trialBalanceGroup.append(balanceGroup);

      let head1 = document.createElement("span");
      head1.innerHTML = "Total Debit";
      balanceGroup.append(head1);

      let debit = document.createElement("span");
      debit.textContent = data.TotalDebit;
      balanceGroup.append(debit);

      let head2 = document.createElement("span");
      head2.innerHTML = "<br>" + "Total Credit";
      balanceGroup.append(head2);

      let credit = document.createElement("span");
      credit.textContent = data.TotalCredit;
      balanceGroup.append(credit);
    });
}

//get selected ledgers dr and cr sides
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
      // add code to execute on click event
      // to clear existing tables
      document.getElementById("balance-group")?.remove();
      document.getElementById("cr-ledger-table")?.remove();
      document.getElementById("dr-ledger-table")?.remove();

      createLedgerTable();

      let params = { title: e };
      let payload = new URLSearchParams(params).toString();
      let url = `${getLedgerByTitleURL}?${payload}`;

      getLedgerByTitle(url);

      params = { ledgerName: e };
      payload = new URLSearchParams(params).toString();
      url = `${getParticularsOfLedgerURL}?${payload}`;

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
