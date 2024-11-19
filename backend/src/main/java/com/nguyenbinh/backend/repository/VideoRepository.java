package com.nguyenbinh.backend.repository;

import com.nguyenbinh.backend.entities.Video;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Repository
public class VideoRepository {

    private Map<String, Video> videos = new HashMap<>();

    // Constructor: giả lập dữ liệu
    public VideoRepository() {
        Video video1 = new Video();
        video1.setVideoName("Spring Boot Tutorial");
        video1.setVideoDescription("A comprehensive guide to Spring Boot");
        video1.setVideoUrl("http://example.com/video1");
        video1.setCreatedDate(LocalDate.of(2023, 11, 10));

        videos.put("1", video1);
    }

    // Tìm Video theo ID
    public Video findVideoById(String id) {
        return videos.get(id);
    }
}
