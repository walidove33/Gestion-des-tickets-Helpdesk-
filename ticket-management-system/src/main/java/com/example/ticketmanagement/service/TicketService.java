package com.example.ticketmanagement.service;

import com.example.ticketmanagement.dto.TicketDTO;
import com.example.ticketmanagement.model.Ticket;
import com.example.ticketmanagement.repository.TicketRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public Page<Ticket> getAllTickets(Pageable pageable) {
        return ticketRepository.findAll(pageable);
    }

    public Ticket getTicketById(String id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public Ticket createTicket(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        BeanUtils.copyProperties(ticketDTO, ticket);
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(String id, TicketDTO ticketDetails) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            BeanUtils.copyProperties(ticketDetails, ticket);
            ticket.setDateModification(new java.util.Date());
            return ticketRepository.save(ticket);
        }
        return null;
    }

    public void deleteTicket(String id) {
        ticketRepository.deleteById(id);
    }

    public Page<Ticket> getApprovedTickets(Pageable pageable) {
        return ticketRepository.findByStatut("Approved", pageable);
    }

    public Ticket approveTicket(String id) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            ticket.setStatut("Approved");
            return ticketRepository.save(ticket);
        }
        return null;
    }

    public Ticket rejectTicket(String id) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            ticket.setStatut("Rejected");
            return ticketRepository.save(ticket);
        }
        return null;
    }
}
