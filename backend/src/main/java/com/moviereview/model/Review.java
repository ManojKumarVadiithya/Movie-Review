package com.moviereview.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    private String id;
    private String body;
    private Integer rating;
    private User user;
    private String imdbId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Review(String body, Integer rating, User user, String imdbId) {
        this.body = body;
        this.rating = rating;
        this.user = user;
        this.imdbId = imdbId;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
