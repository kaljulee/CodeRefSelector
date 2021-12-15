function printFileMakerError(err) {
  console.log('attempted filemaker call');
  console.log(err);
}

function fileMaker_saveMeasurement(observationId, value) {
  try {
    FileMaker.PerformScript("save_measurement", `${observationId},${value}`);
  } catch (err) {
    printFileMakerError(err);
  }
}

function fileMaker_saveUnit(observationId, value) {
  try {
    FileMaker.PerformScript("save_unit", `${observationId},${value}`);
  } catch (err) {
    printFileMakerError(err);
    console.log()
  }
}

function fileMaker_saveRemedy(observationId, value) {
  try {
    FileMaker.PerformScript("save_remedy", `${observationId},${value}`);
  } catch (err) {
    printFileMakerError(err);
  }
}

function fileMaker_createObservation(codeRefId) {
  try {
    FileMaker.PerformScript("create_observation_from_JS", codeRefId);
  } catch (err) {
    printFileMakerError(err);
  }
}

function fileMaker_deleteObservation(codeRefId) {
  try {
    FileMaker.PerformScript("delete_observation_from_JS", codeRefId);
  } catch (err) {
    printFileMakerError(err);
  }
}

function fileMaker_saveObservationChanges(exportString) {
  try {
    FileMaker.PerformScript("save_observation_changes", exportString);
    clearDirtyDataStyling();
    clearDirtyData();
  } catch (err) {
    printFileMakerError(err);
  }
}
////////////////////////////////////////////
// filemaker debugger functions

function debug_FileMaker_gotToPosition(position) {
  try {
    FileMaker.PerformScript("save_position", position);
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_SaveCodeRefData() {
  try {
    FileMaker.PerformScript("save_codeRefData", JSON.stringify(CodeReferenceTable));
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_SaveObservTable() {
  try {
    FileMaker.PerformScript("save_observTable", JSON.stringify(ObservationTable));
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_saveZipperData() {
  try {
    FileMaker.PerformScript("save_zipper_data", JSON.stringify(zipperedData));
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_saveNewObservationId(observationId) {
  try {
    FileMaker.PerformScript("save_new_observation_id", observationId);
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_saveRemedyTable() {
  try {
    FileMaker.PerformScript("save_remedy_table", JSON.stringify(RemedyTable));
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_saveFoundRemedy(remedy) {
  try {
    filemaker.PerformScript("save_found_remedy",JSON.stringify(remedy));
  } catch (err) {
    printFileMakerError(err);
  }
}
