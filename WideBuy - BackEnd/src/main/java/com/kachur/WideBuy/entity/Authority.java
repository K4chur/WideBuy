package com.kachur.WideBuy.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "authorities")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Authority implements GrantedAuthority {
    @Id
    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    private User user;

    @Column(name = "authority")
    private String authority;


}
