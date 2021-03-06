// element constants
const DIV = "div";
const INPUT = "input";
const SPAN = "span";
const SELECT = "select";
const OPTION = "option";
const TEXTAREA = "textarea";

// add row to codeRefList
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
  measurement.dataset.field = "measurement";
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
  unit.dataset.field = "unit";
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

  // todo make a function to do this
  let remedy = doc.createElement(TEXTAREA);
  remedy.id = generateRemedyId(data.id);
  remedy.value = data.remedy;
  remedy.addEventListener("input", () => {
    onEditRemedy(remedy.id);
  })
  remedy.classList.add("remedy");
  remedy.dataset.dataId = data.id;
  remedy.dataset.field = "remedy_text";
  row.appendChild(remedy);

  container.appendChild(row);

  // either hide inputs or set values
  if (!presentControl.checked) {
    measurement.classList.add("hidden");
    unit.classList.add("hidden");
    remedy.classList.add("hidden");
  } else {
    presentControl.dataset.observationId = data.observationId;
    measurement.value = data.measurement;
    measurement.dataset.observationId = data.observationId;
    unit.value = data.unit;
    unit.dataset.observationId = data.observationId;
    remedy.dataset.observationId = data.observationId;
    applyDirtyDataStyling();
  }
}
