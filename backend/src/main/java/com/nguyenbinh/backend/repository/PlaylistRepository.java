package com.nguyenbinh.backend.repository;

import com.nguyenbinh.backend.entities.Playlist;
import com.nguyenbinh.backend.entities.Video;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query(value = "SELECT * FROM playlists p WHERE p.playlist_id = :playlistId", nativeQuery = true)
    Playlist findPlaylistById(@Param("playlistId") Long playlistId);

    @Query(value = "SELECT * FROM playlists", nativeQuery = true)
    List<Playlist> findAllPlaylists();

    @Query(value = "SELECT * FROM playlists p WHERE p.user_id = :userId", nativeQuery = true)
    List<Playlist> findAllPlaylistsByUserId(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO playlists (playlist_name, user_id) VALUES (:playlistName, :userId)", nativeQuery = true)
    void createPlaylist(@Param("playlistName") String playlistName, @Param("userId") Long userId);
}
