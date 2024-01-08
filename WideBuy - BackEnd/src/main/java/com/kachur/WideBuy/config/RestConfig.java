package com.kachur.WideBuy.config;

import com.kachur.WideBuy.entity.Product;
import com.kachur.WideBuy.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.stream.Collectors;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {
    private final EntityManager entityManager;
    private final HttpMethod[] unavailableMethods = {HttpMethod.PATCH, HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

    public RestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {


        closeHttpExposure(config, Product.class);
        closeHttpExposure(config, ProductCategory.class);

        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toList().toArray(new Class[0]));
        cors.addMapping("/wide-buy/**").allowedOrigins("http://localhost:4200");
    }

    private void closeHttpExposure(RepositoryRestConfiguration config, Class someClass) {
        config.getExposureConfiguration()
                .forDomainType(someClass)
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unavailableMethods)))
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unavailableMethods)));
    }
}
