// element constants
const DIV = "div";
const INPUT = "input";
const SPAN = "span";
const SELECT = "select";
const OPTION = "option";

function addCodeRefRow(doc, position, data, units) {
  let row = doc.createElement(DIV);
  let container = doc.getElementById("coderef-list");
  row.id = generateRowId(data.id);
  if (position % 2 === 0) {
    row.classList.add("even-row");
  } else {
    row.classList.add("odd-row");
  }

  // add present control
  let presentControl = doc.createElement(INPUT);
  presentControl.setAttribute("type", "checkbox");
  presentControl.classList.add("present-control");
  // data id is passed so that changes can be saved later
  presentControl.dataset.dataId = data.id;

  // set if control is checked.  this is used later for hiding fields
  presentControl.checked = data.observationId != undefined;
  presentControl.id = generatePresentControlId(data.id);
  presentControl.addEventListener('click', () => {
    toggleCheckbox(data.id, document);
  });

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
  measurement.id = generateMeasurementId(data.id);
  measurement.placeholder = "???"
  measurement.addEventListener("keyup", () => {
    onEditMeasurement(doc, measurement.id);
  })
  measurement.classList.add("measurement");
  measurement.dataset.dataId = data.id;
  row.appendChild(measurement);

  // add unit select
  let unit = doc.createElement(SELECT);
  unit.id = generateUnitId(data.id);
  unit.placeholder = "???"
  unit.addEventListener("change", () => {
    onEditUnit(doc, unit.id);
  })
  unit.classList.add("unit");
  unit.dataset.dataId = data.id;

  // populate unit select
  units.forEach(u => {
    const {
      name
    } = u;
    let option = doc.createElement(OPTION);
    option.value = name;
    option.innerHTML += name;
    unit.appendChild(option);
  });

  row.appendChild(unit);
  container.appendChild(row);

  // either hide inputs or set values
  if (!presentControl.checked) {
    measurement.classList.add("hidden");
    unit.classList.add("hidden");
  } else {
    measurement.value = data.measurement;
    unit.value = data.unit;
  }
}
