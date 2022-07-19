import Head from "next/head";

import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Link from "next/link";
import Header from './Header'

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  const link = "";
  return (
    <>
      <Head>
        <title>Code Nam | Blog</title>
        <link rel="icon" href="/favicon.jpg" />
        <meta name="author" content="Noel Mallari" />
        <meta name="description" content="Simple blog page with groqq" />
      </Head>
      <main>
        <Header/>
        <section className="height-min relative pt-16 pb-32 flex content-center items-center justify-center">
          <div className="image absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="md:pr-12">
                  <h1 className="text-white font-semibold text-5xl md:text-7xl">
                  Code Nam
                  </h1>
                  <p className="mt-4 text-lg text-slate-200">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ducimus sint delectus perspiciatis ut quia. Aliquam eum sit facilis eligendi Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione labore nesciunt esse animi beatae rerum?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {posts.map((post) => {
                const date = new Date(post._createdAt);
                const description = post.description;
                const postTitle = post.title;
                const title =
                  postTitle.length > 20
                    ? `${postTitle.substring(0, 20)} ...`
                    : postTitle;
                const desc =
                  description.length > 115
                    ? `${description.substring(0, 115)} ...`
                    : description;
                return (
                  <div key={post._id} className="group w-full md:w-6/12 lg:w-3/12 px-4">
                    <Link href={`/post/${post.slug.current}`}>
                      <div className="cursor-pointer group-hover:scale-105 transition-transform duration-500 ease-in-out pb-5 flex-auto relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <img
                          className="h-60 w-full align-middle rounded-t-lg object-cover"
                          src={urlFor(post.mainImage).url()!}
                          alt="Thumbnail"
                        />
                        <div className="description border-t border-slate-200 px-4">
                          <div>
                            <h6 className="text-xl font-semibold mt-2 flex justify-between">
                              {title}
                              <small className="font-normal text-xs">
                                {date.toLocaleDateString()}
                              </small>
                            </h6>
                          </div>
                          <p className="h-16 mt-2 mb-4 text-slate-500">
                            {desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="relative bg-slate-100 pt-8 pb-6">

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 px-4">
                <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
                <h5 className="text-lg mt-0 mb-2 text-slate-600">
                  Find us on any of these platforms, we respond within 24
                  hours.
                </h5>
                <div className="mt-6">
                  <a
                    href="https://web.facebook.com/noel.mallari.5648137"
                    target="_blank"
                  >
                    <i className="fa fa-facebook-square bg-white text-sky-600 shadow-lg font-lg p-3 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-block text-center"></i>
                  </a>
                  <a
                    href="https://www.github.com/namcodes"
                    target="_blank"
                  >
                    <i className="fa fa-github bg-white text-slate-800 shadow-lg font-lg p-3 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-block text-center"></i>
                  </a>
                </div>
                <p className="text-sm mt-6 text-slate-500 font-semibold">
                  Currently v1.0 Code
                  <a
                    href="https://github.com/namcodes?tab=repositories"
                    className="text-slate-600"
                    target="_blank"
                  ></a>
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    className="text-slate-600"
                  ></a>
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4">
                <div className="flex flex-wrap items-top mb-6">
                  <div className="w-full md:w-6/12 xl:w-4/12 pt-6 md:pt-0 md:px-4 ml-auto">
                    <span className="block text-slate-500 text-sm font-semibold mb-2">
                      Social Media
                    </span>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href="https://web.facebook.com/Codenam2020"
                          target="_blank"
                        >
                          Facebook Page
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href="https://creative-tim.com/blog"
                          target="_blank"
                        >
                          Facebook Group
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href="https://www.github.com/namcodes"
                          target="_blank"
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full md:w-6/12 xl:w-4/12 pt-6 md:pt-0 md:px-4 ml-auto">
                    <span className="block uppercase text-slate-500 text-sm font-semibold mb-2">
                      Other Resources
                    </span>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href="https://raw.githubusercontent.com/namcodes/MERN-CRUD-with-Login-Register/main/LICENSE"
                          target="_blank"
                        >
                          MIT License
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href="#"
                          target="_blank"
                        >
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href="#"
                          target="_blank"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href="https://web.facebook.com/Codenam2020"
                          target="_blank"
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-6 border-slate-300" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm text-slate-500 font-semibold py-1">
                  <a
                    href="https://www.facebook.com/noel.mallari.5648137"
                    className="text-slate-500 hover:text-slate-800"
                    target="_blank"
                  >
                    Developed By : Noel Mallari
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    _createdAt,
    title,
    author -> {
    name,
    image,
    },
     description,
     mainImage,
     slug,
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
