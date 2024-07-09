import relativeTime from "dayjs/plugin/relativeTime.js";
import dayjs from "dayjs";

// to use fromNow function
dayjs.extend(relativeTime);

import { setImageSrc, setTextContent, truncate } from "./common";

// create post element return the element to be appended by the postList element
export function createPostElement(post) {
  if (!post) return;

  // find and clone template
  const templateElement = document.getElementById("postItemTemplate");
  const liElement = templateElement.content.firstElementChild.cloneNode(true);
  if (!templateElement || !liElement) return;

  // update title, description, author, image, timeSpan, thumbnail
  setImageSrc(liElement, "[data-id='thumbnail']", post.imageUrl);
  setTextContent(liElement, "[data-id='title']", post.title);
  setTextContent(
    liElement,
    "[data-id='description']",
    truncate(post.description, 100)
  );
  setTextContent(liElement, "[data-id='author']", post.author);

  const timeSpan = ` - ${dayjs(post.updatedAt).fromNow()}`;
  setTextContent(liElement, "[data-id='timeSpan']", timeSpan);

  // attach events
  liElement.addEventListener("click", (event) => {
    if (event.target.closest('[data-id="edit"'))
      window.location.assign(`/add-edit-post.html?id=${post.id}`);
    else {
      const url = new URL("http://localhost:5173/post-detail.html");
      url.searchParams.set("id", post.id);
      window.location.href = url;
    }
  });

  return liElement;
}

// render post list by the URL
export function renderPostList(elementID, postList) {
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementID);
  if (!ulElement) return;

  ulElement.textContent = "";

  postList.forEach((post, idx) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}
