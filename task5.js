const btn = document.querySelector('.btn');
const resultNode = document.querySelector('.result');
const numberPage = document.querySelector('.numberPage');
const limitCards = document.querySelector('.limitCards');

btn.addEventListener('click', () => {
  if (numberPage.value == '' && limitCards.value == '') {
    let cardsHtml = localStorage.getItem("cards");
    if (cardsHtml) {
      resultNode.innerHTML = cardsHtml;
    }
  } else if (numberPage.value <1 || numberPage.value >10 || isNaN(numberPage.value)) {
    resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10";
  } else if (limitCards.value <1 || limitCards.value >10 || isNaN(limitCards.value)) {
    resultNode.innerHTML = "Лимит вне диапазона от 1 до 10";
  } else {
      fetch(`https://picsum.photos/v2/list?page=${numberPage.value}&limit=${limitCards.value}`)
        .then((response) => {
          // Объект ответа на запрос
          console.log('response', response);
          // Превращаем объект в JSON. Мы не можем его сразу прочитать,
          // надо отдать в следующий then
          const result = response.json();
          console.log('result', result);
          return result;
        })
        .then((data) => {
          // Объект результата в формате JSON
          // console.log(data);
          localStorage.clear();
          cards = ''
          data.forEach(item => {
            const cardBlock = `
              <div class="card">
                <img
                  src="${item.download_url}"
                  class="card-image" width=100 heigth=100
                />
             </div>
            `;
            cards = cards + cardBlock;
          });
          localStorage.setItem("cards", cards);
          resultNode.innerHTML = cards;
        })
        .catch(() => { console.log('error') });
  }
});