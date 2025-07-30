const words = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "Ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "consequat", "Duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "Sed", "ut", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "sit", "voluptatem", "accusantium", "doloremque", "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis", "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt", "explicabo", "Nemo", "enim", "ipsam", "voluptatem", "quia", "voluptas", "sit", "aspernatur", "aut", "odit", "aut", "fugit", "sed", "quia", "consequuntur", "magni", "dolores", "eos", "qui", "ratione", "voluptatem", "sequi", "nesciunt", "Neque", "porro", "quisquam", "est", "qui", "dolorem", "ipsum", "quia", "dolor", "sit", "amet", "consectetur", "adipisci", "velit", "sed", "quia", "non", "numquam", "eius", "modi", "tempora", "incidunt", "ut", "labore", "et", "dolore", "magnam", "aliquam", "quaerat", "voluptatem", "Ut", "enim", "ad", "minima", "veniam", "quis", "nostrum", "exercitationem", "ullam", "corporis", "suscipit", "laboriosam", "nisi", "ut", "aliquid", "ex", "ea", "commodi", "consequatur", "Quis", "autem", "vel", "eum", "iure", "reprehenderit", "qui", "in", "ea", "voluptate", "velit", "esse", "quam", "nihil", "molestiae", "consequatur", "vel", "illum", "qui", "dolorem", "eum", "fugiat", "quo", "voluptas", "nulla", "pariatur"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function displayRandomWords(count = 10, targetElementId = 'random-words-output') {
    const outputElement = document.getElementById(targetElementId);
    if (!outputElement) {
        console.error(`Элемент с ID '${targetElementId}' не найден.`);
        return;
    }

    const actualCount = Math.max(0, parseInt(count, 10) || 0);

    let generatedText = [];
    for (let i = 0; i < actualCount; i++) {
        const randomIndex = getRandomInt(words.length);
        let word = words[randomIndex];

        // Добавляем запятую с некоторой вероятностью
        // Например, 20% шанс на запятую после слова, если это не последнее слово
        if (i < actualCount - 1 && getRandomInt(100) < 20) { // 20% шанс на запятую
            word += ',';
        }
        generatedText.push(word);
    }

    // Соединяем слова пробелами
    let finalString = generatedText.join(' ');

    // Добавляем точку в конце, если текст не пустой
    if (finalString.length > 0) {
        // Убираем возможную запятую перед точкой, если она оказалась последней
        if (finalString.endsWith(',')) {
            finalString = finalString.slice(0, -1); // Удаляем последнюю запятую
        }
        finalString += '.';
    }

    outputElement.textContent = finalString;
}

document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.getElementById("user-text");
    const userForm = document.getElementById('user-form');
    const outputMessageEl = document.getElementById('output-message');

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const inputData = inputEl.value;
        const numberOfWordsToGenerate = parseInt(inputData, 10);

        if (isNaN(numberOfWordsToGenerate) || numberOfWordsToGenerate <= 0) {
            outputMessageEl.textContent = 'Пожалуйста, введите положительное число для количества слов.';
            document.getElementById('random-words-output').textContent = '';
        } else {
            outputMessageEl.textContent = `Вы запросили: ${numberOfWordsToGenerate} слов.`;
            displayRandomWords(numberOfWordsToGenerate, 'random-words-output');
        }

        inputEl.value = '';
    });
});