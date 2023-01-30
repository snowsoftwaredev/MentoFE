import Layout from '../../components/layout'
import { getAllCardsIds, getCardsData } from '../../lib/cards'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Cards({ cardsData }) {
  return (
    <Layout>
      <Head>
        <title>{cardsData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{cardsData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={cardsData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: cardsData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllCardsIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const cardsData = await getCardsData(params.id)
  return {
    props: {
      cardsData
    }
  }
}
