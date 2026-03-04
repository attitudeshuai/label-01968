/* ============================================
   昆山飘得华电子材料有限公司 - 产品客户管理系统
   Application Logic
   ============================================ */

// ============ Auth Module ============
const TEST_ACCOUNTS = [
  { username: 'admin', password: 'admin123', role: '管理员' },
  { username: 'user', password: 'user123', role: '普通用户' }
];
const SESSION_KEY = 'pdh_session';

function checkLogin() {
  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    try {
      const user = JSON.parse(session);
      if (user && user.username) {
        showApp(user);
        return true;
      }
    } catch (e) { /* ignore */ }
  }
  showLogin();
  return false;
}

function showLogin() {
  document.getElementById('login-page').classList.remove('hidden');
  document.getElementById('app-container').classList.remove('show');
}

function showApp(user) {
  document.getElementById('login-page').classList.add('hidden');
  document.getElementById('app-container').classList.add('show');
  document.getElementById('current-user').textContent = `${user.role}: ${user.username}`;
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('login-error');

  const account = TEST_ACCOUNTS.find(a => a.username === username && a.password === password);
  if (account) {
    errorEl.classList.remove('show');
    const session = { username: account.username, role: account.role, loginTime: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    showApp(session);
    initApp();
  } else {
    errorEl.classList.add('show');
  }
}

function handleLogout() {
  localStorage.removeItem(SESSION_KEY);
  showLogin();
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

// ============ Data Module ============
const STORAGE_KEYS = {
  columns: 'pdh_columns',
  rows: 'pdh_rows',
  logs: 'pdh_logs',
  colWidths: 'pdh_col_widths'
};

function getColWidths() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.colWidths) || '{}');
}
function saveColWidths(v) {
  localStorage.setItem(STORAGE_KEYS.colWidths, JSON.stringify(v));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getColumns() {
  const raw = localStorage.getItem(STORAGE_KEYS.columns);
  if (raw) return JSON.parse(raw);
  return [
    { id: 'col_customer', label: '客户名称', parentId: null, order: 0 },
    { id: 'col_product', label: '产品名称', parentId: null, order: 1 },
    { id: 'col_spec', label: '规格型号', parentId: null, order: 2 },
    { id: 'col_analysis', label: '药水分析项目', parentId: null, order: 3 },
    { id: 'col_analysis_ph', label: 'PH值', parentId: 'col_analysis', order: 0 },
    { id: 'col_analysis_density', label: '密度(g/ml)', parentId: 'col_analysis', order: 1 },
    { id: 'col_analysis_copper', label: '铜含量(g/L)', parentId: 'col_analysis', order: 2 },
    { id: 'col_usage', label: '月用量(kg)', parentId: null, order: 4 },
    { id: 'col_batch', label: '批次号', parentId: null, order: 5 },
    { id: 'col_date', label: '供货日期', parentId: null, order: 6 },
    { id: 'col_contact', label: '联系人', parentId: null, order: 7 }
  ];
}

function getRows() {
  const raw = localStorage.getItem(STORAGE_KEYS.rows);
  if (raw) return JSON.parse(raw);
  return [
    { id: 'row_1', cells: { col_customer: '苏州华星光电', col_product: 'PDH-101铜蚀刻液', col_spec: '25L/桶', col_analysis_ph: '2.5', col_analysis_density: '1.18', col_analysis_copper: '45', col_usage: '500', col_batch: 'PDH20240115-01', col_date: '2024-01-15', col_contact: '张经理' }, createdAt: '2024-01-15' },
    { id: 'row_2', cells: { col_customer: '苏州华星光电', col_product: 'PDH-202清洗剂', col_spec: '20L/桶', col_analysis_ph: '7.0', col_analysis_density: '1.02', col_analysis_copper: '0', col_usage: '200', col_batch: 'PDH20240118-02', col_date: '2024-01-18', col_contact: '张经理' }, createdAt: '2024-01-18' },
    { id: 'row_3', cells: { col_customer: '昆山龙腾光电', col_product: 'PDH-101铜蚀刻液', col_spec: '25L/桶', col_analysis_ph: '2.5', col_analysis_density: '1.18', col_analysis_copper: '45', col_usage: '800', col_batch: 'PDH20240120-03', col_date: '2024-01-20', col_contact: '李工' }, createdAt: '2024-01-20' },
    { id: 'row_4', cells: { col_customer: '昆山龙腾光电', col_product: 'PDH-305电镀添加剂', col_spec: '5L/瓶', col_analysis_ph: '4.2', col_analysis_density: '1.08', col_analysis_copper: '12', col_usage: '50', col_batch: 'PDH20240122-04', col_date: '2024-01-22', col_contact: '李工' }, createdAt: '2024-01-22' },
    { id: 'row_5', cells: { col_customer: '上海天马微电子', col_product: 'PDH-202清洗剂', col_spec: '200L/桶', col_analysis_ph: '7.0', col_analysis_density: '1.02', col_analysis_copper: '0', col_usage: '1500', col_batch: 'PDH20240125-05', col_date: '2024-01-25', col_contact: '王总' }, createdAt: '2024-01-25' },
    { id: 'row_6', cells: { col_customer: '上海天马微电子', col_product: 'PDH-101铜蚀刻液', col_spec: '200L/桶', col_analysis_ph: '2.5', col_analysis_density: '1.18', col_analysis_copper: '45', col_usage: '2000', col_batch: 'PDH20240128-06', col_date: '2024-01-28', col_contact: '王总' }, createdAt: '2024-01-28' },
    { id: 'row_7', cells: { col_customer: '南京中电熊猫', col_product: 'PDH-408退膜剂', col_spec: '25L/桶', col_analysis_ph: '12.5', col_analysis_density: '1.15', col_analysis_copper: '0', col_usage: '300', col_batch: 'PDH20240201-07', col_date: '2024-02-01', col_contact: '陈主管' }, createdAt: '2024-02-01' },
    { id: 'row_8', cells: { col_customer: '南京中电熊猫', col_product: 'PDH-305电镀添加剂', col_spec: '5L/瓶', col_analysis_ph: '4.2', col_analysis_density: '1.08', col_analysis_copper: '12', col_usage: '80', col_batch: 'PDH20240203-08', col_date: '2024-02-03', col_contact: '陈主管' }, createdAt: '2024-02-03' },
    { id: 'row_9', cells: { col_customer: '深圳TCL华星', col_product: 'PDH-101铜蚀刻液', col_spec: '1000L/IBC', col_analysis_ph: '2.5', col_analysis_density: '1.18', col_analysis_copper: '45', col_usage: '5000', col_batch: 'PDH20240205-09', col_date: '2024-02-05', col_contact: '黄经理' }, createdAt: '2024-02-05' },
    { id: 'row_10', cells: { col_customer: '深圳TCL华星', col_product: 'PDH-202清洗剂', col_spec: '1000L/IBC', col_analysis_ph: '7.0', col_analysis_density: '1.02', col_analysis_copper: '0', col_usage: '3000', col_batch: 'PDH20240208-10', col_date: '2024-02-08', col_contact: '黄经理' }, createdAt: '2024-02-08' },
    { id: 'row_11', cells: { col_customer: '合肥京东方', col_product: 'PDH-510显影液', col_spec: '25L/桶', col_analysis_ph: '11.0', col_analysis_density: '1.05', col_analysis_copper: '0', col_usage: '400', col_batch: 'PDH20240210-11', col_date: '2024-02-10', col_contact: '刘工程师' }, createdAt: '2024-02-10' },
    { id: 'row_12', cells: { col_customer: '合肥京东方', col_product: 'PDH-101铜蚀刻液', col_spec: '200L/桶', col_analysis_ph: '2.5', col_analysis_density: '1.18', col_analysis_copper: '45', col_usage: '1800', col_batch: 'PDH20240212-12', col_date: '2024-02-12', col_contact: '刘工程师' }, createdAt: '2024-02-12' }
  ];
}

function getLogs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.logs) || '[]');
}

