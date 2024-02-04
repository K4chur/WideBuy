package com.kachur.WideBuy.controller;

import com.kachur.WideBuy.dto.ReviewReceive;
import com.kachur.WideBuy.service.ReviewService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/add")
    public String addReview(@RequestBody ReviewReceive reviewReceive){
        this.reviewService.addReview(reviewReceive);
        return "Got it!";
    }
}
