package com.kachur.WideBuy.dao;

import com.kachur.WideBuy.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    Page<Product> findByBrandId(@Param("id") Long id, Pageable pageable);
    Page<Product> findByNameContaining(@Param("searchKey") String searchKey, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "(:name IS NULL OR p.name LIKE %:name%) AND " +
            "(:catIds IS NULL OR p.category.id IN :catIds) AND " +
            "(:brandIds IS NULL OR p.brand.id IN :brandIds) AND " +
            "(:minPrice IS NULL OR p.unitPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.unitPrice <= :maxPrice)")
    Page<Product> findProductsByFilters(
            @Param("name") String name,
            @Param("catIds") List<Long> catIds,
            @Param("brandIds") List<Long> brandIds,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );
}
