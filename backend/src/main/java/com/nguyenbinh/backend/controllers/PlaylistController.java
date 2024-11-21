package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.dtos.GetPlaylistVideoResponseDto;
import com.nguyenbinh.backend.dtos.PlaylistAddVideoDto;
import com.nguyenbinh.backend.dtos.CreatePlaylistDto;
import com.nguyenbinh.backend.entities.VideoPlaylist;
import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.services.PlaylistService;
import com.nguyenbinh.backend.services.VideoPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    @Autowired
    private VideoPlaylistService videoPlaylistService;
    @Autowired
    private PlaylistService playlistService;

    // Add a new playlist
    @PostMapping("/create")
    public ResponseEntity<String> createPlaylist(@RequestBody CreatePlaylistDto createPlaylistDto) {
        playlistService.createPlaylist(createPlaylistDto.getPlaylistName(), createPlaylistDto.getUserId());
        return ResponseEntity.ok("Playlist created successfully");
    }


    // Get all videos in a playlist
    @GetMapping("/{playlistId}")
    public ResponseEntity<GetPlaylistVideoResponseDto> getVideosByPlaylistId(@PathVariable Long playlistId) {
        List<VideoPlaylist> videos = videoPlaylistService.getVideosByPlaylistId(playlistId);

        GetPlaylistVideoResponseDto getPlaylistVideoResponseDto = new GetPlaylistVideoResponseDto(playlistId, videos);

        return ResponseEntity.ok(getPlaylistVideoResponseDto);
    }

    // Get all playlists containing a specific video
    @GetMapping("/{playlistId}/videos/{videoId}")
    public ResponseEntity<GetPlaylistVideoResponseDto> getPlaylistsByPlaylistAndVideoId(@PathVariable Long playlistId, @PathVariable Long videoId) {
        List<VideoPlaylist> playlists = videoPlaylistService.getPlaylistsByPlaylistAndVideoId(playlistId, videoId);
        GetPlaylistVideoResponseDto getPlaylistVideoResponseDto = new GetPlaylistVideoResponseDto(playlistId, playlists);

        return ResponseEntity.ok(getPlaylistVideoResponseDto);
    }


    // Add a video to a playlist
    @PostMapping("/{playlistId}/save")
    public ResponseEntity<String> addVideoToPlaylist(
            @PathVariable Long playlistId,
            @RequestBody PlaylistAddVideoDto playlistAddVideo) {

        // Use the playlistId from the path and videoId from the request body
        videoPlaylistService.addVideoToPlaylist(playlistId, playlistAddVideo.getVideoId());
        return ResponseEntity.ok("Video added to playlist successfully");
    }

    // Remove a video from a playlist
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeVideoFromPlaylist(@RequestParam Long playlistId, @RequestParam Long videoId) {
        videoPlaylistService.removeVideoFromPlaylist(playlistId, videoId);
        return ResponseEntity.ok("Video removed from playlist successfully");
    }
}