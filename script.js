// Символы на барабанах
const symbols = ['7', '🍒', '🍋', '🍊', '⭐', '🔔', '🍇', '💎'];

// Функция для получения случайного символа
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Функция для вращения барабана
function spinReel(reelElement) {
  let iterations = 20;
  const interval = setInterval(() => {
    reelElement.textContent = getRandomSymbol();
    iterations--;

    if (iterations === 0) {
      clearInterval(interval);
    }
  }, 100);
}

// Функция для запуска вращения всех барабанов
function spin(bet) {
  if (updateBalance(-bet)) { // Проверка баланса
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');
    const reel4 = document.getElementById('reel4');
    const reel5 = document.getElementById('reel5');

    spinReel(reel1);
    setTimeout(() => spinReel(reel2), 300);
    setTimeout(() => spinReel(reel3), 600);
    setTimeout(() => spinReel(reel4), 900);
    setTimeout(() => spinReel(reel5), 1200);

    setTimeout(() => checkWin(bet), 1500); // Передаем ставку в функцию checkWin
  } else {
    alert("Недостаточно средств!");
  }
}

// Функция для проверки выигрыша
function checkWin(bet) {
  const reel1 = document.getElementById('reel1').textContent;
  const reel2 = document.getElementById('reel2').textContent;
  const reel3 = document.getElementById('reel3').textContent;
  const reel4 = document.getElementById('reel4').textContent;
  const reel5 = document.getElementById('reel5').textContent;

  const reels = [reel1, reel2, reel3, reel4, reel5];
  const reelsString = reels.join('');

  const winningRegex = new RegExp(`(${Object.keys(combinations).join('|')})`);
  const match = reelsString.match(winningRegex);

  let winAmount = 0;
  const combinations = {
    '77777': 10000,
    '🍒🍒🍒🍒🍒': 5000,
    '🍋🍋🍋🍋🍋': 2500,
    '🍊🍊🍊🍊🍊': 1000,
    '⭐⭐⭐⭐⭐': 750,
    '🔔🔔🔔🔔🔔': 500,
    '🍇🍇🍇🍇🍇': 250,
    '💎💎💎💎💎': 100,
    '7777': 50,
    '🍒🍒🍒🍒': 25,
    '🍋🍋🍋🍋': 10,
    '🍊🍊🍊🍊': 5,
    '⭐⭐⭐⭐': 4,
    '🔔🔔🔔🔔': 3,
    '🍇🍇🍇🍇': 2,
    '💎💎💎💎': 1
  };

  if (match) {
    winAmount = combinations[match[0]] * bet / 10; // Выигрыш пропорционален ставке
    updateBalance(winAmount);
    updateWins(1);
    document.getElementById('result').textContent = `You win ${winAmount} coins!`;
  } else {
    document.getElementById('result').textContent = 'You lose! Try again.';
  }
}

// Обновление баланса (возвращает true, если операция успешна, иначе false)
function updateBalance(amount) {
  let balance = parseInt(document.getElementById('balance').textContent);
  balance += amount;
  if (balance >= 0) {
    document.getElementById('balance').textContent = balance;
    return true; // Баланс не отрицательный
  } else {
    return false; // Баланс отрицательный
  }
}

// Обновление счетчика выигрышей
function updateWins(amount) {
  let wins = parseInt(document.getElementById('wins').textContent);
  wins += amount;
  document.getElementById('wins').textContent = wins;
}