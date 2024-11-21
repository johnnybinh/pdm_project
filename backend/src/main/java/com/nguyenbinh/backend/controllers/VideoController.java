package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.entities.Video;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.nguyenbinh.backend.services.*;
import com.nguyenbinh.backend.dtos.VideoRequestDto;
import com.nguyenbinh.backend.repository.*;
import com.nguyenbinh.backend.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/videos")
@CrossOrigin(origins = "http://localhost:5173")
public class VideoController {

    @Autowired
    private VideoService videoService;
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getVideo(@PathVariable("id") Long id) {
        Video video = videoService.getVideoById(id);

        if (video == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(video);
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveVideo(@RequestBody VideoRequestDto videoRequest) {
        Users user = userService.getUserById(videoRequest.getUserId());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        Video video = new Video();
        video.setVideoName(videoRequest.getVideoName());
        video.setVideoDescription(videoRequest.getVideoDescription());
        video.setVideoUrl(videoRequest.getVideoUrl());
        video.setUser(user);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Users) {
            Users currentUser = (Users) principal;

            // Use equals() to compare user IDs safely
            if (currentUser.getUserId().equals(video.getUser().getUserId())) {
                videoService.saveVideo(video);
                return ResponseEntity.ok("Video saved successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Denied.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated.");
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Video>> allVideo() {
        List<Video> video = videoService.allVideo();

        return ResponseEntity.ok(video);
    }

    @GetMapping("/search")
    public List<Video> searchVideos(@RequestParam String query) {
        return videoService.searchVideos(query);
    }
}
