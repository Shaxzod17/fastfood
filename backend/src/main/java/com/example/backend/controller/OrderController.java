package com.example.backend.controller;

import com.example.backend.dto.CreateOrderRequest;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
@Autowired
    OrderService orderService;
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") @GetMapping
    public HttpEntity<?> getAllOrders(){
   return orderService.getAllOrders();
}

@PostMapping
    public HttpEntity<?> saveOrder(@RequestBody CreateOrderRequest request,@RequestHeader String authorization){
    return    orderService.createOrder(request,authorization);
}
}
