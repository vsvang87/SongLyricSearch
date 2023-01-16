const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const errorMessage = document.getElementById("error-message");
const more = document.getElementById("more");
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
  //checking for more pages using prev and next button
  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    } 
    `;
  } else {
    more.innerHTML = "";
  }
}
//get prev or next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}
//Get lyrics for song
async function getLyrics(artist, songTitle) {
  const response = await fetch(
    `https://api.lyrics.ovh/v1/${artist}/${songTitle}`
  );
  const data = await response.json();
  console.log(data);
  //getting lyrics back formatted
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><span>${lyrics}</span>`;
  more.innerHTML = "";
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
//get lyric button
result.addEventListener("click", (e) => {
  const clickedElement = e.target;

  if (clickedElement.tagName === "BUTTON") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
