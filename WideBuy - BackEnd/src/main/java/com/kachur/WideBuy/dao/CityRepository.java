package com.kachur.WideBuy.dao;

import com.kachur.WideBuy.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "cities", collectionResourceRel = "cities")
public interface CityRepository extends JpaRepository<City, Integer> {
    List<City> findByCountryCodeAndRegionCode(@Param("conCode") String conCode, @Param("regCode") String regCode);
}
