package com.kachur.WideBuy.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "date_created")
    @CreatedDate
    private Date dateCreated;

    @Column(name = "last_updated")
    @LastModifiedDate
    private Date lastUpdated;

    @Column(name = "average_rating")
    private Double averageRating;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private Set<Review> reviews = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    public void addReview(Review review){
        if(this.reviews == null){
         this.reviews = new HashSet<>();
        }
        this.reviews.add(review);
        review.setProduct(this);
    }

    public void updateAverageRating() {
        if (reviews.isEmpty()) {
            averageRating = 0.0;
        } else {
            double totalRating = reviews.stream().mapToDouble(Review::getRating).sum();
            averageRating = totalRating / reviews.size();
        }
    }
}
