package com.kachur.WideBuy.dao;

import com.kachur.WideBuy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
}
