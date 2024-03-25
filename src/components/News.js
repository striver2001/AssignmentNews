import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

function News() {
    const [articles, setArticles] = useState([]);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3bda9b466f7348d2814027a0e40122dd&page=${page}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(parsedData.articles);
            setLoading(false);
        };
        fetchData();
    }, [page]);

    const handlePrevClick = async () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = async () => {
        setPage(page + 1);
    };

    return (
        <div className='container my-3'>
            <h1>NewsStar top headlines</h1>
            <div className="row">
                {articles.map((element, index) => {
                    return (
                        <div className="col-md-4 mt-2" key={index}>
                            <NewsItem title={element.title || ""} description={element.description || ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    );
                })}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={handleNextClick} >Next &rarr;</button>
            </div>
        </div>
    );
}

export default News;
