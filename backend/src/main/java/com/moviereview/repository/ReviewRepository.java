package com.moviereview.repository;

import com.moviereview.model.Review;
// import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByImdbIdOrderByCreatedAtDesc(String imdbId);
    List<Review> findByImdbIdOrderByCreatedAtAsc(String imdbId);
    List<Review> findByImdbIdOrderByRatingDesc(String imdbId);
    List<Review> findByImdbId(String imdbId);
}
