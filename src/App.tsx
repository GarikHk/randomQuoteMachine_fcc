import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons/faQuoteLeft';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import uniqolor from 'uniqolor';

function App() {
    // QUOTE STATE
    const [quote, setQuote] = useState({
        author: "",
        content: ""
    })

    // BACKGROUND COLOR STATE
    const randomColor = uniqolor.random({
        saturation: [20, 80],
        lightness: [20, 80],
    })
    const [background, setBackground] = useState(randomColor.color)
    document.body.style.backgroundColor = background;

    // TWEET URL
    const tweetUrl =
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.content}" - ${quote.author}`)}&hashtags=quotes`;

    // GET A QUOTE AND CHANGE UPDATE THE COLOR
    const fetchQuote = async () => {
        try {
            const res = await fetch("https://api.quotable.io/random")
            const data = await res.json()
            setBackground(randomColor.color)
            setQuote({
                author: data.author,
                content: data.content,
            });
        } catch (error) {
            console.log("An error occurred while fetching the quote:", error)
        }
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    return (
        <div className="quote-box">
            {
                quote.author
                    ? (<>
                        <h1 className="text">
                            <blockquote style={{ color: background }}>
                                <FontAwesomeIcon icon={faQuoteLeft} /> {quote.content}
                            </blockquote>
                        </h1>
                        <p className="author" style={{ color: background }}>{`~${quote.author}~`}</p>
                        <button
                            className="new-quote"
                            onClick={fetchQuote}
                            style={{ backgroundColor: background }}
                        >New Quote</button>
                        <div>
                            <a
                                className="tweet-quote"
                                href={tweetUrl}
                                target="_top"
                            ><FontAwesomeIcon icon={faTwitter} />Tweet</a>
                        </div>

                    </>)
                    : (<h1 style={{ color: background }}>:)</h1>)
            }
        </div >
    );
}

export default App;
