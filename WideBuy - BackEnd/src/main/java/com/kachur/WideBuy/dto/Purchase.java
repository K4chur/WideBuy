package com.kachur.WideBuy.dto;

import com.kachur.WideBuy.entity.*;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}