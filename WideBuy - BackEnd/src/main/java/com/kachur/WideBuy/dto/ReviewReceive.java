package com.kachur.WideBuy.dto;

import lombok.Data;

@Data
public class ReviewReceive {
    public String username;
    public Short rating;
    public String review;
    public Long product_id;
}
