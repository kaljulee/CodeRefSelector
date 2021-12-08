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

function addObservationId(observationId) {
  if (debug) {
    debug_FileMaker_saveNewObservationId(observationId);
  }
  const datum = findZipperedDatum(parseInt(activeCodeRefId));
  datum.observationId = parseInt(observationId);

  const checkbox = globalDoc.getElementById(generatePresentControlId(activeCodeRefId));
  const measurement = globalDoc.getElementById(generateMeasurementId(activeCodeRefId));
  const unit = globalDoc.getElementById(generateUnitId(activeCodeRefId));

  checkbox.dataset.observationId = datum.observationId;
  measurement.dataset.observationId = datum.observationId;
  unit.dataset.observationId = datum.observationId;
}
