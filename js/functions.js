//////////////////////////////////
// utils
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

function findZipperedDatum(id) {
  return zipperedData.find(d => parseInt(d.id) === parseInt(id));
}

function zeroZipperedDatum(id) {
  const datum = findZipperedDatum(id);
  datum.measurement = "";
  datum.unit = "";
  datum.observationId = undefined;
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

function filterCodeRefList() {
  const filteredData = zipperedData.reduce((acc, datum) => {
    if (datum.id && (parseInt(datum.class_level_2_id) === parseInt(selectedCL2))) {
      acc.push(datum);
    }
    return acc;
  }, []);
  clearCodeRefList();
  appendToCodeRefList(globalDoc, filteredData, UnitTable);
}

function appendToObservationList(doc, observs) {
  let container = doc.getElementById("observation-list");
  data.forEach((datum, n) => {})
}

function setDirtyDataClass(doc, id) {
  const element = doc.getElementById(id);
  if (!element.classList.contains("dirty-data")) {
    element.classList.add("dirty-data");
  }
}

function setSavedDataClass(id) {
  const element = globalDoc.getElementById(id);
  element.classList.remove("dirty-data");
  element.classList.add("saved-data");
  setTimeout(() => {
    element.classList.remove("saved-data");
  }, 1000);
}

/////////////////////////////////////
// data collection and formatting

function setNoteId(id) {
  noteId = id;
}

function setSelectedCL2(id) {
  selectedCL2 = id;
  filterCodeRefList();
}

function unwrapFileMakerJSON(json) {
  let response;
  let data;
  try {
    response = JSON.parse(json).response;
  } catch (err) {
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

function setObservationTable(data) {
  ObservationTable = unwrapFileMakerJSON(data).reduce((acc, datum) => {
    if (parseInt(datum.note_id) === parseInt(noteId)) {
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
    if (parseInt(observs[i].code_reference_id) === parseInt(refId)) {
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

function initCRSelector(codeRefData, observationData, unitData, note_id) {
  noteId = note_id;
  setCodeReferenceTable(codeRefData);
  setObservationTable(observationData);
  setUnitTable(unitData);
  if (debug) {
    FileMaker.PerformScript("save_codeRefData", JSON.stringify(CodeReferenceTable));
    FileMaker.PerformScript("save_observTable", JSON.stringify(ObservationTable));
  }
  zipperedData = zipperData(CodeReferenceTable, ObservationTable);
  if (debug) {
    FileMaker.PerformScript("save_zipper_data", JSON.stringify(zipperedData));
  }
  clearCodeRefList();
  filterCodeRefList(globalDoc, zipperedData, UnitTable);
}

function saveMeasurement(id) {
  const element = globalDoc.getElementById(id);
  findZipperedDatum(element.dataset.dataId).measurement = element.value;
  FileMaker.PerformScript("save_measurement", `${element.dataset.observationId},${element.value}`);
  setSavedDataClass(id);
}

function saveUnit(id) {
  const element = globalDoc.getElementById(id);
  findZipperedDatum(element.dataset.dataId).unit = element.value;
  FileMaker.PerformScript("save_unit", `${element.dataset.observationId},${element.value}`);
  setSavedDataClass(id);
}

function addObservationId(observationId) {
  FileMaker.PerformScript("save_new_observation_id", observationId);
  const datum = findZipperedDatum(parseInt(activeCodeRefId));
  datum.observationId = parseInt(observationId);

  const checkbox = globalDoc.getElementById(generatePresentControlId(activeCodeRefId));
  const measurement = globalDoc.getElementById(generateMeasurementId(activeCodeRefId));
  const unit = globalDoc.getElementById(generateUnitId(activeCodeRefId));

  // FileMaker.PerformScript("save_new_observation_id", datum.observationId);
  checkbox.dataset.observationId = datum.observationId;
  measurement.dataset.observationId = datum.observationId;
  unit.dataset.observationId = datum.observationId;
}

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
    FileMaker.PerformScript("create_observation_from_JS", presentControl.dataset.dataId);
  } else {
    measurement.classList.add("hidden");
    unit.classList.add("hidden");
    measurement.value = "";
    unit.value = "";
    zeroZipperedDatum(presentControl.dataset.dataId);

    FileMaker.PerformScript("delete_observation_from_JS", presentControl.dataset.dataId);
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
