// element constants
const DIV = "div";
const INPUT = "input";
const SPAN = "span";

function addRow(doc, position, data) {
  let row = doc.createElement(DIV);
  let container = doc.getElementById("container");
  row.id = data.id;
  if (position % 2 === 0) {
    row.classList.add("even-row");
  } else {
    row.classList.add("odd-row");
  }
  // add present control
  let presentControl = doc.createElement(INPUT);
  presentControl.setAttribute("type", "checkbox");
  presentControl.classList.add("present-control");
  presentControl.checked = data.observationId != undefined;
  console.log(data);
  row.appendChild(presentControl);
  // add label
  let label = doc.createElement(DIV);
  label.classList.add("row-label");
  let labelSpan = doc.createElement(SPAN);
  labelSpan.innerHTML += data.label;
  label.appendChild(labelSpan);
  row.appendChild(label);
  // add measurement input
  let measurement = doc.createElement(INPUT);
  measurement.classList.add("measurement");
  row.appendChild(measurement);
  // add unit input
  let unit = doc.createElement(INPUT);
  unit.classList.add("unit");
  row.appendChild(unit);
  container.appendChild(row);

  if (!presentControl.checked) {
    measurement.classList.add("hidden");
    unit.classList.add("hidden");
  }
}
