import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3bda9b466f7348d2814027a0e40122dd&page=${page}`;
                const response = await fetch(url);
                const data = await response.json();
                setArticles(data.articles);
                setTotalResults(data.totalResults);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, [page]);

    const handlePrevClick = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className='container my-3'>
            <h1>NewsStar top headlines</h1>
            <div className="row">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    articles.map((element) => (
                        <div className="col-md-4 mt-2" key={element.url}>
                            <NewsItem
                                title={element.title || ""}
                                description={element.description || ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                            />
                        </div>
                    ))
                )}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={handleNextClick} >Next &rarr;</button>
            </div>
        </div>
    );
};

export default News;
