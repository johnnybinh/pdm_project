package com.nguyenbinh.backend.dtos;

public class GetPlaylistResponseDto {
    private Long playlistId;
    private String playlistName;

    public GetPlaylistResponseDto(Long playlistId, String playlistName) {
        this.playlistId = playlistId;
        this.playlistName = playlistName;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }

    public Long getPlaylistId() {
        return playlistId;
    }

    public String getPlaylistName() {
        return playlistName;
    }

    public void setPlaylistName(String playlistName) {
        this.playlistName = playlistName;
    }
}

