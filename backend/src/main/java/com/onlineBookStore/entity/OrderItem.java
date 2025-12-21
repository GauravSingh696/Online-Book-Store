package com.onlineBookStore.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Book book;

    private Integer quantity;

    private double price; // price per unit at time of order
}
