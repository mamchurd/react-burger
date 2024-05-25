const URL_API = 'https://norma.nomoreparties.space/api/ingredients';

export async function dataLoad() {

    const res = await fetch(URL_API);
    if (!res.ok) {
      throw Error(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
    }
    const result = await res.json();
    if (!result.success) {
      throw Error('В json-ответе success !== true');
    }
    if (result.data && result.data.length > 0) {
      return Promise.resolve(result.data);
    }
    else {
      throw Error('возвращен пустой или некорректный набор данных');
    }
  
  }