import Head from "next/head";
import Home from "./index";
import "../styles/globals.css";
import Link from "next/link";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { Children } from 'react'

// Taken from activeClassName example by Next.js
const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath, isReady } = useRouter()

  const child = Children.only(children)
  const childClassName = child.props.className || ''
  const [className, setClassName] = useState(childClassName)


  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(props.as || props.href, location.href)
        .pathname

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname

      const newClassName =
        linkPathname === activePathname
          ? `${childClassName} ${activeClassName}`.trim()
          : childClassName

      if (newClassName !== className) {
        setClassName(newClassName)
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
  ])

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
}

export default function Plinq({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Plinq</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </React.Fragment>
  );
}
