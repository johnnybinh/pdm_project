package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<Users> allUsers() {
    List<Users> users = new ArrayList<>();

    userRepository.findAll().forEach(users::add);

    return users;
  }
  public Users getUserById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
  }
}