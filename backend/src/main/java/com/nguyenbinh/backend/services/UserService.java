package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<Users> allUsers() {
    List<Users> users = new ArrayList<>();

    userRepository.findAll().forEach(users::add);

    return users;
  }
}