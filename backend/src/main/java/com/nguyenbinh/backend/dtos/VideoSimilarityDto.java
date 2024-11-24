package com.nguyenbinh.backend.dtos;

import java.time.LocalDate;

public class VideoSimilarityDto {

    private Long videoId;
    private String videoName;
    private String videoDescription;
    private String videoUrl;
    private LocalDate createdDate;
    private UserResponseDto user;
    private Long similarWords;

    // Constructor
    public VideoSimilarityDto(Long videoId, String videoName, String videoDescription, String videoUrl,
                              LocalDate createdDate, UserResponseDto user, Long similarWords) {
        this.videoId = videoId;
        this.videoName = videoName;
        this.videoDescription = videoDescription;
        this.videoUrl = videoUrl;
        this.createdDate = createdDate;
        this.user = user;
        this.similarWords = similarWords;
    }

    // Getters and Setters
    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public String getVideoDescription() {
        return videoDescription;
    }

    public void setVideoDescription(String videoDescription) {
        this.videoDescription = videoDescription;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public UserResponseDto getUser() {
        return user;
    }

    public void setUser(UserResponseDto user) {
        this.user = user;
    }

    public Long getSimilarWords() {
        return similarWords;
    }

    public void setSimilarWords(Long similarWords) {
        this.similarWords = similarWords;
    }
}
