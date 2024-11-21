package com.nguyenbinh.backend.dtos;

import java.util.*;

public class UserResponseWithVideosDto {
    private Long userId;
    private String fullName;
    private List<VideoResponseDto> videos;

    public UserResponseWithVideosDto(Long userId, String fullName, List<VideoResponseDto> videos) {
        this.userId = userId;
        this.fullName = fullName;
        this.videos = videos;
    }

    public Long getUserId() {
        return userId;
    }
    public String getFullName() {
        return fullName;
    }
    public List<VideoResponseDto> getVideos() {
        return videos;
    }

    public void setFullName(java.lang.String fullName) {
        this.fullName = fullName;
    }
    public void setUserId(java.lang.Long userId) {
        this.userId = userId;
    }
    public void setVideos(List<VideoResponseDto> videos) {
        this.videos = videos;
    }
}
