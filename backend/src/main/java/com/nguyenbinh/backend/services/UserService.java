package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<Users> allUsers() {
    return userRepository.findAllUsers();
  }

  public Users getUserById(Long id) {
    return userRepository.findUserById(id);
  }
}