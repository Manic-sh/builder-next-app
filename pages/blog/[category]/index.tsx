import { builder } from "@builder.io/react";
import { Link } from '@components/Link/Link'

builder.init("c782aff3c66f48acb425981b997feb10");


function Category({ category }) {
  return (
      <>
      <h1 style={{fontSize: "32px", textAlign: "center"}}> Builder IO Next JS Blog Categories </h1>
    {/* <div style={{ display: "flex", gap: "2rem;", marginTop: "20px", alignItems: "center", justifyContent: "center"}}>
      {categories.map((item, index) => (
        <div style={{ display: "flex", color: "#fff"}} key={index}>
            <Link href={`/blog/${item?.data?.categoryName}`}>
                <div style={{cursor: "pointer", overflow: "hidden", width: 300 }}>
                    {item?.data?.categoryName}
                </div>
            </Link>
        </div>
      ))}
    </div> */}
    {JSON.stringify(category)}
    </>
  );
}


export async function getStaticProps({ params }) {
    console.log("category....", params?.category)
    const category = await builder
      .get("categories", {
        // Include references, like our `author` ref
        options: { includeRefs: true },
        query: {
          // Get the specific article by handle
          "data.categoryName": params?.category,
        },
      })
      .promise() || null;
  
    return {
      props: {
        category,
      },
    };
  }
export async function getStaticPaths() {
    return {
      // Optionally, use builder.getAll() to fetch all paths,
      // or just allow fallback: true to render any path
      paths: [],
      fallback: true,
    };
}
export default Category;
