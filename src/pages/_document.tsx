// // ** React Import
// import { Children } from 'react'

// // ** Next Import
// import Document, { Html, Head, Main, NextScript } from 'next/document'

// // ** Emotion Imports
// import createEmotionServer from '@emotion/server/create-instance'

// // ** Utils Imports
// import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// class CustomDocument extends Document {
//   render() {
//     return (
//       <Html lang='en'>
//         <Head>
//           <link rel='preconnect' href='https://fonts.googleapis.com' />
//           <link rel='preconnect' href='https://fonts.gstatic.com' />
//           <link
//             rel='stylesheet'
//             href='https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
//           />
//           <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
//           <link rel='shortcut icon' href='/images/favicon.png' />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

// CustomDocument.getInitialProps = async ctx => {
//   const originalRenderPage = ctx.renderPage
//   const cache = createEmotionCache()
//   const { extractCriticalToChunks } = createEmotionServer(cache)

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: App => props =>
//         (
//           <App
//             {...props} // @ts-ignore
//             emotionCache={cache}
//           />
//         )
//     })

//   const initialProps = await Document.getInitialProps(ctx)
//   const emotionStyles = extractCriticalToChunks(initialProps.html)
//   const emotionStyleTags = emotionStyles.styles.map(style => {
//     return (
//       <style
//         key={style.key}
//         dangerouslySetInnerHTML={{ __html: style.css }}
//         data-emotion={`${style.key} ${style.ids.join(' ')}`}
//       />
//     )
//   })

//   return {
//     ...initialProps,
//     styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
//   }
// }

// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

class CustomDocument extends Document {
  // ... Rest of your code ...

  static async getInitialProps(ctx: any) {
    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    // Step 1: Make an API call here
    let apiResponse = null
    try {
      const response = await fetch('https://devapi.hivecareer.com/samruddhKishan/settings/getLogo')
      apiResponse = await response.json()
    } catch (error) {
      console.error('API Error:', error)
    }

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          (
            <App
              {...props} // @ts-ignore
              emotionCache={cache}
            />
          )
      })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => {
      return (
        <style
          key={style.key}
          dangerouslySetInnerHTML={{ __html: style.css }}
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
        />
      )
    })

    // Step 2: Update the favicon here using the API response
    if (apiResponse && apiResponse.data && apiResponse.data.favIcon) {
      emotionStyleTags.push(<link key='custom-favicon' rel='shortcut icon' href={apiResponse.data.favIcon} />)
    }

    return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
    }
  }
}

export default CustomDocument
