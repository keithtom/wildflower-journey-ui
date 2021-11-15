import Document, {
  Html, Head, Main, NextScript
} from 'next/document'
  
export default class MyDocument extends Document {  
  render() {

    const scriptTagify = scriptContents => (
      <script
        dangerouslySetInnerHTML={{
          __html: scriptContents
        }}
      ></script>
    )

    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/static/favicon.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
