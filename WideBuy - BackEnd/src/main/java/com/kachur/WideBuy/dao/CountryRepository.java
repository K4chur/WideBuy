package com.kachur.WideBuy.dao;

import com.kachur.WideBuy.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "countries", collectionResourceRel = "countries")
public interface CountryRepository extends JpaRepository<Country,Short> {
    @Query("SELECT c FROM Country c")
    List<Country> findAllCountriesWithoutPagination();
}