function saveColumns(v) {
  localStorage.setItem(STORAGE_KEYS.columns, JSON.stringify(v));
}
function saveRows(v) {
  localStorage.setItem(STORAGE_KEYS.rows, JSON.stringify(v));
}
function saveLogs(v) {
  localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(v));
}

function logOp(type, action, payload) {
  const logs = getLogs();
  logs.unshift({
    id: genId(),
    type, action, payload,
    timestamp: new Date().toLocaleString()
  });
  saveLogs(logs);
}

function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(30px)';
    el.style.transition = 'all 0.3s ease';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

function getColById(columns, id) {
  return columns.find(c => c.id === id);
}
function getTopCols(columns) {
  return columns.filter(c => !c.parentId).sort((a, b) => a.order - b.order);
}
function getChildCols(columns, parentId) {
  return columns.filter(c => c.parentId === parentId).sort((a, b) => a.order - b.order);
}

function isCustomerCol(col) {
  return /客户|客户名称|customer/i.test(col.label);
}
function isProductCol(col) {
  return /产品|产品名称|用量|批次|规格|product/i.test(col.label);
}

function recordState() {
  return {
    columns: JSON.parse(JSON.stringify(getColumns())),
    rows: JSON.parse(JSON.stringify(getRows()))
  };
}

function restoreState(state) {
  saveColumns(state.columns);
  saveRows(state.rows);
  renderDataTable();
  renderMonitor();
  renderLogs();
  toast('已恢复到该操作之前的状态', 'success');
}

