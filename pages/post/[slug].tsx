import { GetStaticProps } from "next";
import Head from "next/head";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import Header from "../Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [Submited, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "success") {
          setSubmitted(true);
        } else {
          console.error(result);
        }
      })
      .catch((error) => {
        console.error(error);
        setSubmitted(false);
      });
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <main>
        <Header/>
        <div className="pt-16 max-w-4xl mx-auto bg-white">
          <div className="w-full flex justify-center items-center mb-2 md:mb-5">
            <img src={urlFor(post.mainImage).url()!} alt="Blog-Photo" />
          </div>
          <div className="post-details px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {post.title}
            </h1>
            <div className="post-description">
              <p className="md:text-lg text-gray-600">{post.description}</p>
            </div>
            <div className="user flex items-center gap-5 mt-2 mb-2 pt-3 border-t border-gray-200">
              <img
                className="h-10 w-10 rounded-full"
                src={urlFor(post.author.image).url()!}
                alt="user-profile"
              />
              <div className="user-details">
                <h2 className="text-md font-bold ">{post.author.name}</h2>

                <PortableText
                  className=""
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                  content={post.author.bio}
                  serializers={{
                    normal: ({ children }: any) => {
                      return <h1 className="text-sm">{children}</h1>;
                    },
                  }}
                />
              </div>
            </div>
            <article>
              <PortableText
                className=""
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post.body}
                serializers={{
                  h1: (props: any) => {
                    return <h1 className="text-3xl font-bold" {...props} />;
                  },
                  h2: (props: any) => {
                    return <h1 className="text-2xl font-semibold" {...props} />;
                  },
                  h3: (props: any) => {
                    return <h1 className="text-xl font-medium" {...props} />;
                  },
                  h4: (props: any) => {
                    return <h1 className="text-md font-medium" {...props} />;
                  },
                  li: ({ children }: any) => {
                    return <li className="ml-4 list-disc">{children}</li>;
                  },
                  blockquote: ({ children }: any) => {
                    return (
                      <blockquote className="italic border-l-2 border-blue-700 pl-2 my-2">
                        <span className="text-2xl">&#x201C;</span>
                        {children}
                      </blockquote>
                    );
                  },
                  link: ({ href, children }: any) => {
                    return (
                      <a href={href} className="text-cyan-500 hover:underline">
                        {children}
                      </a>
                    );
                  },
                }}
              />
            </article>
          </div>
          <hr className="m-5 bg-gray-100" />
          {Submited ? (
            <div className="text-center py-10 my-10 rounded-lg bg-green-600 text-white">
              <span className="text-9xl">&#9829;</span>
              <h3 className="text-2xl font-semmibold">
                Your comment has been submitted!
              </h3>
              <p>Once it has been approved, It will appear below!</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-5 max-w-2xl mx-auto mb-10 "
            >
              <h3 className="text-sm font-semibold">Enjoyed this article?</h3>
              <h3 className="text-2xl font-semibold">Leave a comment below!</h3>

              <input
                {...register("_id")}
                type="hidden"
                name="_id"
                value={post._id}
              />

              <label className="block mt-5" htmlFor="name">
                <span className="block text-slate-600 text-sm font-semibold mb-2">
                  Full Name
                </span>
                <input
                  {...register("name", {
                    required: "Your full name is required",
                    pattern: {
                      value: /^[a-zA-Z ]+$/g,
                      message: "Special character is not allowed",
                    },
                  })}
                  placeholder="Enter your full name"
                  className="border-0 px-3 py-3 placeholder-slate-400 text-slate-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  type="text"
                  name="name"
                />
                {errors.name ? (
                  <span className="text-red-600 text-sm">
                    {errors.name.message}
                  </span>
                ) : null}
              </label>
              <label className="block mt-3" htmlFor="email">
                <span className="block text-slate-600 text-sm font-semibold mb-2">
                  Email address
                </span>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)+.(com)$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email addresss"
                  className="border-0 px-3 py-3 placeholder-slate-400 text-slate-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  type="text"
                  name="email"
                />
                {errors.email ? (
                  <span className="text-red-600 text-sm">
                    {errors.email.message}
                  </span>
                ) : null}
              </label>

              <label className="block mt-3" htmlFor="comment">
                <span className="block text-slate-600 text-sm font-semibold mb-2">
                  Comment
                </span>
                <textarea
                  {...register("comment", { required: true, minLength: 8 })}
                  rows={8}
                  placeholder="Enter your comment"
                  className="resize-none border-0 px-3 py-3 placeholder-slate-400 text-slate-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  name="comment"
                />
                {errors.comment && (
                  <span className="text-red-600 text-sm">
                    Comment is required
                  </span>
                )}
              </label>
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="w-full md:w-auto text-white bg-slate-800 active:bg-slate-600 text-sm font-medium px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Submit Comment
                </button>
              </div>
            </form>
          )}
          <div className="px-5 w-full justify-center items-center">
            <h3 className="text-4xl font-medium">Comments</h3>
            <hr className="my-3" />
            {post.comments.map((comment) => {
              const date = new Date(comment._createdAt).toLocaleDateString();
              return (
                <div
                  key={comment._id}
                  className="user-comment flex gap-2 py-5 items-center border-b border-gray-100"
                >
                  <h3 className="font-semibold text-lg">{comment.name} : </h3>
                  <p className="text-md text-slate-500">{comment.comment}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center md:justify-between justify-center py-3">
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
      </main>
    </>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
        current
      }
    }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug] [0]{
        _id,
        _createdAt,
        title,
        author->{
        name,
        image,
        bio
      },
      'comments': *[
        _type =="comment" &&
        post._ref == ^._id &&
        approved == true],
      description,
      mainImage,
      slug,
      body
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    
    revalidate: 10,
  };
};

