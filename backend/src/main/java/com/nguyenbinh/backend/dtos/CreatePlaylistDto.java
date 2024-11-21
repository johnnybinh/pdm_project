package com.nguyenbinh.backend.dtos;

public class CreatePlaylistDto {
    private String playlistName;
    private Long userId;

    public String getPlaylistName() {
        return playlistName;
    }

    public void setPlaylistName(String playlistName) {
        this.playlistName = playlistName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
