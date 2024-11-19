package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/videos")
@CrossOrigin(origins = "http://localhost:5173") // Để frontend truy cập
public class VideoController {

    @Autowired
    private VideoService videoService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getVideo(@PathVariable("id") Long id) {
        Video video = videoService.getVideoById(id);

        if (video == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(video); // Trả về JSON
    }

    @PostMapping("/save")
    public Video saveVideo(@RequestBody Video video) {
        return videoService.saveVideo(video);
    }
}
