// set logic when click the prev and next buttons
export function renderPagination(elementID, pagination) {
  const ulElement = document.getElementById(elementID);
  if (!pagination || !ulElement) return;

  // calc the totalPages
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  // store the page and totalPages to ulElement
  ulElement.dataset.totalPages = totalPages;
  ulElement.dataset.page = _page;

  // check to disable or enable the prev and next buttons
  if (_page <= 1) ulElement.firstElementChild?.classList.add("disabled");
  else ulElement.firstElementChild?.classList.remove("disabled");

  if (_page >= totalPages) {
    ulElement.lastElementChild?.classList.add("disabled");
  } else ulElement.lastElementChild?.classList.remove("disabled");
}

// handle click event for prev and next button
export function initPagination({ elementID, defaultParams, onChange }) {
  const ulElement = document.getElementById(elementID);
  if (!ulElement) return;

  // use default params if needed

  const prevButton = ulElement.firstElementChild;
  const nextButton = ulElement.lastElementChild;
  if (!prevButton || !nextButton) return;

  // add click event for prev button
  prevButton?.firstElementChild.addEventListener("click", (event) => {
    event.preventDefault();
    const page = Number.parseInt(ulElement.dataset.page) || 1;
    if (page > 1) onChange?.(page - 1);
  });

  // add click event for next button
  nextButton?.firstElementChild.addEventListener("click", (event) => {
    event.preventDefault();
    const page = Number.parseInt(ulElement.dataset.page) || 1;
    const totalPages = Number.parseInt(ulElement.dataset.totalPages);

    if (page < totalPages) onChange?.(page + 1);
  });
}
