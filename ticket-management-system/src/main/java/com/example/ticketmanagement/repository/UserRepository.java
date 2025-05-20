package com.example.ticketmanagement.repository;

import com.example.ticketmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByIdUtilisateur(String idUtilisateur);
}
