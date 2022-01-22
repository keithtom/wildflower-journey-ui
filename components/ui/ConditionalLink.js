import Link from 'next/link'

const ConditionalLink = ({ linkUrl, children }) => {
  return (
    linkUrl ?
      <Link href={linkUrl}>
        {children}
      </Link>
    : children
  )
}

export default ConditionalLink
