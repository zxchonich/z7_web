// VIEW: усе, що користувач бачить. В'ю нічого не знає про модель і джерело даних.
// Методи getTableHead / getTableBody – чисті функції: результат залежить лише від аргументів.

const DOM_TABLE = document.querySelector('#movies-table');   // елемент, куди вставляємо таблицю

// Екранування, щоб текст з даних не міг стати HTML-розміткою
function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export default class ViewMovies {

    // Показ даних: приймає { names, data } і будує таблицю
    renderData({ names, data }) {
        const head = this.getTableHead(names);
        const body = this.getTableBody(names, data);
        DOM_TABLE.innerHTML = head + body;
    }

    // <thead> з назвами колонок
    getTableHead(names) {
        const cells = names.map(name => `<th>${escapeHtml(name)}</th>`).join('');
        return `<thead><tr>${cells}</tr></thead>`;
    }

    // <tbody>: map повертає масив рядків, join з'єднує їх в один великий рядок
    getTableBody(names, data) {
        const rows = data.map(item => {
            const cells = names.map(name => `<td>${escapeHtml(item[name])}</td>`).join('');
            return `<tr>${cells}</tr>`;
        });
        return `<tbody>${rows.join('')}</tbody>`;
    }

    // Показ помилки
    renderError(message) {
        DOM_TABLE.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'error';
        p.textContent = message;
        DOM_TABLE.insertAdjacentElement('afterend', p);
    }
}
