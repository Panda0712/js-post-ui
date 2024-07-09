import postApi from "./api/postApi";
import {
  Validator,
  handleRadioAndButton,
  handleShowImageChange,
  setInputValue,
  setBackgroundSrc,
} from "./utils";

// handle add or edit post
async function handlePatchData(data, postData, postHeroSectionID) {
  if (!data) return;

  const postHeroImage = document.getElementById(postHeroSectionID);
  if (!postHeroImage) return;

  if (postData) {
    await postApi.update({
      id: postData.id,
      title: data.title,
      author: data.author,
      description: data.description,
      imageUrl: postHeroImage.style.backgroundImage.slice(5, -2),
    });
    window.location.assign(`/post-detail.html?id=${postData.id}`);
  } else {
    const newPost = await postApi.add({
      title: data.title,
      author: data.author,
      description: data.description,
      imageUrl: postHeroImage.style.backgroundImage.slice(5, -2),
    });
    window.location.assign(`/post-detail.html?id=${newPost.id}`);
  }
}

// render data from fetching the api by the post id
function handleRenderPostData({
  postData,
  postHeroImage,
  postTitle,
  postAuthor,
  postDescription,
}) {
  setBackgroundSrc(postHeroImage, postData.imageUrl);
  setInputValue(document, postTitle, postData.title);
  setInputValue(document, postAuthor, postData.author);
  setInputValue(document, postDescription, postData.description);
}

(async () => {
  const queryParams = new URLSearchParams(window.location.search);

  handleRadioAndButton({
    postHeroImage: "postHeroImage",
    postButton: "postChangeImage",
    postFormFile: "formFile",
  });
  handleShowImageChange({
    radioListSelector: "[name='flexRadioDefault']",
    uploadFileID: "uploadFile",
    randomImageID: "randomImage",
  });

  const postID = queryParams.get("id");
  if (!postID) {
    // Gọi hàm Validator và truyền vào object của form cần validate
    Validator({
      form: "#postForm",
      errorMessage: ".invalid-feedback",
      formGroup: ".form-group",
      rules: [
        Validator.isRequiredTitle('input[name="title"]'),
        Validator.minLength('input[name="title"]', 4),
        Validator.isRequiredAuthor('input[name="author"]'),
        Validator.minLength('input[name="author"]', 6),
        Validator.minLength('textarea[name="description"]', 10),
      ],
      onSubmit: function (data) {
        handlePatchData(data, postID, "postHeroImage");
      },
    });
  } else {
    try {
      const postData = await postApi.getById(postID);
      handleRenderPostData({
        postData,
        postHeroImage: "postHeroImage",
        postTitle: 'input[name="title"]',
        postAuthor: 'input[name="author"]',
        postDescription: 'textarea[name="description"]',
      });
      // Gọi hàm Validator và truyền vào object của form cần validate
      Validator({
        form: "#postForm",
        errorMessage: ".invalid-feedback",
        formGroup: ".form-group",
        rules: [
          Validator.isRequiredTitle('input[name="title"]'),
          Validator.minLength('input[name="title"]', 4),
          Validator.isRequiredAuthor('input[name="author"]'),
          Validator.minLength('input[name="author"]', 6),
          Validator.minLength('textarea[name="description"]', 10),
        ],
        onSubmit: function (data) {
          handlePatchData(data, postData, "postHeroImage");
        },
      });
    } catch (error) {
      console.log("error fetching post data: ", error);
    }
  }
})();
