package com.onlineBookStore.controller;

import com.onlineBookStore.entity.Book;
import com.onlineBookStore.entity.Order;
import com.onlineBookStore.entity.OrderItem;
import com.onlineBookStore.entity.User;
import com.onlineBookStore.repository.BookRepository;
import com.onlineBookStore.repository.OrderRepository;
import com.onlineBookStore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping
    public Order createOrder(@RequestBody Map<String, Object> body) {
        Integer userId = (Integer) body.get("userId");
        List<Map<String, Object>> itemsReq = (List<Map<String, Object>>) body.get("items");

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0.0;

        for (Map<String, Object> itemReq : itemsReq) {
            Integer bookId = (Integer) itemReq.get("bookId");
            Integer quantity = (Integer) itemReq.get("quantity");

            Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setBook(book);
            oi.setQuantity(quantity);
            oi.setPrice(book.getPrice());

            total += book.getPrice() * quantity;
            orderItems.add(oi);
        }

        order.setTotalAmount(total);
        order.setItems(orderItems);

        return orderRepository.save(order);
    }
}
