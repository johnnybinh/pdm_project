package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.services.*;
import com.nguyenbinh.backend.dtos.VideoRequestDto;
import com.nguyenbinh.backend.repository.*;
import com.nguyenbinh.backend.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/videos")
@CrossOrigin(origins = "http://localhost:5173") // Để frontend truy cập
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

        return ResponseEntity.ok(video); // Trả về JSON
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveVideo(@RequestBody VideoRequestDto videoRequest) {
        // Fetch the existing user
        Users user = userService.getUserById(videoRequest.getUser_id());

        // Create a new video object
        Video video = new Video();
        video.setVideoName(videoRequest.getVideoName());
        video.setVideoDescription(videoRequest.getVideoDescription());
        video.setVideoUrl(videoRequest.getVideoUrl());
        video.setUser(user); // Associate the existing user

        // Save the video
        videoService.saveVideo(video);

        return ResponseEntity.ok("Video saved successfully");
    }
}
