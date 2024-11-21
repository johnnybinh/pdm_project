package com.nguyenbinh.backend.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenbinh.backend.entities.Users;

import java.util.*;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

  @Query(value = "SELECT * FROM users u WHERE u.email = :email", nativeQuery = true)
  Optional<Users> findByEmail(@Param("email") String email);

  @Query(value = "SELECT * FROM users", nativeQuery = true)
  List<Users> findAllUsers();

  @Query(value = "SELECT * FROM users u WHERE u.user_id = :id", nativeQuery = true)
  Optional<Users> findUserById(@Param("id") Long id);

  @Modifying
  @Transactional
  @Query(value = "INSERT INTO users (full_name, email, password, profile_picture, created_at, updated_at) " +
          "VALUES (:fullName, :email, :password, :profilePicture, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
          nativeQuery = true)
  int createUser(@Param("fullName") String fullName,
                 @Param("email") String email,
                 @Param("password") String password,
                 @Param("profilePicture") String profilePicture);
}