package com.example.ticketmanagement.repository;

import com.example.ticketmanagement.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, String> {
    Page<Ticket> findByStatut(String statut, Pageable pageable);
}
