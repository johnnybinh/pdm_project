package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.dtos.GetPlaylistResponseDto;
import com.nguyenbinh.backend.dtos.UserResponseWithVideosDto;
import com.nguyenbinh.backend.dtos.VideoResponseDto;
import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.services.PlaylistService;
import com.nguyenbinh.backend.services.UserService;
import com.nguyenbinh.backend.services.VideoService;
import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.entities.Video;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

  @Autowired
  private UserService userService;
  @Autowired
  private VideoService videoService;
  @Autowired
  private PlaylistService playlistService;

  @CrossOrigin(origins = "http://localhost:5173/")
  @GetMapping("/me")
  public ResponseEntity<UserResponseWithVideosDto> authenticatedUser() {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      Users currentUser = (Users) authentication.getPrincipal();

      List<Video> userVideos = videoService.getVideosByUserId(currentUser.getUserId());

      List<VideoResponseDto> videos = userVideos.stream()
              .map(VideoResponseDto::fromVideo)
              .toList();

      List<GetPlaylistResponseDto> playlists = playlistService.getAllPlaylistsByUserId(currentUser.getUserId());

      UserResponseWithVideosDto response = new UserResponseWithVideosDto(
              currentUser.getUserId(),
              currentUser.getFullName(),
              videos,
              playlists
      );

      return ResponseEntity.ok(response);
  }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseWithVideosDto> getUser(@PathVariable Long userId) {
        Users user = userService.getUserById(userId);

        List<Video> userVideos = videoService.getVideosByUserId(user.getUserId());

        List<VideoResponseDto> videos = userVideos.stream()
                .map(VideoResponseDto::fromVideo)
                .toList();

        List<GetPlaylistResponseDto> playlists = playlistService.getAllPlaylistsByUserId(user.getUserId());

        UserResponseWithVideosDto response = new UserResponseWithVideosDto(
                user.getUserId(),
                user.getFullName(),
                videos,
                playlists
        );

        return ResponseEntity.ok(response);
    }

  @CrossOrigin(origins = "http://localhost:5173/")
  @GetMapping("/")
  public ResponseEntity<List<Users>> allUsers() {
    List<Users> users = userService.allUsers();

    return ResponseEntity.ok(users);
  }
}