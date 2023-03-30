export async function fetchCurrencies() {
  const retorno = await fetch(
    'https://economia.awesomeapi.com.br/json/all',
  );
  const index = await retorno.json();
  return index;
}
