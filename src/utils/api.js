const DOMAIN_URL = 'https://norma.nomoreparties.space';
const INGREDIENTS_URL = '/api/ingredients'
const ORDER_URL = '/api/orders'

export async function dataLoad() {
  const res = await fetch(`${DOMAIN_URL}${INGREDIENTS_URL}`);
  if (!res.ok)
    throw Error(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
  const result = await res.json();
  if (!result.success) {
    throw Error('В json-ответе success !== true');
  }
  if (result.data && result.data.length > 0) {
    return result.data;
  }
  else {
    throw Error('возвращен пустой или некорректный набор данных');
  }
}

export async function createOrder(ingredients) {
  const res = await fetch(`${DOMAIN_URL}${ORDER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })    
  })

  if (!res.ok)
    throw Error(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
  const result = await res.json();
  if (!result.success) {
    throw Error('В json-ответе success !== true');
  }
  if (result.order && typeof result.order.number === "number") {
    return result.order.number;
  }
  else {
    throw Error('возвращен пустой или некорректный набор данных');
  }
}