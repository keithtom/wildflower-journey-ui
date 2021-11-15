import Head from 'next/head'
import Image from 'next/image'

import Button from 'react-bootstrap/Button'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Wildflower Directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button variant="primary">Click me</Button>
        <Button variant="secondary">Click me</Button>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}
