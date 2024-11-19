package com.nguyenbinh.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Collection;
import java.util.List;

@Table(name = "users")
@Entity
public class Users implements UserDetails {
  @Id
  @GeneratedValue
  @Column(nullable = false)
  private Integer user_id;

  @Column(unique = true, length = 100, nullable = false)
  private String email;

  @Column(unique = false)
  private String fullName;

  @Column()
  private String profilePicture;

  @Column(nullable = false)
  private String password;

  // Getter and Setter


  public void setUser_id(Integer user_id) {
    this.user_id = user_id;
  }

  public Integer getUser_id() {
    return user_id;
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

  @CreationTimestamp
  @Column(updatable = false, name = "created_at")
  private Date createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Date updatedAt;

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
