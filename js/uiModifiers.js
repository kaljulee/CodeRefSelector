
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

function applyDirtyDataStyling() {
  Object.keys(dirtyData).forEach(key => {
    const element = globalDoc.getElementById(dirtyData[key].elementId);
    element.classList.add("dirty-data");
  });
}

function clearDirtyDataStyling() {
  Object.keys(dirtyData).forEach(key => {
    const element = globalDoc.getElementById(dirtyData[key].elementId);
    element.classList.remove("dirty-data");
  });
}
