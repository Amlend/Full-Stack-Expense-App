async function getReport() {
  const token = localStorage.getItem("token");
  await axios
    .get("http://51.20.55.186/report-file", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      const Expenses = response.data.Expenses;
      const Incomes = response.data.Incomes;
      const total = response.data.total;

      for (let i = 0; i < Expenses.length; i++) {
        addToReport(Expenses[i]);
      }
      for (let i = 0; i < Incomes.length; i++) {
        addToReportIncome(Incomes[i]);
      }

      addToBalance(total);
    })
    .catch((err) => {
      console.log(err);
    });

  const btn = document.getElementById("btnReport");
  btn.disabled = "true";
}

function addToReport(responseData) {
  const table = document.getElementById("tableData");
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");

  td1.appendChild(document.createTextNode(responseData.description));
  td2.appendChild(document.createTextNode(responseData.category));
  td3.appendChild(document.createTextNode(responseData.date));
  td4.appendChild(document.createTextNode(responseData.amount));
  td5.appendChild(document.createTextNode(""));
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  table.appendChild(tr);
}

function addToReportIncome(responseData) {
  const table = document.getElementById("tableData");
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");

  td1.appendChild(document.createTextNode(responseData.description));
  td2.appendChild(document.createTextNode(responseData.category));
  td3.appendChild(document.createTextNode(responseData.date));
  td4.appendChild(document.createTextNode(" "));
  td5.appendChild(document.createTextNode(responseData.amount));
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  table.appendChild(tr);
}

function addToBalance(total) {
  const table = document.getElementById("balanceTable");
  const tr = document.createElement("tr");

  const Balance = total.totalIncome - total.totalExpense;

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");

  td1.appendChild(document.createTextNode(`Balance : ${Balance}`));
  td2.appendChild(document.createTextNode(""));
  td3.appendChild(document.createTextNode(""));
  td4.appendChild(
    document.createTextNode(`Total Expense : ${total.totalExpense}`)
  );
  td5.appendChild(
    document.createTextNode(`Total Income : ${total.totalIncome}`)
  );
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  table.appendChild(tr);
}

function PrintReport() {
  window.print();
}
