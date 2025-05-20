package com.example.ticketmanagement.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class TicketDTO {
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
