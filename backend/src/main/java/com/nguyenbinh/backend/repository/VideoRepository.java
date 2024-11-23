package com.nguyenbinh.backend.repository;

import com.nguyenbinh.backend.entities.Video;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenbinh.backend.dtos.*;

import java.util.*;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query(value = "SELECT * FROM videos u WHERE u.video_id = :id" , nativeQuery = true)
    Optional<Video> findVideoById(@Param("id") Long id);

    @Query(value = "SELECT * FROM videos", nativeQuery = true)
    List<Video> findAllVideos();

//    @Modifying
//    @Transactional
//    @Query(value = "INSERT INTO videos (video_name, video_description,video_url,user_id,created_date)"
//    + "VALUES (:videoName, :videoDescription,:videoUrl, :userId, NOW())", nativeQuery = true)
//    void saveVideo(@Param("videoName") String videoName,
//                   @Param("videoDescription") String videoDescription,
//                   @Param("videoUrl") String videoUrl,
//                   @Param("userId") Long UserId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO videos (video_name, video_description,video_url,user_id)"
            + "VALUES (:videoName, :videoDescription,:videoUrl, :userId)", nativeQuery = true)
    void saveVideo(@Param("videoName") String videoName,
                   @Param("videoDescription") String videoDescription,
                   @Param("videoUrl") String videoUrl,
                   @Param("userId") Long UserId);

    @Query(value = "SELECT * FROM videos WHERE user_id = :userId", nativeQuery = true)
    List<Video> findByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM videos WHERE MATCH(video_name) AGAINST (?1 IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    List<Video> searchVideos(String query);

    @Query(value = "SELECT * FROM videos WHERE user_id = :userId", nativeQuery = true)
    List<Video> findAllVideosByUserId(@Param("userId") Long userId);

    @Query(value="SELECT v.video_id AS videoId, " +
            "v.video_name AS videoName, " +
            "(SELECT COUNT(*) " +
            " FROM JSON_TABLE(CONCAT('[\"', REPLACE(v.video_name, ' ', '\",\"'), '\"]'), '$[*]' COLUMNS(word VARCHAR(100) PATH '$')) jt " +
            " WHERE FIND_IN_SET(jt.word, REPLACE(:query, ' ', ',')) > 0) AS similarWords " +
            "FROM videos v " +
            "WHERE v.video_id != :videoId",nativeQuery = true)
    List<Object[]> findSimilarVideos(@Param("videoId") Long videoId, @Param("query") String query);

//    @Query(value = "SELECT * " +
//            "FROM videos v " +
//            "WHERE v.video_id = :videoId AND v.video_name LIKE %:query%", nativeQuery = true)
//    List<Object[]> findSimilarVideos(@Param("videoId") Long videoId, @Param("query") String query);
}
