package com.nguyenbinh.backend.controllers;

import com.nguyenbinh.backend.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlists/{playlistId}")
@CrossOrigin(origins = "http://localhost:5173") // Để frontend truy cập

public class VideoPlaylistController {
    @Autowired
    private PlaylistService playlistService;
    @Autowired
    private VideoService videoService;
    @Autowired
    private UserService userService;
}
