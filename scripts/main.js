// Simple Random Joke Generator using the Official Joke API
// Fetches a random joke and displays it in the page.

const jokeText = document.getElementById('joke-text');
const btn = document.getElementById('new-joke');

function escapeHtml(str){
  return str.replace(/[&<>"']/g, (c)=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

async function fetchJoke(){
  jokeText.textContent = 'Loading...';
  try{
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if(!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    // data has {setup, punchline}
    jokeText.innerHTML = `<div class="setup">${escapeHtml(data.setup)}</div><div class="punchline" style="margin-top:8px;font-weight:700">${escapeHtml(data.punchline)}</div>`;
  }catch(err){
    console.error(err);
    jokeText.textContent = 'Could not fetch a joke at the moment. Please try again.';
  }
}

btn.addEventListener('click', fetchJoke);
// fetch one on load
fetchJoke();
