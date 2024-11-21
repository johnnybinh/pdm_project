package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.VideoPlaylist;
import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.repository.VideoPlaylistRepository;
import com.nguyenbinh.backend.repository.PlaylistRepository;
import com.nguyenbinh.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoPlaylistService {

    private final VideoPlaylistRepository videoPlaylistRepository;
    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;

    @Autowired
    public VideoPlaylistService(VideoPlaylistRepository videoPlaylistRepository,
                                UserRepository userRepository,
                                PlaylistRepository playlistRepository) {
        this.videoPlaylistRepository = videoPlaylistRepository;
        this.userRepository = userRepository;
        this.playlistRepository = playlistRepository;
    }

    public Playlist createPlaylist(String playlistName, Long userId) {
        Users user = userRepository.findUserById(userId);

        Playlist playlist = new Playlist();
        playlist.setPlaylistName(playlistName);
        playlist.setUser(user);
        return playlistRepository.save(playlist);
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