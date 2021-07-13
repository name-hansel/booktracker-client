import axios from "../../utils";

export const getLibraryData = async (userId: string) => {
  try {
    console.log("hello");
    // const { data } = await axios.get(`/library/${userId}`);
    // console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};
