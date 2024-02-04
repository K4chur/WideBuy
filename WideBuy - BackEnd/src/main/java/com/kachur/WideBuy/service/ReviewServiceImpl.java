package com.kachur.WideBuy.service;

import com.kachur.WideBuy.dao.ProductRepository;
import com.kachur.WideBuy.dao.ReviewRepository;
import com.kachur.WideBuy.dto.ReviewReceive;
import com.kachur.WideBuy.entity.Product;
import com.kachur.WideBuy.entity.Review;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService{

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ProductRepository productRepository, ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void addReview(ReviewReceive reviewReceive) {
        Review review = new Review();
        review.setUsername(reviewReceive.getUsername());
        review.setRating(reviewReceive.getRating());
        review.setReview(reviewReceive.getReview());
        Long productId = reviewReceive.product_id;
        Product reviewProduct = productRepository.findById(productId).get();
        reviewProduct.addReview(review);
        reviewProduct.updateAverageRating();
        productRepository.save(reviewProduct);
    }
}
