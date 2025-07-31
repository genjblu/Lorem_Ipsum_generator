const words = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "Ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "consequat", "Duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "Sed", "ut", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "sit", "voluptatem", "accusantium", "doloremque", "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis", "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt", "explicabo", "Nemo", "enim", "ipsam", "voluptatem", "quia", "voluptas", "sit", "aspernatur", "aut", "odit", "aut", "fugit", "sed", "quia", "consequuntur", "magni", "dolores", "eos", "qui", "ratione", "voluptatem", "sequi", "nesciunt", "Neque", "porro", "quisquam", "est", "qui", "dolorem", "ipsum", "quia", "dolor", "sit", "amet", "consectetur", "adipisci", "velit", "sed", "quia", "non", "numquam", "eius", "modi", "tempora", "incidunt", "ut", "labore", "et", "dolore", "magnam", "aliquam", "quaerat", "voluptatem", "Ut", "enim", "ad", "minima", "veniam", "quis", "nostrum", "exercitationem", "ullam", "corporis", "suscipit", "laboriosam", "nisi", "ut", "aliquid", "ex", "ea", "commodi", "consequatur", "Quis", "autem", "vel", "eum", "iure", "reprehenderit", "qui", "in", "ea", "voluptate", "velit", "esse", "quam", "nihil", "molestiae", "consequatur", "vel", "illum", "qui", "dolorem", "eum", "fugiat", "quo", "voluptas", "nulla", "pariatur"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function displayRandomWords(count = 10, targetElementId = 'random-words-output') {
    const outputElement = document.getElementById(targetElementId);
    const copyButton = document.getElementById('copy-button'); // Получаем кнопку копирования

    if (!outputElement) {
        console.error(`Элемент с ID '${targetElementId}' не найден.`);
        if (copyButton) copyButton.style.display = 'none'; // Скрываем кнопку, если нет элемента вывода
        return;
    }

    const actualCount = Math.max(0, parseInt(count, 10) || 0);

    let generatedText = [];
    if (actualCount === 0) { // Если 0 слов, то текст пустой
        outputElement.textContent = '';
        if (copyButton) copyButton.style.display = 'none'; // Скрываем кнопку, если нет текста
        return;
    }

    for (let i = 0; i < actualCount; i++) {
        const randomIndex = getRandomInt(words.length);
        let word = words[randomIndex];

        if (i < actualCount - 1 && getRandomInt(100) < 20) {
            word += ',';
        }
        generatedText.push(word);
    }

    let finalString = generatedText.join(' ');

    if (finalString.length > 0) {
        if (finalString.endsWith(',')) {
            finalString = finalString.slice(0, -1);
        }
        finalString += '.';
    }

    outputElement.textContent = finalString;

    // Показываем кнопку копирования после успешной генерации текста
    if (copyButton) {
        copyButton.style.display = 'block'; // Или 'inline-block', если нужно, чтобы она была в одну строку с чем-то
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.getElementById("user-text");
    const userForm = document.getElementById('user-form');
    const outputMessageEl = document.getElementById('output-message');
    const copyButton = document.getElementById('copy-button'); // Получаем кнопку здесь тоже
    const randomWordsOutput = document.getElementById('random-words-output');

    // Если хотите, чтобы кнопка копирования всегда была скрыта при первой загрузке,
    // и появлялась только после первой генерации:
    if (copyButton) {
        copyButton.style.display = 'none';
    }


    userForm.addEventListener('submit', async (event) => { // Добавляем async
        event.preventDefault();

        const inputData = inputEl.value;
        const numberOfWordsToGenerate = parseInt(inputData, 10);

        outputMessageEl.classList.remove('error');

        if (isNaN(numberOfWordsToGenerate) || numberOfWordsToGenerate <= 0) {
            outputMessageEl.textContent = 'Пожалуйста, введите положительное число для количества слов.';
            outputMessageEl.classList.add('error');
            randomWordsOutput.textContent = ''; // Очищаем текст
            if (copyButton) copyButton.style.display = 'none'; // Скрываем кнопку, если ошибка
        } else {
            outputMessageEl.textContent = `Вы запросили: ${numberOfWordsToGenerate} слов.`;
            displayRandomWords(numberOfWordsToGenerate, 'random-words-output');
            // Кнопка copyButton уже будет показана внутри displayRandomWords
        }

        inputEl.value = '';
    });

    // Обработчик события для кнопки копирования
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const textToCopy = randomWordsOutput.textContent;

            try {
                // Используем Clipboard API для копирования
                await navigator.clipboard.writeText(textToCopy);
                outputMessageEl.textContent = 'Текст успешно скопирован!';
                outputMessageEl.classList.remove('error');
            } catch (err) {
                console.error('Не удалось скопировать текст:', err);
                outputMessageEl.textContent = 'Не удалось скопировать текст (возможно, браузер не разрешает).';
                outputMessageEl.classList.add('error');
            }
        });
    }
});