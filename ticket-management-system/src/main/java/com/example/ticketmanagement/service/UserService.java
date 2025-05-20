package com.example.ticketmanagement.service;
import com.example.ticketmanagement.dto.UserDTO;

import com.example.ticketmanagement.model.User;
import com.example.ticketmanagement.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByIdUtilisateur(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
                user.getIdUtilisateur(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }

    public User save(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.save(user);
    }
}
