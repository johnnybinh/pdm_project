package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.dtos.LoginUserDto;
import com.nguyenbinh.backend.dtos.UserRegisterDto;
import com.nguyenbinh.backend.responses.LoginResponse;
import com.nguyenbinh.backend.services.AuthenticationService;
import com.nguyenbinh.backend.services.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationControllers {
  private final JwtService jwtService;
  private final AuthenticationService authenticationService;

  public AuthenticationControllers(JwtService jwtService, AuthenticationService authenticationService) {
    this.jwtService = jwtService;
    this.authenticationService = authenticationService;
  }

  @PostMapping("/signup")
  public ResponseEntity<Users> register(@RequestBody UserRegisterDto registerUserDto) {
    Users registeredUser = authenticationService.signup(registerUserDto);

    return ResponseEntity.ok(registeredUser);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
    Users authenticatedUser = authenticationService.authenticate(loginUserDto);

    String jwtToken = jwtService.generateToken(authenticatedUser);

    LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

    return ResponseEntity.ok(loginResponse);
  }
}
