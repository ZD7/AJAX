const btn = document.querySelector('.btn');
const resultNode = document.querySelector('.result');

btn.addEventListener('click', () => {
  // Делаем запрос за данными
  let value1 = document.querySelector('.input1').value;
  let value2 = document.querySelector('.input2').value;
  
  if (value1 < 100 || value1 > 300 || value2 < 100 || value2 > 300 || isNaN(value1) || isNaN(value2)) {
    resultNode.innerHTML = "одно из чисел вне диапазона от 100 до 300";
  } else {
    fetch(`https://picsum.photos/${value1}/${value2}`)
      .then((response) => {
        // Объект ответа на запрос
        console.log('response', response);
        // Превращаем объект в JSON. Мы не можем его сразу прочитать,
        // надо отдать в следующий then
        const result = response;
        console.log('result', result);
        return result;
      })
      // .then(response => response.json())
      // response=>response и then data=>console.log(data.url)
      .then((data) => {
        // Объект результата в формате JSON
        console.log(data);
        card = ''
        const cardBlock = `
           <div class="card">
             <img
               src="${data.url}"
               class="card-image" width="${value1}" heigth="${value2}"
             />
          </div>
         `;
         card = card + cardBlock
        resultNode.innerHTML = card;
      })
      .catch(() => { console.log('error') });
  }
});