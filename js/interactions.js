///////////////////////////////////////
// interactions

let measurementTimeoutId;
let unitTimeoutId;
let remedyTimeoutId;
const saveDelay = 500;

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
  let remedy = doc.getElementById(generateRemedyId(id));

  // make control style changes
  // if control is checked, make add-observation callback
  // else make delete-observation calls
  if (presentControl.checked) {
    measurement.classList.remove("hidden");
    unit.classList.remove("hidden");
    remedy.classList.remove("hidden");
    activeCodeRefId = presentControl.dataset.dataId;
    remedy.value = getRemedyData(activeCodeRefId).remedy;
    unit.value = "";
    fileMaker_createObservation(presentControl.dataset.dataId);
  } else {
    measurement.classList.add("hidden");
    unit.classList.add("hidden");
    remedy.classList.add("hidden");
    measurement.value = "";
    unit.value = "";
    removeObservationFromDirtyData(activeCodeRefId);
    zeroZipperedDatum(presentControl.dataset.dataId);
    fileMaker_deleteObservation(presentControl.dataset.dataId);
  }
}

function onEditMeasurement(doc, id) {
  const element = doc.getElementById(id);
  const dataset = element.dataset;
  onEditField(id, dataset.dataId, dataset.observationId, dataset.field, element.value);
  setDirtyDataClass(doc, id);
}

function onEditUnit(doc, id) {
  element = doc.getElementById(id);
  const dataset = element.dataset;
  onEditField(id, dataset.dataId, dataset.observationId, dataset.field, element.value);
  setDirtyDataClass(doc, id);
}

function onEditRemedy(id) {
  element = globalDoc.getElementById(id);
  const dataset = element.dataset;
  onEditField(id, dataset.dataId, dataset.observationId, dataset.field, element.value);
  setDirtyDataClass(globalDoc, id);
}

function onSaveButtonClick() {
  const keys = Object.keys(dirtyData);
  const exportString = keys.reduce((acc, key, i) => {
    acc.push(`${key}@obsfield-value@${dirtyData[key].value}`);
    return acc;}, []);
    console.log(exportString);
    fileMaker_saveObservationChanges(exportString);
}
