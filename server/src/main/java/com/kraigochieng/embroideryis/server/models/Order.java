//package com.kraigochieng.embroideryis.server.models;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.List;
//import java.util.UUID;
//
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Table(name = "order")
//@Entity(name = "Order")
//public class Order {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    private UserEntity receiverId;
//
//    private UserEntity confirmerId;
//
//    private List<OrderContact> contacts;
//}
