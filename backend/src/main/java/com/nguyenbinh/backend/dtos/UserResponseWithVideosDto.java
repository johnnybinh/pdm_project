package com.nguyenbinh.backend.dtos;

import com.nguyenbinh.backend.entities.Playlist;

import java.util.*;

public class UserResponseWithVideosDto {
    private Long userId;
    private String fullName;
    private List<VideoResponseDto> videos;
    private List<GetPlaylistResponseDto> playlists;

    public UserResponseWithVideosDto(Long userId, String fullName, List<VideoResponseDto> videos, List<GetPlaylistResponseDto> playlists) {
        this.userId = userId;
        this.fullName = fullName;
        this.videos = videos;
        this.playlists = playlists;
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
    public List<GetPlaylistResponseDto> getPlaylists() {
        return playlists;
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
    public void setPlaylists(List<GetPlaylistResponseDto> playlists) {
        this.playlists = playlists;
    }
}
