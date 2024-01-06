package com.kachur.WideBuy.dao;

import com.kachur.WideBuy.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "product-categories", collectionResourceRel = "productCategories")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
