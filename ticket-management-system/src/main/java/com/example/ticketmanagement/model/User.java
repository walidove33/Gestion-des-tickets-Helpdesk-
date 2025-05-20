package com.example.ticketmanagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
    @Id
    private String idUtilisateur;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String departement;
    private String role;
    private String password;
}
