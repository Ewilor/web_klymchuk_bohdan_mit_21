import data from '../db/data.json' with { type: "json" }

const state = data;

function populateTable(data) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  data.settings.forEach(setting => {
    addTableRow(setting.title, setting.status);
  });

  toggleEmptyState();
}

function addTableRow(title, status) {
  const tableBody = document.getElementById('table-body');

  const row = document.createElement('tr');
  row.className = 'table-row';

  const nameCell = document.createElement('td');
  nameCell.className = 'cell content';
  nameCell.innerHTML = `<a href="./pages/setting.html">${title}</a>`;
  row.appendChild(nameCell);

  const statusCell = document.createElement('td');
  statusCell.className = `cell status ${status === 'active' ? 'active-status' : ''}`;
  statusCell.innerHTML = `<div>${status.charAt(0).toUpperCase() + status.slice(1)}</div>`;
  row.appendChild(statusCell);

  const actionCell = document.createElement('td');
  actionCell.className = 'cell delete-icon';
  actionCell.innerHTML = '<img src="./icons/trash.svg" alt="Delete" />';
  actionCell.addEventListener('click', () => {
    removeSettingHandler(row);
    toggleEmptyState();
  });
  row.appendChild(actionCell);

  tableBody.appendChild(row);

  toggleEmptyState()
}

function toggleEmptyState() {
  const tableBody = document.getElementById('table-body');
  const table = document.querySelector("table");
  const emptyState = document.getElementById('empty-state');
  console.log("table", table);
  
  if (tableBody.children.length === 0) {
    emptyState.style.display = 'flex'
    table.style.display = 'none'
  } else {
    emptyState.style.display = 'none'
  }
}

populateTable(state);

function removeSettingHandler(settingLineElement) {

  settingLineElement.remove();

  const settingIndexToRemove = state.settings.findIndex((setting) => setting.id === settingLineElement.id);
  state.settings.splice(settingIndexToRemove, 1);
  toggleEmptyState();
}