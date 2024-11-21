package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.dtos.UserResponseWithVideosDto;
import com.nguyenbinh.backend.dtos.VideoResponseDto;
import com.nguyenbinh.backend.services.UserService;
import com.nguyenbinh.backend.services.VideoService;
import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.entities.Video;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;

@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

  private final UserService userService;
  private final VideoService videoService;

  public UserController(UserService userService,
                        VideoService videoService) {

    this.userService = userService;
    this.videoService = videoService;

  }

      @CrossOrigin(origins = "http://localhost:5173/")
      @GetMapping("/me")
      public ResponseEntity<UserResponseWithVideosDto> authenticatedUser() {
          Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
          Users currentUser = (Users) authentication.getPrincipal();

          List<Video> userVideos = videoService.getVideosByUserId(currentUser.getUserId());

          List<VideoResponseDto> videos = userVideos.stream()
                  .map(VideoResponseDto::fromVideo)
                  .toList();

          UserResponseWithVideosDto response = new UserResponseWithVideosDto(
                  currentUser.getUserId(),
                  currentUser.getFullName(),
                  videos
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