import axiosClient from "./api/axiosClient.js";
import postApi from "./api/postApi.js";

async function create() {
  try {
    const queryParams = {
      _page: 1,
      _limit: 10,
    };
    const response = await postApi.getAll(queryParams);
    console.log(response);
  } catch (error) {}
}

create();
