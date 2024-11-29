package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.dtos.LoginUserDto;
import com.nguyenbinh.backend.dtos.UserRegisterDto;
import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(
      UserRepository userRepository,
      AuthenticationManager authenticationManager,
      PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public Users signup(UserRegisterDto input) {
    String fullName = input.getFirstname() + " " + input.getLastname();
    String encodedPassword = passwordEncoder.encode(input.getPassword());

    int rowsInserted = userRepository.createUser(
            fullName,
            input.getEmail(),
            encodedPassword,
            input.getProfilePicture()
    );

    if (rowsInserted > 0) {
      return userRepository.findByEmail(input.getEmail())
              .orElseThrow(() -> new RuntimeException("User creation failed"));
    } else {
      throw new RuntimeException("Failed to create user");
    }
  }

  public Users authenticate(LoginUserDto input) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            input.getEmail(),
            input.getPassword()));
    return userRepository.findByEmail(input.getEmail())
        .orElseThrow();
  }
}