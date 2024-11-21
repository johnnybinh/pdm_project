package com.nguyenbinh.backend.repository;

import com.nguyenbinh.backend.entities.Video;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query(value = "SELECT * FROM videos u WHERE u.video_id = :id" , nativeQuery = true)
    Optional<Video> findVideoById(@Param("id") Long id);

    @Query(value = "SELECT * FROM videos", nativeQuery = true)
    List<Video> findAllVideos();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO videos (video_name, video_description,video_url,user_id,created_date)"
    + "VALUES (:videoName, :videoDescription,:videoUrl, :userId, NOW())", nativeQuery = true)
    void saveVideo(@Param("videoName") String videoName,
                   @Param("videoDescription") String videoDescription,
                   @Param("videoUrl") String videoUrl,
                   @Param("userId") Long UserId);
    // Retrieve videos by user ID using native SQL
    @Query(value = "SELECT * FROM videos WHERE user_id = :userId", nativeQuery = true)
    List<Video> findByUserId(@Param("userId") Long userId);
}
