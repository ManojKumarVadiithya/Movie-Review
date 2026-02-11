package com.moviereview.service;

import com.moviereview.dto.ReviewRequest;
import com.moviereview.model.Movie;
import com.moviereview.model.Review;
import com.moviereview.model.User;
import com.moviereview.repository.MovieRepository;
import com.moviereview.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;
    private final UserService userService;

    public Review createReview(ReviewRequest request, String email) {
        User user = userService.findByEmail(email);
        Review review = new Review(
                request.getReviewBody(),
                request.getRating(),
                user,
                request.getImdbId()
        );
        Review savedReview = reviewRepository.save(review);

        Movie movie = movieRepository.findByImdbId(request.getImdbId())
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
        
        if (movie.getReviewIds() == null) {
            movie.setReviewIds(new ArrayList<>());
        }
        movie.getReviewIds().add(savedReview.getId());
        movieRepository.save(movie);

        return savedReview;
    }

    public List<Review> getReviewsByImdbId(String imdbId, String sortBy) {
        return switch (sortBy) {
            case "oldest" -> reviewRepository.findByImdbIdOrderByCreatedAtAsc(imdbId);
            case "highest-rated" -> reviewRepository.findByImdbIdOrderByRatingDesc(imdbId);
            default -> reviewRepository.findByImdbIdOrderByCreatedAtDesc(imdbId);
        };
    }

    public Review updateReview(String reviewId, ReviewRequest request, String email) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));

        if (!review.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("Unauthorized: only review owner can edit");
        }

        review.setBody(request.getReviewBody());
        review.setRating(request.getRating());
        review.setUpdatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public void deleteReview(String reviewId, String email) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));

        if (!review.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("Unauthorized: only review owner can delete");
        }

        reviewRepository.deleteById(reviewId);

        Movie movie = movieRepository.findByImdbId(review.getImdbId())
                .orElse(null);
        if (movie != null) {
            movie.getReviewIds().remove(reviewId);
            movieRepository.save(movie);
        }
    }

    public Review getReviewById(String reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
    }
}
