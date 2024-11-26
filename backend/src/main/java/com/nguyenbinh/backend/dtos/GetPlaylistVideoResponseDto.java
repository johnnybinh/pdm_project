package com.nguyenbinh.backend.dtos;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.entities.VideoPlaylist;
import com.nguyenbinh.backend.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class GetPlaylistVideoResponseDto {
    private String userFullName;
    private Long playlistId;
    private List<Video> videos;
    private String playlistName;

    public GetPlaylistVideoResponseDto(String userFullName, Long playlistId, List<VideoPlaylist> videoPlaylists,
            String playlistName) {
        this.userFullName = userFullName;
        this.playlistId = playlistId;
        this.playlistName = playlistName;
        videos = videoPlaylists.stream()
                .map(VideoPlaylist::getVideo)
                .collect(Collectors.toList());
    }

    public List<Video> getVideos() {
        return videos;
    }

    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }

    public String getUserFullName() {
        return userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    public void setPlaylistName(String name) {
        this.playlistName = name;
    }

    public String getPlaylistName() {
        return this.playlistName;
    }
}
