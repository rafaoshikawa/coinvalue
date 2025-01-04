
// Atualizar a data atual
function updateDate() {
  const dateElement = document.getElementById('current-date');
  const now = new Date();

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  dateElement.textContent = now.toLocaleDateString('pt-BR', options);
}

// Buscar dados da API
async function fetchData() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-USD');
    const data = await response.json();

    document.getElementById('euro-price').textContent = `R$${parseFloat(data.EURBRL.bid).toFixed(2)}`;
    document.getElementById('euro-percent').textContent = `${data.EURBRL.pctChange}%`;

    document.getElementById('dollar-price').textContent = `R$${parseFloat(data.USDBRL.bid).toFixed(2)}`;
    document.getElementById('dollar-percent').textContent = `${data.USDBRL.pctChange}%`;

    document.getElementById('bitcoin-price').textContent = `$${parseFloat(data.BTCUSD.bid).toLocaleString('pt-BR')}`;
    document.getElementById('bitcoin-percent').textContent = `${data.BTCUSD.pctChange}%`;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

// Alternar cartões
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const buttons = document.querySelectorAll('.card-nav button');

  function switchCard(target) {
    cards.forEach(card => {
      card.classList.remove('active');
      if (card.dataset.card === target) {
        card.classList.add('active');
      }
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      switchCard(target);
    });
  });

  updateDate();
  fetchData();
  switchCard('euro'); // Inicia com o Euro visível
});
// Espera 1.5 segundos para esconder o loader e mostrar o conteúdo
window.onload = () => {
  setTimeout(() => {
    // Esconde o loader
    document.getElementById('loader').style.display = 'none';
    
    // Exibe o conteúdo principal
    document.getElementById('content').style.display = 'block';

    updateDate();  // Atualizar data e hora
    fetchData();   // Buscar dados da API
  }, 1500);  // 1.5 segundos de delay
};