package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.VideoPlaylist;
import com.nguyenbinh.backend.repository.VideoPlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoPlaylistService {

    private final VideoPlaylistRepository videoPlaylistRepository;

    @Autowired
    public VideoPlaylistService(VideoPlaylistRepository videoPlaylistRepository) {
        this.videoPlaylistRepository = videoPlaylistRepository;
    }

    // Fetch all videos in a playlist
    public List<VideoPlaylist> getVideosByPlaylistId(Long playlistId) {
        return videoPlaylistRepository.findByPlaylistId(playlistId);
    }

    // Fetch all playlists containing a specific video
    public List<VideoPlaylist> getPlaylistsByVideoId(Long videoId) {
        return videoPlaylistRepository.findByVideoId(videoId);
    }

    public List<VideoPlaylist> getPlaylistsByPlaylistAndVideoId(Long playlistId, Long videoId){
        return videoPlaylistRepository.findByPlaylistIdAndVideoId(playlistId, videoId);
    }

    // Add a video to a playlist
    public void addVideoToPlaylist(Long playlistId, Long videoId) {
        videoPlaylistRepository.addVideoToPlaylist(playlistId, videoId);
    }

    // Remove a video from a playlist
    public void removeVideoFromPlaylist(Long playlistId, Long videoId) {
        videoPlaylistRepository.removeVideoFromPlaylist(playlistId, videoId);
    }
}