///////////////////////////////////////
// interactions

let measurementTimeoutId;
let unitTimeoutId;

// debugger ui
function buttonClicked(elmnt) {
  if (selectedCL2 === 1) {
    setSelectedCL2(2);
  } else {
    setSelectedCL2(1)
  };
  elmnt.classList.toggle("clicked-button");
}

function toggleCheckbox(id, doc) {
  // get row elements
  let presentControl = doc.getElementById(generatePresentControlId(id));
  let measurement = doc.getElementById(generateMeasurementId(id));
  let unit = doc.getElementById(generateUnitId(id));

  // make control style changes
  // if control is checked, make add-observation callback
  // else make delete-observation calls
  if (presentControl.checked) {
    measurement.classList.remove("hidden");
    unit.classList.remove("hidden");
    activeCodeRefId = presentControl.dataset.dataId;
    fileMaker_createObservation(presentControl.dataset.dataId);
  } else {
    measurement.classList.add("hidden");
    unit.classList.add("hidden");
    measurement.value = "";
    unit.value = "";
    zeroZipperedDatum(presentControl.dataset.dataId);
    fileMaker_deleteObservation(presentControl.dataset.dataId);
  }
}

function onEditMeasurement(doc, id) {
  if (measurementTimeoutId) {
    clearTimeout(measurementTimeoutId);
  }
  const element = doc.getElementById(id);
  setDirtyDataClass(doc, id);
  measurementTimeoutId = setTimeout(() => saveMeasurement(id), 1000);
}

function onEditUnit(doc, id) {
  if (unitTimeoutId) {
    clearTimeout(unitTimeoutId);
  }
  element = doc.getElementById(id);
  setDirtyDataClass(doc, id);
  unitTimeoutId = setTimeout(() => saveUnit(id), 1000);
}
