// ========== DOM 元素 ==========
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const pdfBtn = document.getElementById('pdfBtn');
const resume = document.getElementById('resume');

// 所有可编辑的内容元素（排除工具栏）
const editableSelectors = 'h1, .title, .contact, h2, section p, .item-head strong, .item-head span, .item ul li, .tags, .skills li';
const editableEls = document.querySelectorAll(editableSelectors);

// ========== 编辑模式切换 ==========
const EDIT_PASSWORD = 'qwe'; // 编辑密码

function setEditable(on) {
    editableEls.forEach(el => {
        el.setAttribute('contenteditable', on ? 'true' : 'false');
        el.setAttribute('spellcheck', 'false');
    });
    document.body.classList.toggle('editing', on);
    editBtn.hidden = on;
    saveBtn.hidden = !on;
}

function tryEnterEditMode() {
    const input = prompt('请输入编辑密码：');
    // 用户点取消
    if (input === null) return;

    if (input.trim() === EDIT_PASSWORD) {
        setEditable(true);
    } else {
        alert('密码错误，无法进入编辑模式。');
    }
}

editBtn.addEventListener('click', tryEnterEditMode);
saveBtn.addEventListener('click', () => setEditable(false));

// ESC 退出编辑模式
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !saveBtn.hidden) {
        setEditable(false);
    }
});

// 阻止 contenteditable 内回车换行（保持单行元素）
editableEls.forEach(el => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && el.tagName !== 'P' && el.tagName !== 'UL' && el.tagName !== 'LI') {
            e.preventDefault();
        }
    });
});

// ========== 导出 PDF（通过浏览器原生打印对话框）==========
pdfBtn.addEventListener('click', () => {
    // 若处于编辑模式，先退出
    if (!saveBtn.hidden) {
        setEditable(false);
    }
    // 给用户一个轻微提示
    pdfBtn.textContent = '⏳ 正在准备...';
    setTimeout(() => {
        window.print();
        pdfBtn.textContent = '⬇ 导出 PDF';
    }, 100);
});

// Ctrl/Cmd + P 快捷键
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        pdfBtn.click();
    }
});

console.log('简历网站已加载 ✓ - 支持编辑与导出 PDF');
