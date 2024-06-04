import React from "react";

import img1 from "../assets/newsletter-1.jpg";
import img2 from "../assets/newsletter-2.jpg";
import img3 from "../assets/newsletter-3.jpg";
import avatar1 from "../assets/avatar-1.jpg";

const BlogPosts = () => {
  let posts = [
    {
      url: img1,
      userName: "Beshteya",
      userAvatar: avatar1,
      date: "December 21, 2021",
      title: "The Ultimate Guide to Traveling When You Have...",
      paragraph:
        "Image for cattle earth. May one Which life divide sea. Commodi soluta minima nemo,…",
    },
    {
      url: img2,
      userName: "Beshteya",
      userAvatar: avatar1,
      date: "December 21, 2021",
      title: "The Best Travel Insurance Companies for Seniors",
      paragraph:
        "Image for cattle earth. May one Which life divide sea. Commodi soluta minima nemo,…",
    },
    {
      url: img3,
      userName: "Beshteya",
      userAvatar: avatar1,

      date: "December 21, 2021",
      title: "18 Easy Steps for Planning Your Next Trip",
      paragraph:
        "Image for cattle earth. May one Which life divide sea. Commodi soluta minima nemo,…",
    },
    {
      url: img2,
      userName: "Beshteya",
      userAvatar: avatar1,
      date: "December 21, 2021",
      title: "The Best Travel Insurance Companies for Seniors",
      paragraph:
        "Image for cattle earth. May one Which life divide sea. Commodi soluta minima nemo,…",
    },
    {
      url: img3,
      userName: "Beshteya",
      userAvatar: avatar1,

      date: "December 21, 2021",
      title: "18 Easy Steps for Planning Your Next Trip",
      paragraph:
        "Image for cattle earth. May one Which life divide sea. Commodi soluta minima nemo,…",
    },
    {
      url: img1,
      userName: "Beshteya",
      userAvatar: avatar1,
      date: "December 21, 2021",
      title: "The Ultimate Guide to Traveling When You Have...",
      paragraph:
        "Image for cattle earth. May one Which life divide sea. Commodi soluta minima nemo,…",
    },
  ];
  return <div className="py-10 px-5 pb-20 bg-lightBlackClr">
    <div className="px-5 pb-10 grid grid-cols-1 lg:grid-cols-3 max-w-5xl mx-auto gap-3">
        {posts.map((post) => (
          <div className="max-w-xl group" key={post.title}>
            <div className="h-40 overflow-hidden">
              <img
                src={post.url}
                alt=""
                className="group-hover:scale-110 duration-500"
              />
            </div>
            <div className="flex flex-row p-5 justify-between">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={post.userAvatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full scale-150"
                  />
                </div>
                <div className="font-normal text-white text-sm">{post.userName}</div>
              </div>
              <div className="font-normal text-white text-sm flex items-center">{post.date}</div>
            </div>
            <div className="text-white font-semibold font-btnFont text-2xl px-5 text-left">{post.title}</div>
            <div className="font-normal text-lg text-fontClrGrey px-5 text-justify p-5">{post.paragraph}</div>
          </div>
        ))}
      </div>
  </div>;
};

export default BlogPosts;
