// handle exit button to exit modal
export function handleExitBtnClick(modal) {
  const modalIcon = document.querySelector(".modal-icon");
  if (!modalIcon) return;

  modalIcon.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

// handle prev btn click
export function handlePrevBtnClick(
  imageModal,
  spanText,
  firstImage,
  lastImage
) {
  if (imageModal.src === firstImage.src) {
    spanText.innerText = "Image 2 of 2";
    imageModal.src = lastImage.src;
  } else {
    spanText.innerText = "Image 1 of 2";
    imageModal.src = firstImage.src;
  }
}

// handle next btn click
export function handleNextBtnClick(
  imageModal,
  spanText,
  firstImage,
  lastImage
) {
  if (imageModal.src === lastImage.src) {
    spanText.innerText = "Image 1 of 2";
    imageModal.src = firstImage.src;
  } else {
    spanText.innerText = "Image 2 of 2";
    imageModal.src = lastImage.src;
  }
}

// handle prev and next button logic
export function handlePrevNextBtn(
  modal,
  imageModal,
  spanText,
  postDetailContainer
) {
  const imageList = postDetailContainer.querySelectorAll(".post-image");
  if (!imageList) return;

  const [firstImage, lastImage] = imageList;
  const prevBtn = modal.querySelector(".modal-chevron--left");
  const nextBtn = modal.querySelector(".modal-chevron--right");
  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener("click", () =>
    handlePrevBtnClick(imageModal, spanText, firstImage, lastImage)
  );
  nextBtn.addEventListener("click", () =>
    handleNextBtnClick(imageModal, spanText, firstImage, lastImage)
  );
}
