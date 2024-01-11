package com.kachur.WideBuy.dao;

import com.kachur.WideBuy.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource
public interface RegionRepository extends JpaRepository<Region, Integer> {
    List<Region> findByCountryCode(@Param("code") String code);
}
