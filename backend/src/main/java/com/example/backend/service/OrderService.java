package com.example.backend.service;

import com.example.backend.dto.CreateOrderRequest;
import org.springframework.http.HttpEntity;

public interface OrderService {
HttpEntity<?> createOrder(CreateOrderRequest request, String token);
HttpEntity<?> getUserOrders(String token);
HttpEntity<?> getAllOrders();
}

