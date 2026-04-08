"use strict";
// 内存数据库
let inventory = [];
// 消息提示
function showMsg(msg) {
    document.getElementById('message').innerHTML = msg;
    setTimeout(() => {
        document.getElementById('message').innerHTML = '';
    }, 3000);
}
// 添加物品
function addItem() {
    const itemIdInput = document.getElementById('itemId');
    const itemNameInput = document.getElementById('itemName');
    const categoryInput = document.getElementById('category');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const supplierInput = document.getElementById('supplier');
    const stockStatusInput = document.getElementById('stockStatus');
    const popularInput = document.getElementById('popular');
    const commentInput = document.getElementById('comment');
    const itemId = itemIdInput.value.trim();
    const exists = inventory.some(i => i.itemId === itemId);
    if (exists) {
        showMsg('Item ID already exists!');
        return;
    }
    const commentValue = commentInput.value.trim();
    const newItem = {
        itemId,
        itemName: itemNameInput.value.trim(),
        category: categoryInput.value,
        quantity: Number(quantityInput.value),
        price: Number(priceInput.value),
        supplierName: supplierInput.value.trim(),
        stockStatus: stockStatusInput.value,
        popularItem: popularInput.value,
        ...(commentValue && { comment: commentValue })
    };
    inventory.push(newItem);
    showMsg('Item added successfully!');
    showAll();
    itemIdInput.value = '';
    itemNameInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
    supplierInput.value = '';
    commentInput.value = '';
}
// 显示全部
function showAll() {
    let out = '<h3>All Inventory Items</h3>';
    if (inventory.length === 0) {
        out += '<p>No items in inventory yet.</p>';
        document.getElementById('output').innerHTML = out;
        return;
    }
    inventory.forEach(item => {
        out += `<div class="item">
      <strong>${item.itemName}</strong> (ID: ${item.itemId})<br>
      Category: ${item.category} | Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}<br>
      Supplier: ${item.supplierName} | Stock Status: ${item.stockStatus} | Popular: ${item.popularItem}<br>
      ${item.comment ? 'Comment: ' + item.comment : ''}<br>
      <button class="edit-btn" data-name="${item.itemName.replace(/'/g, "\\'")}">Edit</button>
      <button class="delete-btn" data-name="${item.itemName.replace(/'/g, "\\'")}">Delete</button>
    </div>`;
    });
    document.getElementById('output').innerHTML = out;
    // 为动态生成的按钮绑定事件
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => editItem(btn.getAttribute('data-name')));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteItem(btn.getAttribute('data-name')));
    });
}
// 显示热门
function showPopular() {
    const popularItems = inventory.filter(i => i.popularItem === 'Yes');
    let out = '<h3>Popular Items</h3>';
    if (popularItems.length === 0) {
        out += '<p>No popular items marked yet.</p>';
    }
    else {
        popularItems.forEach(item => {
            out += `<div class="item">
        <strong>${item.itemName}</strong> (ID: ${item.itemId})<br>
        Category: ${item.category} | Price: $${item.price.toFixed(2)}
      </div>`;
        });
    }
    document.getElementById('output').innerHTML = out;
}
// 搜索
function searchItem() {
    const keyword = document.getElementById('searchName').value.toLowerCase().trim();
    const result = inventory.filter(i => i.itemName.toLowerCase().includes(keyword));
    let out = '<h3>Search Results</h3>';
    if (result.length === 0) {
        out += '<p>No items match your search.</p>';
    }
    else {
        result.forEach(item => {
            out += `<div class="item">
        <strong>${item.itemName}</strong> (ID: ${item.itemId})<br>
        Category: ${item.category} | Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}
      </div>`;
        });
    }
    document.getElementById('output').innerHTML = out;
}
// 删除
function deleteItem(name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`))
        return;
    inventory = inventory.filter(i => i.itemName !== name);
    showMsg('Item deleted successfully!');
    showAll();
}
// 编辑
function editItem(name) {
    const item = inventory.find(i => i.itemName === name);
    if (!item)
        return;
    document.getElementById('itemId').value = item.itemId;
    document.getElementById('itemName').value = item.itemName;
    document.getElementById('category').value = item.category;
    document.getElementById('quantity').value = String(item.quantity);
    document.getElementById('price').value = String(item.price);
    document.getElementById('supplier').value = item.supplierName;
    document.getElementById('stockStatus').value = item.stockStatus;
    document.getElementById('popular').value = item.popularItem;
    document.getElementById('comment').value = item.comment || '';
    showMsg('Item loaded for editing. Modify and click "Add Item" to update.');
}
// 页面加载完成后，绑定所有按钮事件（彻底解决模块作用域问题）
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addItemBtn')?.addEventListener('click', addItem);
    document.getElementById('showAllBtn')?.addEventListener('click', showAll);
    document.getElementById('showPopularBtn')?.addEventListener('click', showPopular);
    document.getElementById('searchName')?.addEventListener('input', searchItem);
});
