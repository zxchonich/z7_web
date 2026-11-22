// MODEL: усе, що стосується даних – завантаження та обробка.
// Модель нічого не знає ні про в'ю, ні про контролер (пасивна модель).

// Посилання на дані. Можна замінити на посилання з Google Таблиць
// (Файл → Опублікувати в інтернеті → TSV), код працюватиме так само.
const DATA_URL = './data/movies.tsv';

// Роздільники для розбору. Google віддає рядки через \r\n, локальний файл – \r\n або \n,
// тому для рядків використовуємо регулярний вираз, що підходить для обох випадків.
const SEPARATOR_LINE = /\r?\n/;
const SEPARATOR_CELL = '\t';   // TSV – значення розділені табуляцією

export default class ModelMovies {

    // Запит за даними: повертає Promise з текстом
    loadData() {
        return fetch(DATA_URL).then(response => {
            if (!response.ok) {
                throw new Error('Не вдалося завантажити дані (' + response.status + ')');
            }
            return response.text();
        });
    }

    // Обробка даних: рядок -> двовимірний масив -> масив об'єктів
    parseData(text) {
        // 1. Рядок розбиваємо на рядки таблиці (порожні рядки відкидаємо)
        const tableArray = text.split(SEPARATOR_LINE).filter(line => line.trim() !== '');

        // 2. Кожен рядок розбиваємо на клітинки -> двовимірний масив
        const table = tableArray.map(line => line.split(SEPARATOR_CELL));

        // 3. Перший рядок – назви колонок
        const names = table.shift();

        // 4. Решту перетворюємо на масив об'єктів, ключі беремо з назв колонок
        //    (порядок колонок у таблиці може змінитися – код від цього не залежить)
        const data = table.map(row => {
            const item = {};
            names.forEach((name, index) => {
                item[name] = row[index];
            });
            return item;
        });

        return { names, data };
    }
}
