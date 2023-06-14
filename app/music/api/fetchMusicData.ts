import { BASE_URL, SONGS_URL } from "@/app/api/apiURLs";
import axios from "axios";
// import { BASE_URL } from "../../api/apiURLs";

export const fetchMusicData = async ({ url, params }) => {
  try {
    const response = await axios.get(BASE_URL + url, params);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSong2 = async (params, selectedSongNumber) => {
  //Fetch music

  const query_params = {
    responseType: "blob",
    params: {
      genre: `/${params.genre}`,
      song_number: selectedSongNumber,
    },
  };
  const response = await fetchMusicData({
    url: SONGS_URL,
    params: query_params,
  });
  //retrieving Answer with year.
  const contentType = response?.headers?.get("content-type");
  let answer_year;
  if (contentType?.startsWith("multipart/x-mixed-replace")) {
    answer_year = JSON.parse(contentType?.split("boundary=")[1]);
    // setAnswerYear(() => {
    //   return answer_year;
    // });
  }
  const audioBlob = new Blob([response?.data], { type: "audio/mpeg" });

  return { answerYear: answer_year, audioBlob: URL.createObjectURL(audioBlob) };
};
