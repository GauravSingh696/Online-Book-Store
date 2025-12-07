package com.onlineBookStore.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Book {

    @Id
    @GeneratedValue
    private Integer id;

    private String title;
    private String author;
    private double price;

    private String category;
    private Integer stock;
}