// ============ CRUD Operations ============
function addColumn(parentId = null) {
  const prev = recordState();
  const columns = getColumns();
  const label = parentId ? '子列' : '新列';
  const siblings = parentId ? getChildCols(columns, parentId) : getTopCols(columns);
  const order = siblings.length;
  const col = { id: genId(), label, parentId, order };
  columns.push(col);
  saveColumns(columns);
  logOp('column', 'add', prev);
  renderDataTable();
  toast('已添加列');
}

function deleteColumn(id) {
  const prev = recordState();
  const columns = getColumns();
  const toDel = [id, ...columns.filter(c => c.parentId === id).map(c => c.id)];
  toDel.forEach(did => {
    const idx = columns.findIndex(c => c.id === did);
    if (idx >= 0) columns.splice(idx, 1);
  });
  saveColumns(columns);
  logOp('column', 'delete', prev);
  renderDataTable();
  toast('已删除列');
}

function renameColumn(id, newLabel) {
  const columns = getColumns();
  const col = getColById(columns, id);
  if (!col) return;
  const prev = recordState();
  col.label = newLabel;
  saveColumns(columns);
  logOp('column', 'update', prev);
  renderDataTable();
}

function addRow() {
  const rows = getRows();
  const cols = getColumns();
  const cells = {};
  cols.forEach(c => { cells[c.id] = ''; });
  rows.push({ id: genId(), cells, createdAt: new Date().toISOString() });
  const prev = recordState();
  saveRows(rows);
  logOp('row', 'add', prev);
  renderDataTable();
  toast('已添加行');
}

function deleteRow(id) {
  const rows = getRows().filter(r => r.id !== id);
  const prev = recordState();
  saveRows(rows);
  logOp('row', 'delete', prev);
  renderDataTable();
  toast('已删除行');
}

function updateCell(rowId, colId, value) {
  const rows = getRows();
  const row = rows.find(r => r.id === rowId);
  if (!row) return;
  const prev = recordState();
  row.cells[colId] = value;
  saveRows(rows);
  logOp('cell', 'update', prev);
}

