function pickRandomJoke(jokes) {
    if (!Array.isArray(jokes) || jokes.length === 0) return null;
    const index = Math.floor(Math.random() * jokes.length);
    return jokes[index];
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
            const joke = pickRandomJoke(jokes);
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
