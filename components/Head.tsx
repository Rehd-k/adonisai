import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import useEnvironment from '../hooks/useEnvironment'

type Props = {
  title?: string
  description?: string
  image?: string
}

const Head: FC<PropsWithChildren<Props>> = ({
  title,
  description,
  image,
  children,
}) => {
  const { META_TITLE, META_DESCRIPTION, BASE_URL } = useEnvironment()
  const { asPath } = useRouter()
  const shortDescription = (description || META_DESCRIPTION).substring(0, 160)
  const siteTitle = title ? `${title} - ${META_TITLE}` : META_TITLE

  // remove query string and hash from asPath
  const _pathSliceLength = Math.min.apply(Math, [
    asPath.indexOf('?') > 0 ? asPath.indexOf('?') : asPath.length,
    asPath.indexOf('#') > 0 ? asPath.indexOf('#') : asPath.length,
  ])
  const canonicalURL = BASE_URL + asPath.substring(0, _pathSliceLength)

  return (
    <NextHead>
      <title>{siteTitle}</title>
      <meta property="og:title" content={siteTitle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="description" content={shortDescription} />
      <meta property="og:description" content={shortDescription} />
      <meta name="twitter:description" content={shortDescription} />
      <meta property="og:image" content={image || `${BASE_URL}/og-image.jpg`} />
      <meta
        name="twitter:image"
        content={image || `${BASE_URL}/twitter-card.jpg`}
      />
      <link rel="canonical" href={canonicalURL} />
      {children}
    </NextHead>
  )
}

export default Head
