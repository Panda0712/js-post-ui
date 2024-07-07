import { handleExitBtnClick, handlePrevNextBtn } from "../utils";

// handle lightbox logic modal
export function handleLightBoxModal(postDetailContainer) {
  const modal = document.getElementById("modal");
  if (!modal) return;

  if (postDetailContainer.dataset.registered) return;

  const modalElement = modal.querySelector("#modal-element");
  if (!modalElement) return;

  const spanText = modal.querySelector("#modal-text span");
  if (!spanText) return;

  handleExitBtnClick(modal);

  postDetailContainer.addEventListener("click", (event) => {
    const imageElement = event.target.closest(".post-image");
    if (!imageElement) return;

    const imageModal = document.createElement("img");
    imageModal.src = imageElement.src;

    modal.classList.remove("active");
    modal.classList.add("active");
    modalElement.innerHTML = "";
    modalElement.appendChild(imageModal);
    handlePrevNextBtn(modal, imageModal, spanText, postDetailContainer);
  });

  // add registered dataset if clicked
  postDetailContainer.dataset.registered = "true";
}
