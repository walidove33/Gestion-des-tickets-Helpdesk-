package com.example.ticketmanagement.controller;

import com.example.ticketmanagement.dto.TicketDTO;
import com.example.ticketmanagement.model.Ticket;
import com.example.ticketmanagement.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public Page<Ticket> getAllTickets(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size,
                                      @RequestParam(defaultValue = "idTicket") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return ticketService.getAllTickets(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String id) {
        Ticket ticket = ticketService.getTicketById(id);
        return ticket != null ? ResponseEntity.ok(ticket) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Ticket createTicket(@RequestBody TicketDTO ticketDTO) {
        return ticketService.createTicket(ticketDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable String id, @RequestBody TicketDTO ticketDetails) {
        Ticket updatedTicket = ticketService.updateTicket(id, ticketDetails);
        return updatedTicket != null ? ResponseEntity.ok(updatedTicket) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable String id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/approved")
    public ResponseEntity<Page<Ticket>> getApprovedTickets(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "10") int size,
                                                           @RequestParam(defaultValue = "idTicket") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Ticket> approvedTickets = ticketService.getApprovedTickets(pageable);
        return ResponseEntity.ok(approvedTickets);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Ticket> approveTicket(@PathVariable String id) {
        Ticket approvedTicket = ticketService.approveTicket(id);
        return approvedTicket != null ? ResponseEntity.ok(approvedTicket) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Ticket> rejectTicket(@PathVariable String id) {
        Ticket rejectedTicket = ticketService.rejectTicket(id);
        return rejectedTicket != null ? ResponseEntity.ok(rejectedTicket) : ResponseEntity.notFound().build();
    }
}
