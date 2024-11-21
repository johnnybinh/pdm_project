package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nguyenbinh.backend.entities.Users;

import java.time.LocalDate;
import java.util.*;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video getVideoById(Long id) {
        Optional<Video> video = videoRepository.findVideoById(id);
        return video.orElse(null);
    }

    public List<Video> allVideo() {
        return videoRepository.findAllVideos();
    }

    public void saveVideo(Video video) {
        videoRepository.saveVideo(video.getVideoName(), video.getVideoDescription(), video.getVideoUrl(), video.getUser().getUserId());
    }
}