//////////////////////////////////
// create row-element id's
function generateRowId(rawId) {
  return "row" + rawId;
}

function generateMeasurementId(rawId) {
  return ("measurement" + rawId);
}

function generateUnitId(rawId) {
  return ("unit" + rawId);
}

function generatePresentControlId(rawId) {
  return ("presentControl" + rawId);
}

///////////////////////////////////////////
// UI modifications
function appendToCodeRefList(doc, data, units) {
  let container = doc.getElementById("coderef-list");
  data.forEach((datum, n) => {
    addCodeRefRow(doc, n, datum, units);
  });
}

function appendToObservationList(doc, observs) {
  let container = doc.getElementById("observation-list");
  data.forEach((datum, n) => {})
}

/////////////////////////////////////
// data collection and formatting
function getObservationData(refId, observs) {
  let response = {};
  for (let i = 0; i < observs.length; i += 1) {
    if (observs[i].code_reference_id === refId) {
      response.observationId = observs[i].id;
      response.measurement = observs[i].measurement;
      response.unit = observs[i].unit;
      break;
    }
  }
  return response;
}

// combine code reference and observation data tables
function zipperData(codeRefs, observs) {
  return codeRefs.reduce((acc, ref) => {
    const {
      id,
      label,
      class_level_2_id
    } = ref;
    const output = {
      id,
      label,
      class_level_2_id
    };
    const observData = getObservationData(id, observs);
    acc.push({
      ...output,
      ...observData
    });
    return acc;
  }, []);
}

///////////////////////////////////////
// interactions

function buttonClicked(elmnt) {
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
    measurement.focus();
  } else {
    measurement.classList.add("hidden");
    unit.classList.add("hidden");
    measurement.value = "";
    unit.value = "";
  }
}

function setSavedDataClass(doc, id) {
  const element = doc.getElementById(id);
  element.classList.remove("dirty-data");
  element.classList.add("saved-data");
  setTimeout(() => {
    element.classList.remove("saved-data");
  }, 1000);
}

function saveMeasurement(element) {

}

function saveUnit(element) {

}

function setDirtyDataClass(doc, id) {
  const element = doc.getElementById(id);
  if (!element.classList.contains("dirty-data")) {
    element.classList.add("dirty-data");
  }
}

function onEditMeasurement(doc, id) {
  const element = doc.getElementById(id);
  setDirtyDataClass(doc, id);
  setTimeout(() => setSavedDataClass(doc, id), 1000);
}

function onEditUnit(doc, id) {
  element = doc.getElementById(id);
  setDirtyDataClass(doc, id);
  setTimeout(() => setSavedDataClass(doc, id), 1000);
}
