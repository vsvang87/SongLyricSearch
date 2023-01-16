const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const errorMessage = document.getElementById("error-message");
const apiUrl = "https://api.lyrics.ovh";

//search song or artist
async function searchSong(term) {
  const response = await fetch(`${apiUrl}/suggest/${term}`);
  const data = await response.json();

  showData(data);
}
//show song and artist in DOM
function showData(data) {
  let display = "";

  data.data.forEach((song) => {
    display += `
    <li>
    <span><strong>${song.artist.name}</strong>
    - ${song.title}
    </span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>
    `;
  });
  result.innerHTML = `
  <ul class="songs">
  ${display}
  </ul>
  `;
}

//form, search Input value
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  console.log(searchTerm);
  //if else statement
  if (!searchTerm) {
    errorMessage.classList.add("active");
  } else if (searchTerm) {
    errorMessage.classList.remove("active");
    searchSong(searchTerm);
  }
});
