package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:5173") // Để frontend truy cập
public class VideoController {

    @Autowired
    private VideoService videoService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getVideo(@PathVariable("id") String id) {
        Video video = videoService.getVideoById(id);

        if (video == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(video); // Trả về JSON
    }
}
