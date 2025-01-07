import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <link rel="preload" href="../../../public/images/logo.svg" as="image"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
