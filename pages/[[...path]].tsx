import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, Fragment }  from 'react'
import { BuilderComponent, Builder, builder, BuilderContent } from '@builder.io/react'
import builderConfig from '@config/builder'
import Custom404 from './404';
import Head from 'next/head'
import { Link } from '@components/Link/Link'
import { getTargetingValues } from '@builder.io/personalization-utils'
import $ from "jquery";
import "@builder.io/widgets";
import { setPixelProperties } from '@builder.io/utils';

const mylocale = 'en-fr';

//builder.setUserAttribute({ queryParam: "user=2" });


builder.init("cdea98614de745fdb32a17d23b2dc508");

builder.apiVersion = 'v3'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {

  const isPersonalizedRequest = params?.path?.[0].startsWith(';')
 
  const page =
    (await builder
      .get('page', {  
        apiKey: builderConfig.apiKey,
        userAttributes: isPersonalizedRequest
          ? {
              // if it's a personalized page let's fetch it:
              ...getTargetingValues(params!.path[0].split(';').slice(1)),
            }
          : {
              urlPath: '/' + (params?.path?.join('/') || ''),
              locale: mylocale,
              custom: "custom attribute",
            },
        options: {
              locale: mylocale
        },    
        cachebust: true,
      })
      .toPromise()) || null
      
      // Track conversion
      builder.trackConversion(99.99);
      //setPixelProperties(page, { alt: 'pixel tag from welcome...1111' });

 
  return {
    props: {
      page,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
    query:{
      "name.$eq": "aspect-ratio"
    },
  })

  return {
    // new set ensure unique urls, as there could be multiple pages on the same url, variations will be handled by middlewar
    paths: [...new Set(pages.map((page) => `${page.data?.url}`))],
    fallback: true,
  }
}

export default function Path({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }


  
  //builder.setUserAttributes({ queryParam: `user=${router.query.user}`});

  const isLive = !Builder.isEditing && !Builder.isPreviewing;
  //  if (!page && isLive && !router.query) {}

  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <BuilderComponent model="custom-404"  />
      </>
    )
  }

  console.log("Test Field", eval(page));

  const { title, description, image, testField } = page?.data! || {}
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script>console.log({page?.data?.testField})</script>
      </Head>
      <NextSeo
        title={title}
        description={description} // workaround remove nextSeo Description 
        openGraph={{
          type: 'website',
          title,
          description,
          images: [
            {
              url: image,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
      />
      {/* <BuilderContent modelName='page'>
        {(variant, loading, content) =>
          variant ? (
            <div>{variant.testField}</div>
          ) : (
            <div>Loading..</div>
          )
        }
      </BuilderContent> */}
      
      <BuilderComponent  locale={mylocale}  model="page" content={page} data={{ test: "Hello World!!!"}} options={{ includeRefs: true }}  context={{ $ }} />
    </>
  )
}
