function pickJokeOfTheDay(jokes) {
  if (!Array.isArray(jokes) || jokes.length === 0) return null;
  // Stable index based on today's date (YYYY + day-of-year)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000); // ms per day
  const key = now.getFullYear() * 1000 + dayOfYear;
  return jokes[key % jokes.length];
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('joke-btn');
  const jokeP = document.getElementById('joke');

  btn.addEventListener('click', async () => {
    const prev = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Loading...';
    try {
      const resp = await fetch('./jokes.json', { cache: 'no-store' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const jokes = await resp.json();
      const joke = pickJokeOfTheDay(jokes);
      jokeP.textContent = joke
        ? `${joke.setup} ${joke.punchline}`
        : 'No jokes available today.';
    } catch (e) {
      console.error(e);
      jokeP.textContent = 'Oops. Could not load a joke.';
    } finally {
      btn.disabled = false;
      btn.textContent = prev;
    }
  });
});
