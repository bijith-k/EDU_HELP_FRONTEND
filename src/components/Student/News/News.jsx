import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import Navbar from "../Home/Navbar";
import axios from "axios";
import news from "../../../assets/news.jpg";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import Footer from "../Footer/Footer";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(4);

  const lastNewsIndex = currentPage * newsPerPage;
  const firstNewsIndex = lastNewsIndex - newsPerPage;
  const [news, setNews] = useState([]);

  const currentNews = news.slice(firstNewsIndex, lastNewsIndex);

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     const response = await axios.get(
  //       `https://newsdata.io/api/1/news?apikey=${
  //         import.meta.env.VITE_NEWS_API_KEY
  //       }&q=education&country=in&language=en&category=science,technology`
  //     );
  //     setNews(response.data.results);

  //   };
  //   fetchNews();
  // }, []);
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"news"} />
      
      <div>
        <div className="h-4/6">
          {currentNews.map((news, index) => (
            <div className="p-2 flex justify-center ">
              <div className="bg-[#fffffe] hover:shadow-xl flex flex-col justify-evenly md:flex-row hover:opacity-90  text-[#232946]  w-3/4 rounded-xl mt-5 p-5 h-fit text-center">
                <div className=" w-40 flex flex-col mx-auto md:mx-0">
                  {news.image_url ? (
                    <img
                      src={news.image_url}
                      className="w-40  h-40 object-cover shadow-sm shadow-black"
                      alt=""
                    />
                  ) : (
                    <img
                      src={news}
                      className="w-40 rounded-bl-3xl rounded-tr-3xl shadow-sm shadow-black"
                      alt=""
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center md:items-start uppercase">
                  <div className="mb-4 font-bold">
                    <p className="text-center">{news.title}</p>
                  </div>
                  <div>
                    {" "}
                    <p className="text-center">{news.description}</p>
                  </div>
                  <div>
                    <p className="text-center">Source: {news.source_id}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span>
                    <a
                      href={news.link}
                      className="bg-[#232946] p-2 text-[#fffffe] rounded-3xl uppercase font-bold mt-5 w-full hover:bg-slate-500 hover:text-white mx-auto"
                    >
                      View
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          totalContents={news.length}
          contentsPerPage={newsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default News;
