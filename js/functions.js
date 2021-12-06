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

function clearCodeRefList() {
  let list = globalDoc.getElementById("coderef-list");
  while (list.lastChild.id !== "list-header") {
    list.removeChild(list.lastChild);
  }
}

function filterCodeRefList(data, units) {
  console.log(data);
  const filteredData = data.reduce((acc, datum) => {
    if (datum.id && (parseInt(datum.class_level_2_id) === parseInt(selectedCL2))) {
      acc.push(datum);
    }
    return acc;
  }, []);
  clearCodeRefList();
  appendToCodeRefList(globalDoc, filteredData, units);
}

function appendToObservationList(doc, observs) {
  let container = doc.getElementById("observation-list");
  data.forEach((datum, n) => {})
}

/////////////////////////////////////
// data collection and formatting

function setNoteId(id) {
  noteId = id;
}

function setSelectedCL2(id) {
  selectedCL2 = id;
}

function unwrapFileMakerJSON(json) {
  let response;
  let data;
  try {
    response = JSON.parse(json).response;
  } catch(err){
    alert("bad response from json!!! " + err);
  }
  try {
    data = response.data;
  } catch (err) {
    alert("bad data from response!!! " + err + response);
  }
  try {
    response = data.map((datum) => {
      return datum.fieldData;
    });
  } catch (err) {
    alert("bad data mapping!!! " + err + json);
  }
  return response;
}

function setCodeReferenceTable(data) {
  CodeReferenceTable = unwrapFileMakerJSON(data).map(datum => {
    const {
      id,
      label,
      class_level_2_id
    } = datum;
    return {
      id,
      label,
      class_level_2_id
    };
  });
}

function setObservationTable(data, note_id) {
  ObservationTable = unwrapFileMakerJSON(data).reduce((acc, datum) => {
    if (datum.note_id === note_id) {
      const {
        id,
        code_reference_id,
        measurement,
        unit
      } = datum;
      acc.push({
        id,
        code_reference_id,
        measurement,
        unit
      });
    }
    return acc;
  }, []);
}

function setUnitTable(data) {
  UnitTable = unwrapFileMakerJSON(data).map((datum) => {
    const {
      name
    } = datum;
    return {
      name
    };
  });
}

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

function initCRSelector(codeRefData, observationData, unitData) {
  setCodeReferenceTable(codeRefData);
  setObservationTable(observationData);
  setUnitTable(unitData);
  zipperedData = zipperData(CodeReferenceTable, ObservationTable);
  clearCodeRefList();
  appendToCodeRefList(globalDoc, zipperedData, UnitTable);
}

///////////////////////////////////////
// interactions

let measurementTimeoutId;
let unitTimeoutId;

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

// todo these need to cancel existing timouts
function onEditMeasurement(doc, id) {
  if (measurementTimeoutId) {
    clearTimeout(measurementTimeoutId);
  }
  const element = doc.getElementById(id);
  setDirtyDataClass(doc, id);
  measurementTimeoutId = setTimeout(() => setSavedDataClass(doc, id), 1000);
}

function onEditUnit(doc, id) {
  if (unitTimeoutId) {
    clearTimeout(unitTimeoutId);
  }
  element = doc.getElementById(id);
  setDirtyDataClass(doc, id);
  unitTimeoutId = setTimeout(() => setSavedDataClass(doc, id), 1000);
}
