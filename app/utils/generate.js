import 'react-native-get-random-values';
import {times} from 'rambdax';
import {v4 as uuid} from 'uuid';
import moviesData from '@data/Movies';
import reviewsData from '@data/Reviews';

const flatMap = (fn, arr) => arr.map(fn).reduce((a, b) => a.concat(b), []);

const fuzzCount = (count) => {
    // makes the number randomly a little larger or smaller for fake data to seem more realistic
    const maxFuzz = 4;
    const fuzz = Math.round((Math.random() - 0.5) * maxFuzz * 2);
    return count + fuzz;
};

const getRandomItem = (collection = [], randomIndex = 0) => {
  return collection[randomIndex % collection.length]
}

const makeRandomMovie = (index) => {
    const movie = getRandomItem(moviesData, index)
    return {
        id: uuid(),
        ...movie,
    };
};

const makeRandomReview = (index) => {
    const review = {
        id: uuid(),
        body: getRandomItem(reviewsData, index),
    };

    return review;
};

const makeReviews = (movie, count) => {
    const reviews = times((i) => makeRandomReview(i), count);
    movie.reviews = reviews;
};

const generateMovies = (moviesCount, reviewsPerMovie) => {
    const movies = times((i) => makeRandomMovie(i), fuzzCount(moviesCount));

    flatMap((movie) => makeReviews(movie, fuzzCount(reviewsPerMovie)), movies);

    return movies;
};

export default generateMovies;
