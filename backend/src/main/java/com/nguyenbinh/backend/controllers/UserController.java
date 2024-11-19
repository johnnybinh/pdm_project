package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.dtos.UserResponseDto;
import com.nguyenbinh.backend.services.UserService;
import com.nguyenbinh.backend.entities.Users;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;

@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @CrossOrigin(origins = "http://localhost:5173/")
  @GetMapping("/me")
  public ResponseEntity<UserResponseDto> authenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !(authentication.getPrincipal() instanceof Users)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    Users currentUser = (Users) authentication.getPrincipal();

    UserResponseDto userResponseDto = new UserResponseDto(
            currentUser.getUserId(),
            currentUser.getEmail(),
            currentUser.getFullName(),
            currentUser.getProfilePicture()
    );

    return ResponseEntity.ok(userResponse);
  }
  @CrossOrigin(origins = "http://localhost:5173/")
  @GetMapping("/")
  public ResponseEntity<List<Users>> allUsers() {
    List<Users> users = userService.allUsers();

    return ResponseEntity.ok(users);
  }
}