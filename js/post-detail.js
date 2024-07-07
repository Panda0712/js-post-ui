import postApi from "./api/postApi";
import { setBackgroundSrc, setTextContent, handleLightBoxModal } from "./utils";
import dayjs from "dayjs";

// render detail on post-detail page
function renderDetails(postDetailContainer, postData) {
  setBackgroundSrc("postHeroImage", postData.imageUrl);
  setTextContent(postDetailContainer, "#postDetailTitle", postData.title);
  setTextContent(postDetailContainer, "#postDetailAuthor", postData.author);
  setTextContent(
    postDetailContainer,
    "#postDetailDescription",
    postData.description
  );
  setTextContent(
    postDetailContainer,
    "#postDetailTimeSpan",
    dayjs(postData.updatedAt).format(" - HH:mm DD-MM-YYYY")
  );

  const editPageLink = document.getElementById("goToEditPageLink");
  if (!editPageLink) return;

  editPageLink.href = `/add-edit-post.html?id=${postData.id}`;
}

// fetch post data by id from api and handle render
async function handleRenderDetail() {
  const url = new URL(window.location);
  const postId = url.searchParams.get("id");
  const postDetailContainer = document.querySelector(".post-detail");
  if (!postDetailContainer) return;

  try {
    const postData = await postApi.getById(postId);
    renderDetails(postDetailContainer, postData);
    handleLightBoxModal(postDetailContainer);
  } catch (error) {
    console.log("error fetching data by id: ", error);
  }
}

(() => {
  handleRenderDetail();
})();
