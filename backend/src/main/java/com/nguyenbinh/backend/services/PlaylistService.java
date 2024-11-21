package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    public Playlist getPlaylistById(Long id) {
        Optional<Playlist> playlist = playlistRepository.findPlaylistById(id);
        return playlist.orElse(null);
    }

    public void createPlaylist(String playlistName, Long userId) {
        playlistRepository.createPlaylist(playlistName, userId);
    }
}
