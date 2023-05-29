import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";


export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ blogPost: string[] }>) {
  const blogPost =
    (await builder
      .get("blog-post", {
        userAttributes: {
          urlPath: `/blog/${params?.blogPost?.join("/") || ""}`,
        },
      })
      .toPromise()) || null;

  return {
    props: {
      blogPost,
    },

    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const blogPosts = await builder.getAll("blog-post", {
    options: { noTargeting: true, includeRef: true },
    omit: "data.blocks",
  });
  console.log(blogPosts);
  const paths = blogPosts.map((blogPost) => `${blogPost.data?.url}`);
  console.log(paths)
  return {
    paths,
    fallback: true,
  };
}

export default function BlogPost({
  blogPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const isPreviewingInBuilder = useIsPreviewing();
  const show404 = !blogPost && !isPreviewingInBuilder && !router.isFallback;
  console.log("router", router.isFallback);  
  console.log("404", blogPost);  
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!blogPost || <meta name="robots" content="noindex" />}
      </Head>
      {show404 ? (
         
        <DefaultErrorPage statusCode={404} />
      ) : (
        <>
          <>
            {
              // This check allows us to render on-demand any page
              // that has not yet been generated
              !router.isFallback && (
                <>
                  {blogPost?.data.cover.asset && (
                      <>Hello</>
                  )}

                  <>
                    {blogPost && (
                      <h2>
                        {blogPost.data.title}
                      </h2>
                    )}

                    <>
                      <>
                        {blogPost && (
                          <h4>{blogPost.data.leadIn}</h4>
                        )}

                        {blogPost && (
                          <>
                            <>
                                {blogPost.data.author.value?.data}
                                {blogPost.data.publishedDate}
                                {blogPost.firstPublished}
                            </>
                          </>
                        )}

                        <>
                          <BuilderComponent
                            model="blog-post"
                            content={blogPost}
                            
                         />
                         
                        </>
                      </>
                    </>

                    {blogPost && (
                      <>
                            <>
                                {blogPost.data.author.value?.data}
                                {blogPost.data.publishedDate}
                                {blogPost.firstPublished}
                            </>
                      </>
                    )}

                    {blogPost && (
                      <>
                        <>
                          <>
                            <h5>Share post</h5>
                          </>

                          <>
                            <div className="/backstage">
                              See more posts &rarr;
                            </div>
                          </>
                        </>
                      </>
                    )}
                  </>
                </>
              )
            }
          </>
        </>
      )}
    </>
  );
}
