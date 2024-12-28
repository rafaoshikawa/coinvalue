// Atualizar a data atual
function updateDate() {
  const dateElement = document.getElementById('current-date');
  const now = new Date();

  // Configuração de formatação
  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };

  // Gerar texto formatado
  const formattedDate = now.toLocaleDateString('pt-BR', options);

  // Atualizar o elemento no HTML
  dateElement.textContent = formattedDate;
}

// Buscar dados da API
async function fetchData() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
    const data = await response.json();

    // Atualizar valores para Euro
    document.getElementById('euro-price').textContent = `R$${parseFloat(data.EURBRL.bid).toFixed(2)}`;
    document.getElementById('euro-percent').textContent = `${data.EURBRL.pctChange}%`;

    // Atualizar valores para Dólar
    document.getElementById('dollar-price').textContent = `R$${parseFloat(data.USDBRL.bid).toFixed(2)}`;
    document.getElementById('dollar-percent').textContent = `${data.USDBRL.pctChange}%`;

    // Atualizar valores para Bitcoin
    document.getElementById('bitcoin-price').textContent = `R$${parseFloat(data.BTCBRL.bid).toLocaleString('pt-BR')}`;
    document.getElementById('bitcoin-percent').textContent = `${data.BTCBRL.pctChange}%`;

  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

// Atualizar a página ao carregar
window.onload = () => {
  updateDate(); // Atualizar data e hora
  fetchData();  // Buscar dados da API
};
