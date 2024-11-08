package com.nguyenbinh.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nguyenbinh.backend.entities.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<Users, Integer> {
  Optional<Users> findByEmail(String email);
}