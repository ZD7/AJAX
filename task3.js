const currentUrl = "https://picsum.photos/v2/list?limit="

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  let value = document.querySelector('.input').value;
  
  if (value >= 1 && value <= 10) {    
    let reqUrl = url + `${value}`;
    
    xhr.open('GET', reqUrl, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    xhr.send();
      
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
    
  } else {
    const result = "число вне диапазона от 1 до 10";
    if (callback) {
      callback(result);
    }
  }
  
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.btn');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  
  if (typeof(apiData) != "string") {
    let cards = '';
    // console.log('start cards', cards);

    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
  } else {
    resultNode.innerHTML = apiData;
  }
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  useRequest(currentUrl, displayResult);
})