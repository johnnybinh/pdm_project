package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.dtos.GetPlaylistVideoResponseDto;
import com.nguyenbinh.backend.dtos.PlaylistAddVideoDto;
import com.nguyenbinh.backend.dtos.CreatePlaylistDto;
import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.entities.VideoPlaylist;
import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.services.PlaylistService;
import com.nguyenbinh.backend.services.VideoPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Users) {
            Users currentUser = (Users) principal;

            if (currentUser.getUserId().equals(createPlaylistDto.getUserId())) {
                playlistService.createPlaylist(createPlaylistDto.getPlaylistName(), createPlaylistDto.getUserId());
                return ResponseEntity.ok("Playlist created successfully");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Denied.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated.");
        }
    }

    // Get all videos in a playlist
    @GetMapping("/{playlistId}")
    public ResponseEntity<GetPlaylistVideoResponseDto> getVideosByPlaylistId(@PathVariable Long playlistId) {
        Playlist playlist = playlistService.getPlaylistById(playlistId);
        List<VideoPlaylist> videos = videoPlaylistService.getVideosByPlaylistId(playlistId);

        // Check if the videos list is empty, indicating the playlist might not exist

        GetPlaylistVideoResponseDto getPlaylistVideoResponseDto = new GetPlaylistVideoResponseDto(
                playlist.getUser().getFullName(), playlistId, videos, playlist.getPlaylistName());
        return ResponseEntity.ok(getPlaylistVideoResponseDto);
    }

    // Get all playlists containing a specific video
    @GetMapping("/{playlistId}/videos/{videoId}")
    public ResponseEntity<GetPlaylistVideoResponseDto> getPlaylistsByPlaylistAndVideoId(@PathVariable Long playlistId,
            @PathVariable Long videoId) {

        Playlist playlist = playlistService.getPlaylistById(playlistId);
        List<VideoPlaylist> playlists = videoPlaylistService.getPlaylistsByPlaylistAndVideoId(playlistId, videoId);
        GetPlaylistVideoResponseDto getPlaylistVideoResponseDto = new GetPlaylistVideoResponseDto(
                playlist.getUser().getFullName(), playlistId,
                playlists, playlist.getPlaylistName());

        return ResponseEntity.ok(getPlaylistVideoResponseDto);
    }

    // Add a video to a playlist
    @PostMapping("/{playlistId}/save")
    public ResponseEntity<String> addVideoToPlaylist(
            @PathVariable Long playlistId,
            @RequestBody PlaylistAddVideoDto playlistAddVideo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Users) {
            Users currentUser = (Users) principal;

            if (playlistService.isPlaylistOwnedByUser(playlistId, currentUser.getUserId())) {
                videoPlaylistService.addVideoToPlaylist(playlistId, playlistAddVideo.getVideoId());
                return ResponseEntity.ok("Video added to playlist successfully");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Denied.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated.");
        }
    }

    // Remove a video from a playlist
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeVideoFromPlaylist(@RequestParam Long playlistId, @RequestParam Long videoId) {
        videoPlaylistService.removeVideoFromPlaylist(playlistId, videoId);
        return ResponseEntity.ok("Video removed from playlist successfully");
    }
}