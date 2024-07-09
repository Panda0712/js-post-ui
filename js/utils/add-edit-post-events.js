import axios from "axios";

// handle disabled/enabled submit button
export function showLoading(submitButton) {
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
}

export function hideLoading(submitButton) {
  submitButton.disabled = false;
  submitButton.textContent = "Save";
}

// handle change random post image button
export async function handleChangePostImageButton(postHeroSection) {
  try {
    const response = await axios.get("https://picsum.photos/1368/800", {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 400;
      },
    });

    const imageUrl = response.headers.location || response.request.responseURL;
    postHeroSection.style.backgroundImage = `url(${imageUrl})`;
  } catch (error) {
    console.log("Error fetching random image: ", error);
  }
}

// handle change upload post image
export function handleChangeUploadImage(uploadValue, postHeroSection) {
  if (uploadValue) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;
      postHeroSection.style.backgroundImage = `url(${imageUrl})`;
    };

    reader.readAsDataURL(uploadValue);
  }
}

// handle show/hide image change options
export function handleShowImageChange({
  radioListSelector,
  uploadFileID,
  randomImageID,
}) {
  const radioList = document.querySelectorAll(radioListSelector);
  const uploadFileElement = document.getElementById(uploadFileID);
  const randomImageElement = document.getElementById(randomImageID);
  if (!radioList || !uploadFileElement || !randomImageElement) return;

  radioList.forEach((radioElement) => {
    radioElement.addEventListener("change", () => {
      uploadFileElement.classList.toggle("hide");
      randomImageElement.classList.toggle("hide");
    });
  });
}

// handle events for radio and buttons
export function handleRadioAndButton({
  postHeroImage,
  postButton,
  postFormFile,
}) {
  const postHeroSection = document.getElementById(postHeroImage);
  const postChangeButton = document.getElementById(postButton);
  const postFormFileInput = document.getElementById(postFormFile);
  if (!postHeroSection || !postChangeButton || !postFormFileInput) return;

  postChangeButton.addEventListener("click", () =>
    handleChangePostImageButton(postHeroSection)
  );
  postFormFileInput.addEventListener("change", (event) =>
    handleChangeUploadImage(event.target.files[0], postHeroSection)
  );
}
