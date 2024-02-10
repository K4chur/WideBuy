package com.kachur.WideBuy.dao;

import com.kachur.WideBuy.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BrandRepository extends JpaRepository<Brand,Long> {
}
