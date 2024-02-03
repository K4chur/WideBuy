package com.kachur.WideBuy.service;

import com.kachur.WideBuy.dto.Purchase;
import com.kachur.WideBuy.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

}
