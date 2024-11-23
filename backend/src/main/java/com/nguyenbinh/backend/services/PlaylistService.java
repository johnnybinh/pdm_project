package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.dtos.GetPlaylistResponseDto;
import com.nguyenbinh.backend.dtos.GetPlaylistVideoResponseDto;
import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    public Playlist getPlaylistById(Long id) {
        return playlistRepository.findPlaylistById(id);
    }

    public List<GetPlaylistResponseDto> getAllPlaylistsByUserId(Long userId) {
        List<Playlist> playlists = playlistRepository.findAllPlaylistsByUserId(userId);

        List<GetPlaylistResponseDto> playlistResponseDtos = playlists.stream()
                .map(playlist -> new GetPlaylistResponseDto(playlist.getPlaylistId(), playlist.getPlaylistName()))
                .collect(Collectors.toList());

        return playlistResponseDtos;
    }

    public void createPlaylist(String playlistName, Long userId) {
        playlistRepository.createPlaylist(playlistName, userId);
    }

    public boolean isPlaylistOwnedByUser(Long playlistId, Long userId) {
        Playlist playlist = playlistRepository.findPlaylistById(playlistId);

        return playlist.getUser().getUserId().equals(userId);
    }
}