// ============ Render Data Table ============
function renderDataTable() {
  const cols = getColumns();
  const rows = getRows();
  const topCols = getTopCols(cols);
  const colWidths = getColWidths();
  const thead = document.createElement('thead');
  const tr1 = document.createElement('tr');
  const tr2 = document.createElement('tr');

  const hasAnyChildren = topCols.some(tc => getChildCols(cols, tc.id).length > 0);

  topCols.forEach(tc => {
    const childCols = getChildCols(cols, tc.id);
    if (childCols.length > 0) {
      const th = document.createElement('th');
      th.colSpan = 1 + childCols.length;
      th.innerHTML = `
        <div class="col-header">
          <input type="text" value="${tc.label}" data-id="${tc.id}">
          <div class="col-actions">
            <button data-action="add-sub" data-parent="${tc.id}">+子列</button>
            <button data-action="del-col" data-id="${tc.id}">删除列</button>
          </div>
        </div>`;
      tr1.appendChild(th);

      const thParent = document.createElement('th');
      thParent.className = 'sub-col-header';
      thParent.dataset.colId = tc.id;
      if (colWidths[tc.id]) thParent.style.minWidth = colWidths[tc.id] + 'px';
      if (isCustomerCol(tc)) thParent.classList.add('col-wide');
      thParent.innerHTML = `
        <div class="col-header">
          <input type="text" value="${tc.label}" data-id="${tc.id}">
        </div>`;
      const handleP = document.createElement('div');
      handleP.className = 'col-resize-handle';
      handleP.dataset.colId = tc.id;
      thParent.appendChild(handleP);
      tr2.appendChild(thParent);

      childCols.forEach(cc => {
        const th2 = document.createElement('th');
        th2.className = 'sub-col-header';
        th2.dataset.colId = cc.id;
        if (colWidths[cc.id]) th2.style.minWidth = colWidths[cc.id] + 'px';
        th2.innerHTML = `
          <div class="col-header">
            <input type="text" value="${cc.label}" data-id="${cc.id}">
            <div class="col-actions">
              <button data-action="del-col" data-id="${cc.id}">删除</button>
            </div>
          </div>`;
        const handle2 = document.createElement('div');
        handle2.className = 'col-resize-handle';
        handle2.dataset.colId = cc.id;
        th2.appendChild(handle2);
        tr2.appendChild(th2);
      });
    } else {
      const th = document.createElement('th');
      th.dataset.colId = tc.id;
      if (colWidths[tc.id]) th.style.minWidth = colWidths[tc.id] + 'px';
      if (isCustomerCol(tc)) th.classList.add('col-wide');
      if (hasAnyChildren) th.rowSpan = 2;
      th.innerHTML = `
        <div class="col-header">
          <input type="text" value="${tc.label}" data-id="${tc.id}">
          <div class="col-actions">
            <button data-action="add-sub" data-parent="${tc.id}">+子列</button>
            <button data-action="del-col" data-id="${tc.id}">删除列</button>
          </div>
        </div>`;
      const handle = document.createElement('div');
      handle.className = 'col-resize-handle';
      handle.dataset.colId = tc.id;
      th.appendChild(handle);
      tr1.appendChild(th);
    }
  });

  const thActions = document.createElement('th');
  thActions.className = 'col-sticky-actions';
  if (hasAnyChildren) thActions.rowSpan = 2;
  thActions.textContent = '操作';
  thActions.style.width = '80px';
  thActions.style.textAlign = 'center';
  tr1.appendChild(thActions);

  thead.appendChild(tr1);
  if (hasAnyChildren) thead.appendChild(tr2);

  const tbody = document.createElement('tbody');
  const flatCols = topCols.flatMap(tc => {
    const children = getChildCols(cols, tc.id);
    return children.length > 0 ? [tc, ...children] : [tc];
  });

  function escapeAttr(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  rows.forEach(row => {
    const tr = document.createElement('tr');
    flatCols.forEach(col => {
      const td = document.createElement('td');
      td.dataset.colId = col.id;
      if (colWidths[col.id]) td.style.minWidth = colWidths[col.id] + 'px';
      const val = row.cells[col.id] || '';
      if (isCustomerCol(col) || (col.parentId && isCustomerCol(getColById(cols, col.parentId)))) {
        td.classList.add('col-wide');
      }
      const inputHtml = val
        ? `<input type="text" value="${escapeAttr(val)}" data-row="${row.id}" data-col="${col.id}" title="${escapeAttr(val)}">`
        : `<input type="text" value="" data-row="${row.id}" data-col="${col.id}">`;
      td.innerHTML = inputHtml;
      tr.appendChild(td);
    });
    const tdAct = document.createElement('td');
    tdAct.className = 'col-sticky-actions';
    tdAct.innerHTML = `<div class="row-actions"><button data-action="del-row" data-id="${row.id}">删除</button></div>`;
    tr.appendChild(tdAct);
    tbody.appendChild(tr);
  });

  const table = document.getElementById('data-table');
  table.innerHTML = '';
  table.appendChild(thead);
  table.appendChild(tbody);

  // Bind events
  table.querySelectorAll('input[data-id]').forEach(inp => {
    inp.addEventListener('blur', () => {
      const id = inp.dataset.id;
      const cur = getColById(cols, id);
      if (cur && cur.label !== inp.value) renameColumn(id, inp.value);
    });
  });
  table.querySelectorAll('input[data-row]').forEach(inp => {
    inp.addEventListener('blur', () => {
      const rowId = inp.dataset.row, colId = inp.dataset.col;
      const row = rows.find(r => r.id === rowId);
      if (row && (row.cells[colId] || '') !== inp.value) updateCell(rowId, colId, inp.value);
      inp.title = inp.value || '';
    });
    inp.addEventListener('input', () => { inp.title = inp.value || ''; });
  });
  table.querySelectorAll('[data-action="del-col"]').forEach(btn => {
    btn.onclick = () => deleteColumn(btn.dataset.id);
  });
  table.querySelectorAll('[data-action="add-sub"]').forEach(btn => {
    btn.onclick = () => addColumn(btn.dataset.parent);
  });
  table.querySelectorAll('[data-action="del-row"]').forEach(btn => {
    btn.onclick = () => deleteRow(btn.dataset.id);
  });

  // Column resize
  table.querySelectorAll('.col-resize-handle').forEach(handle => {
    handle.onmousedown = (e) => {
      e.preventDefault();
      const colId = handle.dataset.colId;
      const th = handle.closest('th');
      const startX = e.pageX;
      const startW = th.offsetWidth;
      document.body.classList.add('resizing-col');
      const onMove = (ev) => {
        const dw = ev.pageX - startX;
        const newW = Math.max(80, startW + dw);
        th.style.minWidth = newW + 'px';
        table.querySelectorAll(`td[data-col-id="${colId}"]`).forEach(td => td.style.minWidth = newW + 'px');
      };
      const onUp = () => {
        document.body.classList.remove('resizing-col');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        const w = th.offsetWidth;
        const cw = getColWidths();
        cw[colId] = w;
        saveColWidths(cw);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    };
  });
}

// ============ Render Monitor ============
function renderMonitor() {
  const cols = getColumns();
  const rows = getRows();
  const flatCols = getTopCols(cols).flatMap(tc => {
    const children = getChildCols(cols, tc.id);
    return children.length > 0 ? children : [tc];
  });
  const customerColId = flatCols.find(c => isCustomerCol(c) || (c.parentId && isCustomerCol(getColById(cols, c.parentId))))?.id || flatCols[0]?.id;
  const productColIds = flatCols.filter(c => isProductCol(c) || (c.parentId && isProductCol(getColById(cols, c.parentId)))).map(c => c.id);
  if (productColIds.length === 0) productColIds.push(...flatCols.filter(c => c.id !== customerColId).map(c => c.id));

  const customers = new Set();
  const products = new Set();
  const customerProducts = {};
  const productCustomers = {};
  const customerDetails = {};
  const productDetails = {};

  rows.forEach(row => {
    const custVal = customerColId ? (row.cells[customerColId] || '').trim() : '';
    if (custVal) {
      customers.add(custVal);
      if (!customerProducts[custVal]) customerProducts[custVal] = [];
      if (!customerDetails[custVal]) customerDetails[custVal] = [];
      const detail = {};
      flatCols.forEach(c => { detail[c.label] = row.cells[c.id] || ''; });
      customerDetails[custVal].push(detail);
      productColIds.forEach(pid => {
        const pval = (row.cells[pid] || '').trim();
        if (pval) {
          products.add(pval);
          if (!customerProducts[custVal].includes(pval)) customerProducts[custVal].push(pval);
          if (!productCustomers[pval]) productCustomers[pval] = [];
          if (!productCustomers[pval].includes(custVal)) productCustomers[pval].push(custVal);
          if (!productDetails[pval]) productDetails[pval] = [];
          productDetails[pval].push(detail);
        }
      });
    }
  });

  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card">
      <div class="stat-icon customers">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <div class="stat-label">客户总数</div>
      <div class="stat-value">${customers.size}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon products">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      </div>
      <div class="stat-label">产品总数</div>
      <div class="stat-value">${products.size}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon rows">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
        </svg>
      </div>
      <div class="stat-label">数据行数</div>
      <div class="stat-value">${rows.length}</div>
    </div>`;

  const custGrid = document.getElementById('customer-grid');
  custGrid.innerHTML = '';
  [...customers].sort().forEach(c => {
    const chip = document.createElement('div');
    chip.className = 'entity-chip customer';
    chip.textContent = c;
    chip.onclick = () => showDetailModal(c + ' - 使用的产品及详情', customerDetails[c] || [], flatCols);
    custGrid.appendChild(chip);
  });

  const prodGrid = document.getElementById('product-grid');
  prodGrid.innerHTML = '';
  [...products].sort().forEach(p => {
    const chip = document.createElement('div');
    chip.className = 'entity-chip product';
    chip.textContent = p;
    chip.onclick = () => showDetailModal(p + ' - 使用的客户及详情', productDetails[p] || [], flatCols);
    prodGrid.appendChild(chip);
  });
}

function showDetailModal(title, rows, cols) {
  document.getElementById('modal-title').textContent = title;
  const table = document.getElementById('detail-table');
  table.innerHTML = '';
  if (rows.length === 0) {
    table.innerHTML = '<tr><td style="padding:24px;text-align:center;color:var(--color-text-muted)">暂无数据</td></tr>';
  } else {
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr>' + cols.map(c => `<th>${c.label}</th>`).join('') + '</tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach(r => {
      const tr = document.createElement('tr');
      cols.forEach(c => tr.appendChild(document.createElement('td')).textContent = r[c.label] || '');
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
  }
  document.getElementById('detail-modal').classList.add('show');
}

// ============ Render Logs ============
function renderLogs() {
  const logs = getLogs();
  const list = document.getElementById('log-list');
  list.innerHTML = '';
  if (logs.length === 0) {
    list.innerHTML = '<div class="log-empty">暂无操作记录</div>';
    return;
  }
  logs.forEach(log => {
    const actionMap = { add: '添加', delete: '删除', update: '更新' };
    const typeMap = { column: '列', row: '行', cell: '单元格', import: '导入' };
    const desc = `${actionMap[log.action] || log.action}${typeMap[log.type] || log.type}`;
    const div = document.createElement('div');
    div.className = 'log-item';
    div.innerHTML = `
      <div class="log-info">
        <div class="log-desc">${desc}</div>
        <div class="log-time">${log.timestamp}</div>
      </div>
      <button class="log-restore" data-id="${log.id}">恢复到此操作前</button>`;
    div.querySelector('button').onclick = () => {
      const item = logs.find(l => l.id === log.id);
      if (item && item.payload) restoreState(item.payload);
    };
    list.appendChild(div);
  });
}

// ============ Excel Import / Export ============
function exportExcel() {
  const cols = getColumns();
  const rows = getRows();
  const topCols = getTopCols(cols);
  const flatCols = topCols.flatMap(tc => {
    const children = getChildCols(cols, tc.id);
    return children.length > 0 ? children : [tc];
  });
  const headers = flatCols.map(c => c.label);
  const data = [headers, ...rows.map(r => flatCols.map(c => r.cells[c.id] || ''))];
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '数据');
  XLSX.writeFile(wb, '昆山飘得华产品客户数据.xlsx');
  toast('导出成功');
}

function importExcel(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      if (!wb.SheetNames || wb.SheetNames.length === 0) {
        toast('Excel 文件为空或格式不正确', 'error');
        return;
      }
      const ws = wb.Sheets[wb.SheetNames[0]];
      const arr = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

      const filteredArr = arr.filter(row => row && row.some(cell => cell !== '' && cell != null));
      if (filteredArr.length < 1) { toast('文件中没有有效数据', 'error'); return; }

      const headers = filteredArr[0];
      if (!headers || headers.length === 0) { toast('文件缺少表头', 'error'); return; }

      const prev = recordState();
      const columns = getColumns();
      const flatCols = getTopCols(columns).flatMap(tc => {
        const children = getChildCols(columns, tc.id);
        return children.length > 0 ? children : [tc];
      });

      const colMap = {};
      const newCols = [];
      headers.forEach((h, i) => {
        const label = String(h || '').trim().replace(/[\r\n]/g, '') || '列' + (i + 1);
        let col = flatCols.find(c => c.label === label);
        if (!col) col = columns.find(c => c.label === label);
        if (!col) {
          col = { id: genId(), label, parentId: null, order: columns.length + newCols.length };
          newCols.push(col);
        }
        colMap[i] = col.id;
      });
      columns.push(...newCols);

      const existingRows = getRows();
      const keyColIds = Object.values(colMap).slice(0, 2);
      const rowKeyMap = {};
      existingRows.forEach(r => {
        const key = keyColIds.map(cid => (r.cells[cid] || '').trim()).join('||');
        if (key && key !== '||') rowKeyMap[key] = r;
      });

      let addedCount = 0, updatedCount = 0;
      const newRows = [];
      for (let i = 1; i < filteredArr.length; i++) {
        const rowData = filteredArr[i] || [];
        if (rowData.every(v => v === '' || v == null)) continue;

        const cells = {};
        rowData.forEach((val, j) => {
          const colId = colMap[j];
          if (colId) {
            cells[colId] = val != null ? String(val).trim() : '';
          }
        });

        const key = keyColIds.map(cid => (cells[cid] || '').trim()).join('||');
        if (key && key !== '||' && rowKeyMap[key]) {
          Object.assign(rowKeyMap[key].cells, cells);
          updatedCount++;
        } else {
          newRows.push({ id: genId(), cells, createdAt: new Date().toISOString() });
          addedCount++;
        }
      }

      const finalRows = [...existingRows, ...newRows];
      saveColumns(columns);
      saveRows(finalRows);
      logOp('import', 'excel', prev);
      renderDataTable();
      renderMonitor();

      let msg = '导入完成';
      if (addedCount > 0) msg += `，新增 ${addedCount} 条`;
      if (updatedCount > 0) msg += `，更新 ${updatedCount} 条`;
      if (newCols.length > 0) msg += `，新增 ${newCols.length} 列`;
      toast(msg);
    } catch (err) {
      console.error('导入错误：', err);
      toast('导入失败：' + (err.message || '文件解析错误，请检查格式'), 'error');
    }
  };
  reader.onerror = () => toast('文件读取失败', 'error');
  reader.readAsArrayBuffer(file);
}

// ============ App Init ============
function initApp() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
      if (tab.dataset.panel === 'monitor') renderMonitor();
      if (tab.dataset.panel === 'log') renderLogs();
    };
  });

  document.getElementById('modal-close').onclick = () => document.getElementById('detail-modal').classList.remove('show');
  document.getElementById('detail-modal').onclick = (e) => {
    if (e.target.id === 'detail-modal') e.target.classList.remove('show');
  };

  document.getElementById('btn-add-row').onclick = addRow;
  document.getElementById('btn-add-col').onclick = () => addColumn(null);
  document.getElementById('btn-add-subcol').onclick = () => {
    const topCols = getTopCols(getColumns());
    const parent = topCols[0];
    if (parent) addColumn(parent.id); else toast('请先添加父列', 'error');
  };
  document.getElementById('btn-export').onclick = exportExcel;
  document.getElementById('btn-import').onclick = () => document.getElementById('file-import').click();
  document.getElementById('file-import').onchange = (e) => {
    const f = e.target.files[0];
    if (f) importExcel(f);
    e.target.value = '';
  };

  renderDataTable();
  renderMonitor();
  renderLogs();
}

// ============ Bootstrap ============
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('logout-btn').addEventListener('click', handleLogout);

if (checkLogin()) {
  initApp();
}
