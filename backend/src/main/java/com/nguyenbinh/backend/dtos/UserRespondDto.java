package com.nguyenbinh.backend.dto;

public class UserResponseDto {
    private Long userId;
    private String email;
    private String fullName;
    private String profilePicture;

    // Constructor
    public UserResponseDto(Long userId, String email, String fullName, String profilePicture) {
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.profilePicture = profilePicture;
    }

    // Getters
    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    // Setters
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}