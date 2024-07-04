import postApi from "./api/postApi.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import dayjs from "dayjs";
import {
  initPagination,
  initSearch,
  renderPagination,
  renderPostList,
} from "./utils";

// to use fromNow function
dayjs.extend(relativeTime);

// handle change the page based on the URL
async function handleFilterChange(filterName, filterValue) {
  // update query param
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  // reset page if needed
  if (filterName === "title_like") {
    url.searchParams.set("_page", 1);
  }
  history.pushState({}, "", url);

  // fetch API
  // re-render postList
  const { data, pagination } = await postApi.getAll(url.searchParams);
  renderPostList("postList", data);
  renderPagination("postsPagination", pagination);
}

// set URL by the query params
function getSearchParams() {
  const url = new URL(window.location);

  if (!url.searchParams.get("_page")) url.searchParams.set("_page", 1);
  if (!url.searchParams.get("_limit")) url.searchParams.set("_limit", 10);

  history.pushState({}, "", url);
  return url.searchParams;
}

(async () => {
  // set default value for queryParams
  const queryParams = getSearchParams();

  // bind click for prev/next buttons
  initPagination({
    elementID: "postsPagination",
    defaultParams: queryParams,
    onChange: (page) => handleFilterChange("_page", page),
  });

  // handle search post
  initSearch({
    elementID: "searchInput",
    defaultParams: queryParams,
    onChange: (value) => handleFilterChange("title_like", value),
  });

  try {
    // fetch API and render data
    const { data, pagination } = await postApi.getAll(queryParams);
    renderPostList("postList", data);
    renderPagination("postsPagination", pagination);
  } catch (error) {}
})();
