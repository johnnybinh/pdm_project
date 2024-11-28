package com.nguyenbinh.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.Collection;
import java.util.List;

@Table(name = "users")
@Entity
public class Users implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(unique = true, length = 100, nullable = false)
  @NotNull(message = "Email is required")
  @Email(message = "Email should be valid")
  private String email;

  @Column(unique = false, nullable = false)
  private String fullName;

  @Column()
  private String profilePicture;

  @Column(nullable = false)
  @NotNull(message = "Password is required")
  private String password;

  @CreationTimestamp
  @Column(updatable = false, name = "created_at")
  private Date createdAt;

  public void setUserId(Long user_id) {
    this.userId = userId;
  }

  public Long getUserId() {
    return userId;
  }

  public String getEmail() {
    return this.email;
  }

  public Users setEmail(String email) {
    this.email = email;
    return this;
  }

  public String getProfilePicture() {
    return profilePicture;
  }

  public Users setProfilePicture(String profilePicture) {
    this.profilePicture = profilePicture;
    return this;
  }

  public String getFullName() {
    return fullName;
  }

  public Users setFullName(String fullName) {
    this.fullName = fullName;
    return this;
  }

  public Users setPassword(String password) {
    this.password = password;
    return this;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
