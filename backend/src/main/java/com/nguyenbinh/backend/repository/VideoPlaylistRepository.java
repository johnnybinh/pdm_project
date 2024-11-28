package com.nguyenbinh.backend.repository;

import com.nguyenbinh.backend.entities.VideoPlaylist;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public interface VideoPlaylistRepository extends CrudRepository<VideoPlaylist, Long> {

    @Query(value = "SELECT * FROM video_playlist vp WHERE vp.playlist_id = :playlistId", nativeQuery = true)
    List<VideoPlaylist> findByPlaylistId(@Param("playlistId") Long playlistId);

    @Query(value = "SELECT * FROM video_playlist vp WHERE vp.video_id = :videoId", nativeQuery = true)
    List<VideoPlaylist> findByVideoId(@Param("videoId") Long videoId);

    @Query(value = "SELECT * FROM video_playlist vp WHERE vp.playlist_id = :playlistId AND vp.video_id = :videoId", nativeQuery = true)
    List<VideoPlaylist> findByPlaylistIdAndVideoId(@Param("playlistId") Long playlistId, @Param("videoId") Long videoId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO video_playlist (playlist_id, video_id) VALUES (:playlistId, :videoId)", nativeQuery = true)
    void addVideoToPlaylist(@Param("playlistId") Long playlistId, @Param("videoId") Long videoId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM video_playlist WHERE playlist_id = :playlistId AND video_id = :videoId", nativeQuery = true)
    void removeVideoFromPlaylist(@Param("playlistId") Long playlistId, @Param("videoId") Long videoId);
}
