package com.nguyenbinh.backend.dtos;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.entities.VideoPlaylist;
import com.nguyenbinh.backend.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class GetPlaylistVideoResponseDto{
    private Long playlistId;
    private List<Video> videos;

    public GetPlaylistVideoResponseDto(Long playlistId, List<VideoPlaylist> videoPlaylists) {
        this.playlistId = playlistId;
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
}
