package com.example.ticketmanagement.model;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
public class Ticket {
    @Id
    private String idTicket;
    private Date dateCreation;
    private Date dateModification;
    private String priorite;
    private String statut;
    private String sujet;
    private String description;
    private String utilisateurId;
    private String technicienId;
    private String categorie;
    private String commentaires;
}
