import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import builderConfig from '@config/builder'
// loading widgets dynamically to reduce bundle size, will only be included in bundle when is used in the content
import '@builder.io/widgets/dist/lib/builder-widgets-async'
import { useEffect, useState } from 'react'

const BUILDER_API_KEY = 'c782aff3c66f48acb425981b997feb10'
builder.init(BUILDER_API_KEY)

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {
  const queryParamPage =
    (await builder
      .get('new-page', {
        userAttributes: {
          urlPath: '/__new_page/' + (params?.path || ''),
        },
      })
      .toPromise()) || null

  return {
    props: {
      queryParamPage,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('new-page', {
    options: { noTargeting: true },
    fields: 'data.url',
  })
  // console.log('QUERY PARAM: ', pages)
  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function QueryParamPage({
  queryParamPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const [content, setContent] = useState(queryParamPage);

  const isPreviewingInBuilder = useIsPreviewing()
  const show404 = !content && !isPreviewingInBuilder
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  console.log("query params: ", router.query.user, content)

  // useEffect(() => {
  //   if (router.query.user) {
  //     async function fetchContent() {
  //       const userAttributes = {
  //         urlPath: window.location.pathname,
  //         queryParams: `user=${router.query.user}`
  //       }
  //       builder.setUserAttributes(userAttributes);
  
  //       const content = await builder
  //         .get('query-param-page')
  //         .promise();
  //       console.log('USE EFFECT CONTENT: ', content)

  //       setContent(content);
  //     }
  //     fetchContent();
  //   }
  // }, [router.query]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!queryParamPage && <meta name="robots" content="noindex" />}
      </Head>
      {show404 ? (
        <DefaultErrorPage statusCode={404} />
      ) : (
        <BuilderComponent model="new-page" content={content} />
      )}
    </>
  )
}