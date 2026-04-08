// 作业接口定义
interface Item {
  itemId: string;
  itemName: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  popularItem: 'Yes' | 'No';
  comment?: string;
}

// 全局数据存储
let inventory: Item[] = [];

// 消息提示
function showMsg(msg: string): void {
  const msgEl = document.getElementById('message');
  if (msgEl) msgEl.innerHTML = msg;
  setTimeout(() => {
    if (msgEl) msgEl.innerHTML = '';
  }, 3000);
}

// 添加物品
function addItem(): void {
  const itemIdInput = document.getElementById('itemId') as HTMLInputElement;
  const itemNameInput = document.getElementById('itemName') as HTMLInputElement;
  const categoryInput = document.getElementById('category') as HTMLSelectElement;
  const quantityInput = document.getElementById('quantity') as HTMLInputElement;
  const priceInput = document.getElementById('price') as HTMLInputElement;
  const supplierInput = document.getElementById('supplier') as HTMLInputElement;
  const stockStatusInput = document.getElementById('stockStatus') as HTMLSelectElement;
  const popularInput = document.getElementById('popular') as HTMLSelectElement;
  const commentInput = document.getElementById('comment') as HTMLTextAreaElement;

  if (!itemIdInput || !itemNameInput) return;

  const itemId = itemIdInput.value.trim();
  if (inventory.some(i => i.itemId === itemId)) {
    showMsg('Item ID already exists!');
    return;
  }

  const newItem: Item = {
    itemId,
    itemName: itemNameInput.value.trim(),
    category: categoryInput.value as Item['category'],
    quantity: Number(quantityInput.value),
    price: Number(priceInput.value),
    supplierName: supplierInput.value.trim(),
    stockStatus: stockStatusInput.value as Item['stockStatus'],
    popularItem: popularInput.value as Item['popularItem'],
    comment: commentInput.value.trim() || undefined
  };

  inventory.push(newItem);
  showMsg('Item added successfully!');
  showAll();

  // 清空表单
  itemIdInput.value = '';
  itemNameInput.value = '';
  quantityInput.value = '';
  priceInput.value = '';
  supplierInput.value = '';
  commentInput.value = '';
}

// 显示全部
function showAll(): void {
  const outputEl = document.getElementById('output');
  if (!outputEl) return;

  let out = '<h3>All Inventory Items</h3>';
  if (inventory.length === 0) {
    out += '<p>No items in inventory yet.</p>';
    outputEl.innerHTML = out;
    return;
  }

  inventory.forEach(item => {
    out += `<div class="item">
      <strong>${item.itemName}</strong> (ID: ${item.itemId})<br>
      Category: ${item.category} | Qty: ${item.quantity} | Price: $${item.price.toFixed(2)}<br>
      Supplier: ${item.supplierName} | Status: ${item.stockStatus} | Popular: ${item.popularItem}<br>
      ${item.comment ? `Comment: ${item.comment}` : ''}
      <button onclick="editItem('${item.itemId}')">Edit</button>
      <button onclick="deleteItem('${item.itemId}')">Delete</button>
    </div>`;
  });

  outputEl.innerHTML = out;
}

// 显示热门
function showPopular(): void {
  const outputEl = document.getElementById('output');
  if (!outputEl) return;

  const popularItems = inventory.filter(i => i.popularItem === 'Yes');
  let out = '<h3>Popular Items</h3>';

  if (popularItems.length === 0) {
    out += '<p>No popular items marked yet.</p>';
  } else {
    popularItems.forEach(item => {
      out += `<div class="item">
        <strong>${item.itemName}</strong> (ID: ${item.itemId})<br>
        Category: ${item.category} | Price: $${item.price.toFixed(2)}
      </div>`;
    });
  }

  outputEl.innerHTML = out;
}

// 搜索
function searchItem(): void {
  const searchInput = document.getElementById('searchName') as HTMLInputElement;
  const outputEl = document.getElementById('output');
  if (!searchInput || !outputEl) return;

  const keyword = searchInput.value.toLowerCase().trim();
  const results = inventory.filter(i => i.itemName.toLowerCase().includes(keyword));

  let out = '<h3>Search Results</h3>';
  if (results.length === 0) {
    out += '<p>No items match your search.</p>';
  } else {
    results.forEach(item => {
      out += `<div class="item">
        <strong>${item.itemName}</strong> (ID: ${item.itemId})<br>
        Category: ${item.category} | Qty: ${item.quantity} | Price: $${item.price.toFixed(2)}
      </div>`;
    });
  }

  outputEl.innerHTML = out;
}

// 删除
function deleteItem(itemId: string): void {
  if (!confirm(`Are you sure you want to delete ID: ${itemId}?`)) return;

  inventory = inventory.filter(i => i.itemId !== itemId);
  showMsg('Item deleted successfully!');
  showAll();
}

// 编辑
function editItem(itemId: string): void {
  const item = inventory.find(i => i.itemId === itemId);
  if (!item) return;

  (document.getElementById('itemId') as HTMLInputElement).value = item.itemId;
  (document.getElementById('itemName') as HTMLInputElement).value = item.itemName;
  (document.getElementById('category') as HTMLSelectElement).value = item.category;
  (document.getElementById('quantity') as HTMLInputElement).value = String(item.quantity);
  (document.getElementById('price') as HTMLInputElement).value = String(item.price);
  (document.getElementById('supplier') as HTMLInputElement).value = item.supplierName;
  (document.getElementById('stockStatus') as HTMLSelectElement).value = item.stockStatus;
  (document.getElementById('popular') as HTMLSelectElement).value = item.popularItem;
  (document.getElementById('comment') as HTMLTextAreaElement).value = item.comment || '';

  showMsg('Item loaded for editing. Update and click "Add Item" to save.');
}

// 兼容双击打开：强制挂载到 window，确保 onclick 能找到
(window as any).addItem = addItem;
(window as any).showAll = showAll;
(window as any).showPopular = showPopular;
(window as any).searchItem = searchItem;
(window as any).deleteItem = deleteItem;
(window as any).editItem = editItem;