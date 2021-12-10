/////////////////////////////////////
// data collection and formatting

function setNoteId(id) {
  noteId = id;
}

function setSelectedCL2(id) {
  selectedCL2 = id;
  clearDirtyData();
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

function setRemedyTable(data) {
  RemedyTable = unwrapFileMakerJSON(data).map((datum) => {
    const {
      class_level_3_id,
      id,
      label
    } = datum;
    return {
      id,
      label,
      class_level_3_id
    };
  });
  if (debug) {
    debug_FileMaker_saveRemedyTable(RemedyTable);
  }
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

function getRemedyData(refId) {
  if (debug) {
    debug_FileMaker_gotToPosition(refId);
  }
  const remedy = RemedyTable.find(r => parseInt(r.class_level_3_id) === parseInt(refId));
  if (debug) {
    debug_FileMaker_saveFoundRemedy(remedy);
  }
  return {
    remedy: remedy.label
  };
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
    const remedyData = getRemedyData(id);
    acc.push({
      ...output,
      ...observData,
      ...remedyData,
    });
    return acc;
  }, []);
}

function initCRSelector(codeRefData, observationData, unitData, remedyData, note_id, cl2_id) {
  noteId = note_id;
  selectedCL2 = cl2_id;
  if (debug) {
    debug_FileMaker_gotToPosition(1);
  }
  setCodeReferenceTable(codeRefData);
  setObservationTable(observationData);
  setUnitTable(unitData);
  setRemedyTable(remedyData);
  if (debug) {
    debug_FileMaker_SaveCodeRefData();
    debug_FileMaker_SaveObservTable();
  }
  zipperedData = zipperData(CodeReferenceTable, ObservationTable);
  if (debug) {
    debug_FileMaker_saveZipperData();
  }
  clearCodeRefList();
  filterCodeRefList(globalDoc, zipperedData, UnitTable);
}

function saveMeasurement(id) {
  const element = globalDoc.getElementById(id);
  findZipperedDatum(element.dataset.dataId).measurement = element.value;
  fileMaker_saveMeasurement(element.dataset.observationId, element.value);
  setSavedDataClass(id);
}

function saveUnit(id) {
  const element = globalDoc.getElementById(id);
  findZipperedDatum(element.dataset.dataId).unit = element.value;
  fileMaker_saveUnit(element.dataset.observationId, element.value);
  setSavedDataClass(id);
}

function saveRemedy(id) {
  const element = globalDoc.getElementById(id);
  const {
    dataset,
    value
  } = element;
  findZipperedDatum(dataset.dataId).remedy = element.value;
  fileMaker_saveRemedy(dataset.observationId, value);
  setSavedDataClass(id);
}

// add observation id to controls
function addObservationId(observationId) {
  if (debug) {
    debug_FileMaker_saveNewObservationId(observationId);
  }
  const datum = findZipperedDatum(parseInt(activeCodeRefId));
  datum.observationId = parseInt(observationId);

  const checkbox = globalDoc.getElementById(generatePresentControlId(activeCodeRefId));
  const measurement = globalDoc.getElementById(generateMeasurementId(activeCodeRefId));
  const unit = globalDoc.getElementById(generateUnitId(activeCodeRefId));
  const remedy = globalDoc.getElementById(generateRemedyId(activeCodeRefId));

  checkbox.dataset.observationId = datum.observationId;
  measurement.dataset.observationId = datum.observationId;
  unit.dataset.observationId = datum.observationId;
  remedy.dataset.observationId = datum.observationId;
}

// update the data updates when changes are applied to a field
function onEditField(elementId, codeRefId, observationId, field, value) {
  const key = `${observationId}@obs-field@${field}`;
  if (!dirtyData[key]) {
    dirtyData[key] = {elementId, codeRefId};
  }
  dirtyData[key].value = value;
  console.log(dirtyData);
};

// when an observation is deleted, it's data changes should be removed
// from the list
function removeObservationFromDirtyData(codeRefId) {
  const keys = Object.keys(dirtyData);
  keys.forEach(k => {
    if (dirtyData[key].codeRefId === codeRefId) {
      dirtyData[key] = undefined;
    }
  });
}

function findDirtyData(codeRefId) {

}

function clearDirtyData() {
  dirtyData = {};
}
