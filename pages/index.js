import fetch from 'isomorphic-fetch';
import Error from 'next/error';


function Page({ stories }) {

    if (stories.length === 0) {
        return <Error statusCode={503}/>
    }
    return (
        <>
        <h1>Hacker News</h1>
        {stories.map(story => (
            <h2 key={story.id}>{story.title}</h2>
        ))}
        </>
    )
  }
  
  Page.getInitialProps = async (ctx) => {
    let stories;
    try {
        const res = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
        stories = await res.json()
    }   catch (err) {
        console.log(err);
        stories = [];
    }

    return { stories }
  }
  
  export default Page