import { useEffect, useState } from "react";
import { ANSWER_URL } from "../../../constants";

import PageSongs from "../PageSongs";
import { getMusicData } from "../getMusicData";

const GenreView = ({ genre }) => {
  const [answers, setAnswers] = useState("");
  const [loading, setLoading] = useState(false);

  const params = {
    params: { genre: genre },
  };

  const fetchData = async () => {
    const response = await getMusicData({ url: ANSWER_URL, params: params });
    setAnswers(() => response?.data);
  };
  useEffect(() => {
    fetchData();
    setAnswers(
      { index: "none", artist: "none", song: "none" },
      { index: "none", artist: "none", song: "none" },
      { index: "none", artist: "none", song: "none" }
    );
    setLoading(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  // if (loading){

  // }
  return <>{loading && <PageSongs genre={genre} answers={answers} />}</>;
};

export default GenreView;
