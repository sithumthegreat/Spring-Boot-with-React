package com.ijse.hello.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.hello.dto.OrderReqDto;
import com.ijse.hello.entity.OrderEntity;
import com.ijse.hello.entity.ProductEntity;
import com.ijse.hello.service.OrderService;
import com.ijse.hello.service.ProductService;
@CrossOrigin(origins = "*")
@RestController

public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;
    @PostMapping("/order")
    private ResponseEntity<OrderEntity> createOrder(@RequestBody OrderReqDto order)throws Exception{
        try {
            List<Long> productIds=order.getProductIds();
            OrderEntity newOrder=new OrderEntity();
            newOrder.setTotal_price(0.0);
            List<ProductEntity> orderedProducts=new ArrayList<>();
            productIds.forEach(productId->{
                ProductEntity product=productService.getProductById(productId);
                System.out.println("for Each Succuess");
                if (product!=null){
                    orderedProducts.add(product);
                    newOrder.setTotal_price(newOrder.getTotal_price()+product.getPrice());
                    System.out.println("ProductEntity is got");
                }else{
                    System.out.println("Null ProductEntity");
                }

            });
            newOrder.setOrderedProducts(orderedProducts);
            orderService.createOrder(newOrder);
            System.out.println("before success return");
            return ResponseEntity.status(201).body(newOrder);
            


        } catch (Exception e) {
            System.out.println("Exception Coming");
            return ResponseEntity.badRequest().body(null);
            
        }

    }
    @GetMapping("/order")
    private ResponseEntity<List<OrderEntity>> getAll()throws Exception{
        List<OrderEntity> orders=orderService.getAll();
        return ResponseEntity.status(201).body(orders);
    }
}
