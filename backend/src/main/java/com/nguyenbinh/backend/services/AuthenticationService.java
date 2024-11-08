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
    Users user = new Users()
        .setFullName(input.getFirstname() + " " + input.getLastname())
        .setEmail(input.getEmail())
        .setPassword(passwordEncoder.encode(input.getPassword()))
        .setProfilePicture(input.getProfilePicture());
    return userRepository.save(user);
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