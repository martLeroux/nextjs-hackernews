import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Link from 'next/link';

import Layout from '../components/Layout';


function Page({ stories, page }) {
    console.log(stories);
    if (stories.length === 0) {
        return <Error statusCode={503}/>
    }
    return (
        <Layout title="Hacker News" description="A hacker news clone made with next.js">
            <h1>Hacker News</h1>
            <StoryList stories={stories} />

            <footer>
                <Link href={`/?page=${page + 1}`}>
                    <a>Next page ({page + 1})</a>
                </Link>
            </footer>

            <style jsx> {`
                footer {
                    padding: 1em;
                }
                footer a {
                    font-weight: bold;
                    text-decoration: none;
                    color: black;
                }
            `}
            </style>
        </Layout>
    )
  }
  
  Page.getInitialProps = async ({req, res, query}) => {
    let stories;
    let page;

    try {
        page = query.page ? Number(query.page) : 1;
        console.log(page);
        const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)
        stories = await res.json()
    }   catch (err) {
        console.log(err);
        stories = [];
    }

    return { stories, page }
  }
  
  export default Page