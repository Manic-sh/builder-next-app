import { builder, BuilderComponent } from '@builder.io/react'

builder.init('c782aff3c66f48acb425981b997feb10')

export const getStaticProps = async () => {
  // Dynamically fetch latest content from Builder.io API, so you can publish updates without
  // codebase changes
  const content = await builder.get('error-page', { url: "/404"}).promise();
  return { props: { content } }
}

// View full integration options and docs here: https://builder.io/c/docs/developers
export default function Custom404(props) {
  return <BuilderComponent
    content={props.content}
    model="error-page" />
}