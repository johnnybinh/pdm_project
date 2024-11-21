package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.dtos.PlaylistAddVideoDto;
import com.nguyenbinh.backend.dtos.CreatePlaylistDto;
import com.nguyenbinh.backend.entities.VideoPlaylist;
import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.services.VideoPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    private final VideoPlaylistService videoPlaylistService;

    @Autowired
    public PlaylistController(VideoPlaylistService videoPlaylistService) {
        this.videoPlaylistService = videoPlaylistService;
    }

    // Add a new playlist
    @PostMapping("/create")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody CreatePlaylistDto createPlaylistDto) {
        Playlist newPlaylist = videoPlaylistService.createPlaylist(createPlaylistDto.getPlaylistName(), createPlaylistDto.getUserId());
        return ResponseEntity.ok(newPlaylist);
    }


    // Get all videos in a playlist
    @GetMapping("/{playlistId}")
    public ResponseEntity<List<VideoPlaylist>> getVideosByPlaylistId(@PathVariable Long playlistId) {
        List<VideoPlaylist> videos = videoPlaylistService.getVideosByPlaylistId(playlistId);
        return ResponseEntity.ok(videos);
    }

    // Get all playlists containing a specific video
    @GetMapping("/{playlistId}/videos/{videoId}")
    public ResponseEntity<List<VideoPlaylist>> getPlaylistsByPlaylistAndVideoId(@PathVariable Long playlistId, @PathVariable Long videoId) {
        List<VideoPlaylist> playlists = videoPlaylistService.getPlaylistsByPlaylistAndVideoId(playlistId, videoId);
        return ResponseEntity.ok(playlists);
    }


    // Add a video to a playlist
    @PostMapping("/save")
    public ResponseEntity<String> addVideoToPlaylist(@RequestBody PlaylistAddVideoDto playlistAddVideo) {
        videoPlaylistService.addVideoToPlaylist(playlistAddVideo.getPlaylistId(), playlistAddVideo.getVideoId());
        return ResponseEntity.ok("Video added to playlist successfully");
    }

    // Remove a video from a playlist
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeVideoFromPlaylist(@RequestParam Long playlistId, @RequestParam Long videoId) {
        videoPlaylistService.removeVideoFromPlaylist(playlistId, videoId);
        return ResponseEntity.ok("Video removed from playlist successfully");
    }
}