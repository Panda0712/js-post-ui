export function setImageSrc(selector, query, post) {
  if (!selector) return;

  const element = selector.querySelector(query);
  if (element) {
    element.srcset = post;

    element.addEventListener("error", () => {
      element.srcset = "https://placehold.jp/1368x400.png";
    });
  }
}

export function setBackgroundSrc(query, post) {
  const element = document.getElementById(query);
  if (element) {
    element.style.backgroundImage = `url(${post})`;

    element.addEventListener("error", () => {
      element.style.backgroundImage = `url("https://placehold.jp/1368x400.png")`;
    });
  }
}

export function setTextContent(selector, query, post) {
  if (!selector) return;

  const element = selector.querySelector(query);
  if (element) element.textContent = post;
}

export function truncate(text, length) {
  if (text.length <= length) return text;

  return `${text.slice(0, length - 1)}…`;
}
