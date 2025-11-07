document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('joke-btn');
  const jokeP = document.getElementById('joke');

  btn.addEventListener('click', async () => {
    const prev = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Loading...';
    try {
      // Call REST API endpoint
      const resp = await fetch('/api/jotd', { cache: 'no-store' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const joke = await resp.json();
      jokeP.textContent = joke
        ? `${joke.setup} ${joke.punchline}`
        : 'No jokes available.';
    } catch (e) {
      console.error(e);
      jokeP.textContent = 'Oops. Could not load a joke.';
    } finally {
      btn.disabled = false;
      btn.textContent = prev;
    }
  });
});
