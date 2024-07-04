import debounce from "lodash.debounce";

// handle logic for search input
// Pure function - dump function
export function initSearch({ elementID, defaultParams, onChange }) {
  const searchInput = document.getElementById(elementID);
  if (!searchInput) return;

  // set default value by the query params
  if (defaultParams && defaultParams.get("title_like"))
    searchInput.value = defaultParams.get("title_like");

  const debounceSearch = debounce((event) => {
    onChange?.(event.target.value);
  }, 500);
  searchInput.addEventListener("input", debounceSearch);
}
