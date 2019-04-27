const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search states.json and filter it
const searchStates = async searchText => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  //Get matches to current input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  // Do not return anything if input value is 0
  searchText.length === 0 ? (matches = []) : null;

  outputHTML(matches);
};

const outputHTML = matches => {
  if (matches.length > 0) {
    let html = matches
      .map(
        match => `
        <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${
          match.capital
        }</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};
search.addEventListener("input", () => searchStates(search.value));
