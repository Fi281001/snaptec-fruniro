import React from "react";
import Rectangle from "./Rectangle.js";
import "../main/Blog.css";
import imgblog1 from "../image/blogs/img-blog-1.png";
import imgblog2 from "../image/blogs/img-blog-2.png";
import imgblog3 from "../image/blogs/img-blog-3.png";
import recentpost1 from "../image/blogs/recent-post-1.png";
import recentpost2 from "../image/blogs/recent-post-2.png";
import recentpost3 from "../image/blogs/recent-post-3.png";
import recentpost4 from "../image/blogs/recent-post-4.png";
import recentpost5 from "../image/blogs/recent-post-5.png";

import Pagination from "./Pagination.js";

export default function Blog() {
  return (
    <>
      <Rectangle title="Blog" />
      <div className="container-blog">
        <div className="container__blog-left">
          {/* blog 1 */}
          <img src={imgblog1} alt="thumbnail-1" />
          <div className="group">
            <span>
              <i className="bi bi-person-fill"></i>Admin
            </span>
            <span>
              <i className="bi bi-calendar-fill"></i>14 Oct 2022
            </span>
            <span>
              <i className="bi bi-tag-fill"></i>Wood
            </span>
          </div>
          <div className="group-name-content">
            <div className="name">Going all-in with millennial design</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus
              at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis
              in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar
              mattis nunc sed blandit libero. Pellentesque elit ullamcorper
              dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean
              euismod elementum.
            </p>
          </div>
          <p className="read-more">
            Read more
            <hr className="pd-0" />
          </p>

          {/* blog 2 */}
          <img src={imgblog2} alt="thumbnail-1" />
          <div className="group">
            <span>
              <i className="bi bi-person-fill"></i>Admin
            </span>
            <span>
              <i className="bi bi-calendar-fill"></i>14 Oct 2022
            </span>
            <span>
              <i className="bi bi-tag-fill"></i>Wood
            </span>
          </div>
          <div className="group-name-content">
            <div className="name">Exploring new ways of decorating</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus
              at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis
              in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar
              mattis nunc sed blandit libero. Pellentesque elit ullamcorper
              dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean
              euismod elementum.
            </p>
          </div>
          <p className="read-more">
            Read more
            <hr className="pd-0" />
          </p>

          {/* blog 3 */}
          <img src={imgblog3} alt="thumbnail-1" />
          <div className="group">
            <span>
              <i className="bi bi-person-fill"></i>Admin
            </span>
            <span>
              <i className="bi bi-calendar-fill"></i>14 Oct 2022
            </span>
            <span>
              <i className="bi bi-tag-fill"></i>Wood
            </span>
          </div>
          <div className="group-name-content">
            <div className="name">Handmade pieces that took time to make</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus
              at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis
              in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar
              mattis nunc sed blandit libero. Pellentesque elit ullamcorper
              dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean
              euismod elementum.
            </p>
          </div>
          <p className="read-more">
            Read more
            <hr className="pd-0" />
          </p>
        </div>
        <div className="container__blog-right">
          <div className="display-flex-blog">
            <input className="container__input" type="text" required />
            <i className="bi bi-search"></i>
          </div>
          <div className="group-categories">
            <span className="categories">Categories</span>
          </div>
          <div className="content">
            <span>Crafts</span>
            <p>2</p>
          </div>
          <div className="content">
            <span>Design</span>
            <p>8</p>
          </div>
          <div className="content">
            <span>Handmade</span>
            <p>7</p>
          </div>
          <div className="content">
            <span>Interior</span>
            <p>1</p>
          </div>
          <div className="content">
            <span>Wood</span>
            <p>6</p>
          </div>

          <div className="recent-posts">
            <div className="recent-posts__span">Recent Posts</div>
            <div className="recent-posts__group">
              <img src={recentpost1} alt="recent-post-1" />
              <div className="recent-posts__name-post">
                <span>Going all-in with millennial design</span>
                <p>03 Aug 2022</p>
              </div>
            </div>{" "}
            <div className="recent-posts__group">
              <img src={recentpost2} alt="recent-post-2" />
              <div className="recent-posts__name-post">
                <span>Going all-in with millennial design</span>
                <p>03 Aug 2022</p>
              </div>
            </div>{" "}
            <div className="recent-posts__group">
              <img src={recentpost3} alt="recent-post-3" />
              <div className="recent-posts__name-post">
                <span>Going all-in with millennial design</span>
                <p>03 Aug 2022</p>
              </div>
            </div>{" "}
            <div className="recent-posts__group">
              <img src={recentpost4} alt="recent-post-4" />
              <div className="recent-posts__name-post">
                <span>Going all-in with millennial design</span>
                <p>03 Aug 2022</p>
              </div>
            </div>{" "}
            <div className="recent-posts__group">
              <img src={recentpost5} alt="recent-post-5" />
              <div className="recent-posts__name-post">
                <span>Going all-in with millennial design</span>
                <p>03 Aug 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination className="paginate-blog" />
    </>
  );
}
