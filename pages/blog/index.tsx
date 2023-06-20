import { builder } from "@builder.io/react";
import { Link } from '@components/Link/Link'

builder.init("c782aff3c66f48acb425981b997feb10");

const articlesPerPage = 30;

function Blog({ articles }) {
  return (
      <>
      <h1 style={{fontSize: "32px", textAlign: "center"}}> Builder IO Next JS Blog </h1>
    <div style={{ display: "flex", gap: "2rem;", marginTop: "20px", alignItems: "center", justifyContent: "center"}}>
      {articles.map((item, index) => (
        <div style={{ display: "flex", color: "#fff"}} key={index}>
            <Link href={`/blog/${item?.data?.handle}`}>
                <div style={{cursor: "pointer", overflow: "hidden", width: 300 }}>
                    <div style={{ width: 300, height: 400, display: "block" }}>
                    <img src={item?.data?.image} />
                    </div>
                    {item?.data?.title}
                    {item?.data?.description}
                </div>
            </Link>
        </div>
      ))}
    </div>
    </>
  );
}

export async function getStaticProps({ query }: any) {
  const articles = await builder.getAll("blog-article", {
    // Include references, like the `author` ref
    options: { includeRefs: true },
    // For performance, don't pull the `blocks` (the full blog entry content)
    // when listing
    omit: "data.blocks",
    limit: articlesPerPage,
  });

  return {props:{ articles}};
}

export default Blog;
