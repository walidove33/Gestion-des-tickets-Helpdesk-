package com.example.ticketmanagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String idUtilisateur;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String departement;
    private String role;
    private String password;
}
